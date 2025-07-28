import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  Shield, 
  Palette,
  Globe,
  Key,
  Save,
  Upload,
  RefreshCw
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    company_name: 'FreeScout',
    company_email: 'support@company.com',
    company_website: 'https://company.com',
    timezone: 'UTC',
    language: 'en',
    
    // Email Settings
    email_notifications: true,
    email_signature: 'Best regards,\nSupport Team',
    smtp_host: '',
    smtp_port: '587',
    smtp_username: '',
    smtp_password: '',
    
    // Notification Settings
    browser_notifications: true,
    sound_notifications: false,
    desktop_notifications: true,
    new_ticket_notification: true,
    assignment_notification: true,
    
    // Security Settings
    two_factor_auth: false,
    session_timeout: '30',
    password_policy: 'medium',
    
    // Appearance Settings
    theme: 'light',
    sidebar_collapsed: false,
    items_per_page: '25',
    
    // API Settings
    api_enabled: true,
    webhook_url: '',
    rate_limit: '1000'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (section) => {
    toast({
      title: `${section} Settings Saved`,
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your FreeScout configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={settings.company_name}
                    onChange={(e) => handleSettingChange('company_name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="company_email">Company Email</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={settings.company_email}
                    onChange={(e) => handleSettingChange('company_email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="company_website">Company Website</Label>
                  <Input
                    id="company_website"
                    value={settings.company_website}
                    onChange={(e) => handleSettingChange('company_website', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('General')} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email_notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send email notifications for ticket updates</p>
                </div>
                <Switch
                  id="email_notifications"
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) => handleSettingChange('email_notifications', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="email_signature">Email Signature</Label>
                <Textarea
                  id="email_signature"
                  value={settings.email_signature}
                  onChange={(e) => handleSettingChange('email_signature', e.target.value)}
                  rows={3}
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp_host">SMTP Host</Label>
                    <Input
                      id="smtp_host"
                      value={settings.smtp_host}
                      onChange={(e) => handleSettingChange('smtp_host', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtp_port">SMTP Port</Label>
                    <Input
                      id="smtp_port"
                      value={settings.smtp_port}
                      onChange={(e) => handleSettingChange('smtp_port', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtp_username">SMTP Username</Label>
                    <Input
                      id="smtp_username"
                      value={settings.smtp_username}
                      onChange={(e) => handleSettingChange('smtp_username', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtp_password">SMTP Password</Label>
                    <Input
                      id="smtp_password"
                      type="password"
                      value={settings.smtp_password}
                      onChange={(e) => handleSettingChange('smtp_password', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Test Email
                </Button>
                <Button onClick={() => handleSave('Email')} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser_notifications">Browser Notifications</Label>
                    <p className="text-sm text-gray-600">Show notifications in your browser</p>
                  </div>
                  <Switch
                    id="browser_notifications"
                    checked={settings.browser_notifications}
                    onCheckedChange={(checked) => handleSettingChange('browser_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound_notifications">Sound Notifications</Label>
                    <p className="text-sm text-gray-600">Play sounds for new notifications</p>
                  </div>
                  <Switch
                    id="sound_notifications"
                    checked={settings.sound_notifications}
                    onCheckedChange={(checked) => handleSettingChange('sound_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="desktop_notifications">Desktop Notifications</Label>
                    <p className="text-sm text-gray-600">Show desktop notifications when app is minimized</p>
                  </div>
                  <Switch
                    id="desktop_notifications"
                    checked={settings.desktop_notifications}
                    onCheckedChange={(checked) => handleSettingChange('desktop_notifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new_ticket_notification">New Ticket Notifications</Label>
                    <p className="text-sm text-gray-600">Notify when new tickets are created</p>
                  </div>
                  <Switch
                    id="new_ticket_notification"
                    checked={settings.new_ticket_notification}
                    onCheckedChange={(checked) => handleSettingChange('new_ticket_notification', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="assignment_notification">Assignment Notifications</Label>
                    <p className="text-sm text-gray-600">Notify when tickets are assigned to you</p>
                  </div>
                  <Switch
                    id="assignment_notification"
                    checked={settings.assignment_notification}
                    onCheckedChange={(checked) => handleSettingChange('assignment_notification', checked)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('Notification')} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two_factor_auth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="two_factor_auth"
                  checked={settings.two_factor_auth}
                  onCheckedChange={(checked) => handleSettingChange('two_factor_auth', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session_timeout"
                    value={settings.session_timeout}
                    onChange={(e) => handleSettingChange('session_timeout', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password_policy">Password Policy</Label>
                  <Select value={settings.password_policy} onValueChange={(value) => handleSettingChange('password_policy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('Security')} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Interface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="items_per_page">Items Per Page</Label>
                  <Select value={settings.items_per_page} onValueChange={(value) => handleSettingChange('items_per_page', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sidebar_collapsed">Collapse Sidebar by Default</Label>
                  <p className="text-sm text-gray-600">Start with a collapsed sidebar for more space</p>
                </div>
                <Switch
                  id="sidebar_collapsed"
                  checked={settings.sidebar_collapsed}
                  onCheckedChange={(checked) => handleSettingChange('sidebar_collapsed', checked)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('Appearance')} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;