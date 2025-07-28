// Mock data for FreeScout clone
export const mockUsers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4a7?w=100&h=100&fit=crop&crop=face",
    status: "online",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "John Smith", 
    email: "john@company.com",
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "online",
    created_at: "2024-01-16T10:00:00Z"
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily@company.com", 
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "away",
    created_at: "2024-01-17T10:00:00Z"
  }
];

export const mockCustomers = [
  {
    id: 101,
    name: "Alex Johnson",
    email: "alex@customer.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    company: "TechCorp Inc",
    phone: "+1 (555) 123-4567",
    created_at: "2024-12-01T10:00:00Z",
    total_tickets: 5
  },
  {
    id: 102,
    name: "Maria Rodriguez",
    email: "maria@startup.com",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    company: "StartupXYZ",
    phone: "+1 (555) 987-6543",
    created_at: "2024-12-05T14:30:00Z",
    total_tickets: 2
  },
  {
    id: 103,
    name: "David Kim",
    email: "david@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face", 
    company: "Enterprise Solutions",
    phone: "+1 (555) 456-7890",
    created_at: "2024-11-28T09:15:00Z",
    total_tickets: 8
  }
];

export const mockTickets = [
  {
    id: 1001,
    subject: "Login issues with mobile app",
    status: "open",
    priority: "high",
    customer_id: 101,
    assigned_to: 2,
    created_at: "2024-12-20T09:30:00Z",
    updated_at: "2024-12-20T14:45:00Z",
    tags: ["mobile", "login", "urgent"],
    conversation: [
      {
        id: 1,
        type: "customer",
        from: 101,
        content: "Hi, I'm having trouble logging into the mobile app. It keeps saying 'invalid credentials' even though I'm using the correct password.",
        created_at: "2024-12-20T09:30:00Z"
      },
      {
        id: 2,
        type: "agent",
        from: 2,
        content: "Hi Alex! I'm sorry to hear about the login issues. Let me help you troubleshoot this. Can you tell me which mobile device and operating system you're using?",
        created_at: "2024-12-20T10:15:00Z"
      },
      {
        id: 3,
        type: "customer", 
        from: 101,
        content: "I'm using an iPhone 15 with iOS 17.2. The app version is 2.1.4.",
        created_at: "2024-12-20T11:00:00Z"
      },
      {
        id: 4,
        type: "agent",
        from: 2,
        content: "Thanks for the details! There's a known issue with version 2.1.4 on iOS 17.2. Please try updating to version 2.1.5 from the App Store, which fixes this authentication bug.",
        created_at: "2024-12-20T14:45:00Z"
      }
    ]
  },
  {
    id: 1002,
    subject: "Feature request: Dark mode",
    status: "in_progress",
    priority: "medium",
    customer_id: 102,
    assigned_to: 3,
    created_at: "2024-12-19T16:20:00Z",
    updated_at: "2024-12-20T08:30:00Z",
    tags: ["feature-request", "ui"],
    conversation: [
      {
        id: 1,
        type: "customer",
        from: 102,
        content: "Hello! Would it be possible to add a dark mode to the application? It would be great for late-night work sessions.",
        created_at: "2024-12-19T16:20:00Z"
      },
      {
        id: 2,
        type: "agent",
        from: 3,
        content: "Hi Maria! That's a great suggestion. Dark mode is actually on our roadmap for Q1 2025. I'll add your request to the feature tracker and notify you when it's available.",
        created_at: "2024-12-20T08:30:00Z"
      }
    ]
  },
  {
    id: 1003,
    subject: "Billing inquiry - Invoice #12345",
    status: "resolved",
    priority: "low",
    customer_id: 103,
    assigned_to: 1,
    created_at: "2024-12-18T11:45:00Z",
    updated_at: "2024-12-19T09:15:00Z",
    tags: ["billing", "invoice"],
    conversation: [
      {
        id: 1,
        type: "customer",
        from: 103,
        content: "I have a question about invoice #12345. There seems to be a charge I don't recognize.",
        created_at: "2024-12-18T11:45:00Z"
      },
      {
        id: 2,
        type: "agent",
        from: 1,
        content: "Hi David! I've reviewed invoice #12345. The charge in question is for the premium support add-on that was activated on December 1st. I'll send you a detailed breakdown via email.",
        created_at: "2024-12-18T14:30:00Z"
      },
      {
        id: 3,
        type: "customer",
        from: 103,
        content: "Perfect, that clears it up. Thank you for the quick response!",
        created_at: "2024-12-19T09:15:00Z"
      }
    ]
  },
  {
    id: 1004,
    subject: "Integration with Slack not working",
    status: "open",
    priority: "high",
    customer_id: 101,
    assigned_to: null,
    created_at: "2024-12-20T15:30:00Z",
    updated_at: "2024-12-20T15:30:00Z",
    tags: ["integration", "slack", "urgent"],
    conversation: [
      {
        id: 1,
        type: "customer",
        from: 101,
        content: "The Slack integration stopped working this morning. We're not receiving notifications for new tickets anymore.",
        created_at: "2024-12-20T15:30:00Z"
      }
    ]
  },
  {
    id: 1005,
    subject: "Password reset not working",
    status: "open", 
    priority: "medium",
    customer_id: 102,
    assigned_to: null,
    created_at: "2024-12-20T13:15:00Z",
    updated_at: "2024-12-20T13:15:00Z",
    tags: ["password", "reset"],
    conversation: [
      {
        id: 1,
        type: "customer",
        from: 102,
        content: "I clicked 'Forgot Password' but never received the reset email. Can you help?",
        created_at: "2024-12-20T13:15:00Z"
      }
    ]
  }
];

export const mockStats = {
  total_tickets: 1247,
  open_tickets: 156,
  in_progress_tickets: 43,
  resolved_tickets: 1048,
  avg_response_time: "2.3 hours",
  customer_satisfaction: 4.7,
  tickets_today: 23,
  tickets_this_week: 89
};

// Helper functions for mock data manipulation
export const getTicketById = (id) => mockTickets.find(ticket => ticket.id === parseInt(id));
export const getCustomerById = (id) => mockCustomers.find(customer => customer.id === id);
export const getUserById = (id) => mockUsers.find(user => user.id === id);

export const getTicketsByStatus = (status) => mockTickets.filter(ticket => ticket.status === status);
export const getUnassignedTickets = () => mockTickets.filter(ticket => ticket.assigned_to === null);

export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status) => {
  switch(status) {
    case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
    case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Local storage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const generateId = () => Math.floor(Math.random() * 9000) + 1000;