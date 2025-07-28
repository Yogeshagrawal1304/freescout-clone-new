import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Clock, 
  User,
  Tag,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import { 
  mockTickets, 
  getCustomerById, 
  getUserById, 
  getStatusColor, 
  getPriorityColor,
  loadFromLocalStorage,
  saveToLocalStorage 
} from '../mock';
import CreateTicketDialog from './CreateTicketDialog';

const TicketInbox = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tickets, setTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const savedTickets = loadFromLocalStorage('tickets');
    if (savedTickets && savedTickets.length > 0) {
      setTickets(savedTickets);
    }
  }, []);

  // Handle URL filters
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'unassigned') {
      setAssigneeFilter('unassigned');
    }
  }, [searchParams]);

  const handleTicketCreated = (newTicket) => {
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    saveToLocalStorage('tickets', updatedTickets);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Filter and sort tickets
  const filteredTickets = tickets
    .filter(ticket => {
      // Search filter
      if (searchTerm) {
        const customer = getCustomerById(ticket.customer_id);
        const searchLower = searchTerm.toLowerCase();
        if (!ticket.subject.toLowerCase().includes(searchLower) &&
            !customer?.name.toLowerCase().includes(searchLower) &&
            !customer?.email.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && ticket.status !== statusFilter) {
        return false;
      }

      // Priority filter  
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) {
        return false;
      }

      // Assignee filter
      if (assigneeFilter === 'unassigned' && ticket.assigned_to !== null) {
        return false;
      } else if (assigneeFilter !== 'all' && assigneeFilter !== 'unassigned' && 
                 ticket.assigned_to !== parseInt(assigneeFilter)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const ticketCounts = {
    all: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600 mt-2">Manage and respond to customer support requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tickets, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="1">Sarah Wilson</SelectItem>
                  <SelectItem value="2">John Smith</SelectItem>
                  <SelectItem value="3">Emily Chen</SelectItem>
                </SelectContent>
              </Select>

              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Newest First</SelectItem>
                  <SelectItem value="created_at-asc">Oldest First</SelectItem>
                  <SelectItem value="updated_at-desc">Recently Updated</SelectItem>
                  <SelectItem value="priority-desc">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>All</span>
            <Badge variant="secondary">{ticketCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="open" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Open</span> 
            <Badge variant="secondary">{ticketCounts.open}</Badge>
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>In Progress</span>
            <Badge variant="secondary">{ticketCounts.in_progress}</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Resolved</span>
            <Badge variant="secondary">{ticketCounts.resolved}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {statusFilter === 'all' ? 'All Tickets' : 
                 statusFilter === 'open' ? 'Open Tickets' :
                 statusFilter === 'in_progress' ? 'In Progress Tickets' : 'Resolved Tickets'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tickets found matching your filters</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => {
                    const customer = getCustomerById(ticket.customer_id);
                    const assignedUser = ticket.assigned_to ? getUserById(ticket.assigned_to) : null;
                    
                    return (
                      <div 
                        key={ticket.id}
                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={customer?.avatar} alt={customer?.name} />
                              <AvatarFallback>
                                {customer?.name?.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {ticket.subject}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  #{ticket.id}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{customer?.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-4 h-4" />
                                  <span>{ticket.conversation.length} messages</span>
                                </div>
                              </div>

                              {ticket.tags && ticket.tags.length > 0 && (
                                <div className="flex items-center space-x-2 mt-2">
                                  <Tag className="w-3 h-3 text-gray-400" />
                                  <div className="flex flex-wrap gap-1">
                                    {ticket.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 ml-4">
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(ticket.status)}>
                              {ticket.status.replace('_', ' ')}
                            </Badge>
                            
                            {assignedUser ? (
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
                                  <AvatarFallback className="text-xs">
                                    {assignedUser.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600 hidden lg:block">
                                  {assignedUser.name}
                                </span>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-orange-600 border-orange-200">
                                Unassigned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateTicketDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  );
};

export default TicketInbox;