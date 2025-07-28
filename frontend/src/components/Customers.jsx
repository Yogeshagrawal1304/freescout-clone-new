import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Ticket,
  MoreHorizontal
} from 'lucide-react';
import { mockCustomers } from '../mock';
import { toast } from '../hooks/use-toast';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredCustomers = mockCustomers
    .filter(customer => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        (customer.company && customer.company.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'company':
          return (a.company || '').localeCompare(b.company || '');
        case 'tickets':
          return b.total_tickets - a.total_tickets;
        case 'created':
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customer relationships and support history</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => toast({ title: "Feature coming soon!", description: "Customer creation will be available soon" })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
                <option value="tickets">Total Tickets</option>
                <option value="created">Date Added</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{mockCustomers.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active This Month</p>
                <p className="text-2xl font-bold text-gray-900">{mockCustomers.filter(c => c.total_tickets > 0).length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Ticket className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(mockCustomers.reduce((sum, c) => sum + c.total_tickets, 0) / mockCustomers.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Week</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No customers found matching your search</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          {customer.total_tickets > 5 && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              VIP
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{customer.email}</span>
                          </div>
                          
                          {customer.company && (
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{customer.company}</span>
                            </div>
                          )}
                          
                          {customer.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <div className="flex items-center space-x-1">
                            <Ticket className="w-4 h-4" />
                            <span>{customer.total_tickets} tickets</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Added {new Date(customer.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      <Badge 
                        className={`${
                          customer.total_tickets === 0 ? 'bg-gray-100 text-gray-800' :
                          customer.total_tickets <= 2 ? 'bg-green-100 text-green-800' :
                          customer.total_tickets <= 5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {customer.total_tickets === 0 ? 'New' :
                         customer.total_tickets <= 2 ? 'Light user' :
                         customer.total_tickets <= 5 ? 'Regular' : 'Heavy user'}
                      </Badge>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toast({ title: "Feature coming soon!", description: "Customer details will be available soon" })}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;