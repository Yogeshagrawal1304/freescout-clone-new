import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { mockCustomers, mockUsers, generateId } from '../mock';
import { toast } from '../hooks/use-toast';

const CreateTicketDialog = ({ open, onOpenChange, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    customer_name: '',
    customer_email: '',
    subject: '',
    content: '',
    priority: 'medium',
    assigned_to: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Subject and message are required",
        variant: "destructive"
      });
      return;
    }

    let customerId = formData.customer_id;
    
    // If new customer, create customer record
    if (isNewCustomer) {
      if (!formData.customer_name.trim() || !formData.customer_email.trim()) {
        toast({
          title: "Error", 
          description: "Customer name and email are required",
          variant: "destructive"
        });
        return;
      }
      customerId = generateId();
    }

    const newTicket = {
      id: generateId(),
      subject: formData.subject.trim(),
      status: 'open',
      priority: formData.priority,
      customer_id: customerId,
      assigned_to: formData.assigned_to ? parseInt(formData.assigned_to) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: formData.tags,
      conversation: [
        {
          id: 1,
          type: 'customer',
          from: customerId,
          content: formData.content.trim(),
          created_at: new Date().toISOString()
        }
      ]
    };

    onTicketCreated(newTicket);
    
    toast({
      title: "Success",
      description: "Ticket created successfully"
    });

    // Reset form
    setFormData({
      customer_id: '',
      customer_name: '',
      customer_email: '',
      subject: '',
      content: '',
      priority: 'medium',
      assigned_to: '',
      tags: []
    });
    setNewTag('');
    setIsNewCustomer(false);
    onOpenChange(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim().toLowerCase()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'newTag') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>
            Create a new support ticket for a customer inquiry or issue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="newCustomer"
                checked={isNewCustomer}
                onChange={(e) => setIsNewCustomer(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="newCustomer">New customer</Label>
            </div>

            {isNewCustomer ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer_name">Customer Name *</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customer_email">Customer Email *</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                    placeholder="customer@email.com"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="customer_id">Select Customer *</Label>
                <Select value={formData.customer_id} onValueChange={(value) => setFormData({...formData, customer_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose existing customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <img 
                            src={customer.avatar} 
                            alt={customer.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Message *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Detailed description of the issue or inquiry..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assigned_to">Assign to</Label>
                <Select value={formData.assigned_to} onValueChange={(value) => setFormData({...formData, assigned_to: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  name="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag..."
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTicketDialog;