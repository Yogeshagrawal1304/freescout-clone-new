import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Plus, 
  Mail, 
  Shield, 
  ShieldCheck,
  Calendar,
  Users as UsersIcon,
  Crown,
  MoreHorizontal,
  Circle
} from 'lucide-react';
import { mockUsers, mockTickets } from '../mock';
import { toast } from '../hooks/use-toast';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Calculate ticket stats for each user
  const usersWithStats = mockUsers.map(user => {
    const assignedTickets = mockTickets.filter(ticket => ticket.assigned_to === user.id);
    const openTickets = assignedTickets.filter(ticket => ticket.status === 'open').length;
    const inProgressTickets = assignedTickets.filter(ticket => ticket.status === 'in_progress').length;
    const resolvedTickets = assignedTickets.filter(ticket => ticket.status === 'resolved').length;
    
    return {
      ...user,
      assigned_tickets: assignedTickets.length,
      open_tickets: openTickets,
      in_progress_tickets: inProgressTickets,
      resolved_tickets: resolvedTickets
    };
  });

  const filteredUsers = usersWithStats.filter(user => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!user.name.toLowerCase().includes(searchLower) &&
          !user.email.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Role filter
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && user.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'agent':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'agent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-2">Manage your support team and user permissions</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => toast({ title: "Feature coming soon!", description: "User invitation will be available soon" })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search team members by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
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
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online Now</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockUsers.filter(u => u.status === 'online').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Circle className="w-6 h-6 text-green-600 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockUsers.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agents</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockUsers.filter(u => u.role === 'agent').length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No team members found matching your search</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <Badge className={getRoleColor(user.role)}>
                            <div className="flex items-center space-x-1">
                              {getRoleIcon(user.role)}
                              <span>{user.role}</span>
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mt-2">
                          <div>
                            <span className="font-medium">{user.assigned_tickets}</span>
                            <span className="ml-1">total assigned</span>
                          </div>
                          <div>
                            <span className="font-medium text-blue-600">{user.open_tickets}</span>
                            <span className="ml-1">open</span>
                          </div>
                          <div>
                            <span className="font-medium text-orange-600">{user.in_progress_tickets}</span>
                            <span className="ml-1">in progress</span>
                          </div>
                          <div>
                            <span className="font-medium text-green-600">{user.resolved_tickets}</span>
                            <span className="ml-1">resolved</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      <Badge 
                        variant="outline" 
                        className={`${
                          user.status === 'online' ? 'border-green-200 text-green-700' :
                          user.status === 'away' ? 'border-yellow-200 text-yellow-700' :
                          'border-gray-200 text-gray-700'
                        }`}
                      >
                        {user.status}
                      </Badge>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toast({ title: "Feature coming soon!", description: "User management will be available soon" })}
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

export default Users;