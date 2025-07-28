import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { 
  Inbox, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Star,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { mockStats, mockTickets, getCustomerById, getUserById, getStatusColor, getPriorityColor } from '../mock';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const recentTickets = mockTickets.slice(0, 5);
  const unassignedTickets = mockTickets.filter(ticket => ticket.assigned_to === null);

  const statCards = [
    {
      title: 'Total Tickets',
      value: mockStats.total_tickets,
      change: '+12%',
      icon: Inbox,
      color: 'bg-blue-500'
    },
    {
      title: 'Open Tickets', 
      value: mockStats.open_tickets,
      change: '+5%',
      icon: AlertCircle,
      color: 'bg-orange-500'
    },
    {
      title: 'Resolved Today',
      value: mockStats.tickets_today,
      change: '+18%',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Response Time',
      value: mockStats.avg_response_time,
      change: '-15%',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your support team.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent tickets */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Latest customer support requests</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/tickets')}
              className="flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTickets.map((ticket) => {
              const customer = getCustomerById(ticket.customer_id);
              const assignedUser = ticket.assigned_to ? getUserById(ticket.assigned_to) : null;
              
              return (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={customer?.avatar} alt={customer?.name} />
                      <AvatarFallback>{customer?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{ticket.subject}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">{customer?.name}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    {assignedUser && (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
                        <AvatarFallback className="text-xs">
                          {assignedUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick stats sidebar */}
        <div className="space-y-6">
          {/* Unassigned tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <span>Unassigned Tickets</span>
              </CardTitle>
              <CardDescription>
                {unassignedTickets.length} tickets need assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {unassignedTickets.slice(0, 3).map((ticket) => {
                const customer = getCustomerById(ticket.customer_id);
                return (
                  <div 
                    key={ticket.id} 
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={customer?.avatar} alt={customer?.name} />
                      <AvatarFallback className="text-xs">
                        {customer?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ticket.subject}
                      </p>
                      <p className="text-xs text-gray-500">{customer?.name}</p>
                    </div>
                    <Badge className={getPriorityColor(ticket.priority)} className="text-xs">
                      {ticket.priority}
                    </Badge>
                  </div>
                );
              })}
              {unassignedTickets.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/tickets?filter=unassigned')}
                >
                  View {unassignedTickets.length - 3} more
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Customer satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Customer Satisfaction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-1">
                  <span>{mockStats.customer_satisfaction}</span>
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Based on 247 ratings this month</p>
                <div className="mt-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-3">{stars}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">
                        {stars === 5 ? '75%' : stars === 4 ? '20%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;