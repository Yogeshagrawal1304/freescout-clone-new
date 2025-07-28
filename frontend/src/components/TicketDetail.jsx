import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Mail, 
  Clock, 
  User, 
  Tag, 
  Send,
  MoreHorizontal,
  Edit,
  Archive
} from 'lucide-react';
import { 
  getTicketById, 
  getCustomerById, 
  getUserById, 
  getStatusColor, 
  getPriorityColor,
  mockUsers,
  loadFromLocalStorage,
  saveToLocalStorage
} from '../mock';
import { toast } from '../hooks/use-toast';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    // Try to load from localStorage first
    const savedTickets = loadFromLocalStorage('tickets');
    let foundTicket = null;
    
    if (savedTickets && savedTickets.length > 0) {
      foundTicket = savedTickets.find(t => t.id === parseInt(id));
    }
    
    // Fallback to mock data
    if (!foundTicket) {
      foundTicket = getTicketById(id);
    }
    
    if (foundTicket) {
      setTicket(foundTicket);
    } else {
      toast({
        title: "Error",
        description: "Ticket not found",
        variant: "destructive"
      });
      navigate('/tickets');
    }
  }, [id, navigate]);

  const handleReply = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Error",
        description: "Message cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newConversationItem = {
      id: ticket.conversation.length + 1,
      type: 'agent',
      from: 1, // Current user (Sarah Wilson)
      content: newMessage.trim(),
      created_at: new Date().toISOString()
    };

    const updatedTicket = {
      ...ticket,
      conversation: [...ticket.conversation, newConversationItem],
      updated_at: new Date().toISOString(),
      status: ticket.status === 'open' ? 'in_progress' : ticket.status
    };

    setTicket(updatedTicket);

    // Update localStorage
    const savedTickets = loadFromLocalStorage('tickets', []);
    const updatedTickets = savedTickets.map(t => 
      t.id === ticket.id ? updatedTicket : t
    );
    saveToLocalStorage('tickets', updatedTickets);

    setNewMessage('');
    setIsReplying(false);

    toast({
      title: "Success",
      description: "Reply sent successfully"
    });
  };

  const handleStatusChange = (newStatus) => {
    const updatedTicket = {
      ...ticket,
      status: newStatus,
      updated_at: new Date().toISOString()
    };

    setTicket(updatedTicket);

    // Update localStorage
    const savedTickets = loadFromLocalStorage('tickets', []);
    const updatedTickets = savedTickets.map(t => 
      t.id === ticket.id ? updatedTicket : t
    );
    saveToLocalStorage('tickets', updatedTickets);

    toast({
      title: "Success",
      description: `Ticket status updated to ${newStatus.replace('_', ' ')}`
    });
  };

  const handleAssigneeChange = (newAssignee) => {
    const updatedTicket = {
      ...ticket,
      assigned_to: newAssignee ? parseInt(newAssignee) : null,
      updated_at: new Date().toISOString()
    };

    setTicket(updatedTicket);

    // Update localStorage
    const savedTickets = loadFromLocalStorage('tickets', []);
    const updatedTickets = savedTickets.map(t => 
      t.id === ticket.id ? updatedTicket : t
    );
    saveToLocalStorage('tickets', updatedTickets);

    const assigneeName = newAssignee ? getUserById(parseInt(newAssignee))?.name : 'Unassigned';
    toast({
      title: "Success",
      description: `Ticket assigned to ${assigneeName}`
    });
  };

  if (!ticket) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  const customer = getCustomerById(ticket.customer_id);
  const assignedUser = ticket.assigned_to ? getUserById(ticket.assigned_to) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/tickets')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tickets</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">#{ticket.id}</h1>
            <p className="text-gray-600">{ticket.subject}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge className={getPriorityColor(ticket.priority)}>
            {ticket.priority} priority
          </Badge>
          <Badge variant="outline" className={getStatusColor(ticket.status)}>
            {ticket.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main conversation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Conversation */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {ticket.conversation.map((message, index) => {
                const isCustomer = message.type === 'customer';
                const sender = isCustomer ? customer : getUserById(message.from);
                
                return (
                  <div key={message.id} className={`flex space-x-4 ${isCustomer ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={sender?.avatar} alt={sender?.name} />
                      <AvatarFallback>
                        {sender?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 ${isCustomer ? '' : 'text-right'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{sender?.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {isCustomer ? 'Customer' : 'Agent'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${
                        isCustomer 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Reply section */}
          <Card>
            <CardHeader>
              <CardTitle>Reply to Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
                className="resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Reply as:</span>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={mockUsers[0].avatar} alt={mockUsers[0].name} />
                    <AvatarFallback className="text-xs">
                      {mockUsers[0].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{mockUsers[0].name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setNewMessage('')}
                    disabled={!newMessage.trim()}
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={handleReply}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Customer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={customer?.avatar} alt={customer?.name} />
                  <AvatarFallback>
                    {customer?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{customer?.name}</p>
                  <p className="text-sm text-gray-600">{customer?.email}</p>
                </div>
              </div>
              
              {customer?.company && (
                <div>
                  <span className="text-sm text-gray-600">Company:</span>
                  <p className="font-medium">{customer.company}</p>
                </div>
              )}
              
              {customer?.phone && (
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm text-gray-600">Total tickets:</span>
                <p className="font-medium">{customer?.total_tickets || 0}</p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket details */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <Select value={ticket.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <span className="text-sm text-gray-600">Assigned to:</span>
                <Select 
                  value={ticket.assigned_to ? ticket.assigned_to.toString() : ''} 
                  onValueChange={handleAssigneeChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Unassigned" />
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

              <div>
                <span className="text-sm text-gray-600">Priority:</span>
                <Badge className={`${getPriorityColor(ticket.priority)} mt-1`}>
                  {ticket.priority}
                </Badge>
              </div>

              <div>
                <span className="text-sm text-gray-600">Created:</span>
                <p className="text-sm">{new Date(ticket.created_at).toLocaleString()}</p>
              </div>

              <div>
                <span className="text-sm text-gray-600">Last updated:</span>
                <p className="text-sm">{new Date(ticket.updated_at).toLocaleString()}</p>
              </div>

              {ticket.tags && ticket.tags.length > 0 && (
                <div>
                  <span className="text-sm text-gray-600">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ticket.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast({ title: "Feature coming soon!" })}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Ticket
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast({ title: "Feature coming soon!" })}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive Ticket
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast({ title: "Feature coming soon!" })}
              >
                <MoreHorizontal className="w-4 h-4 mr-2" />
                More Actions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;