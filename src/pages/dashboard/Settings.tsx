import React, { useState } from 'react';
import { Bell, Shield, Download, Trash2, Eye, EyeOff, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailReminders: true,
      weeklyProgress: true,
      familySharing: false,
      productUpdates: true
    },
    privacy: {
      profileVisibility: 'family',
      storySharing: 'private',
      allowDownloads: true
    },
    preferences: {
      autoSave: true,
      voiceTranscription: true,
      aiSuggestions: false
    }
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (category: string, setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save to Firebase
      console.log('Saving settings:', settings);
      setTimeout(() => {
        setIsSaving(false);
        alert('Settings saved successfully!');
      }, 1000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    // This would trigger a data export
    alert('Your data export will be emailed to you within 24 hours.');
  };

  const handleDeleteAccount = () => {
    // This would handle account deletion
    alert('Account deletion initiated. You will receive a confirmation email.');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account preferences and privacy settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="h-6 w-6 text-slate-600" />
            <h2 className="text-xl font-medium text-slate-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Email Reminders</h3>
                <p className="text-sm text-slate-600">Get gentle reminders to continue writing your stories</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailReminders}
                  onChange={(e) => handleSettingChange('notifications', 'emailReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Weekly Progress</h3>
                <p className="text-sm text-slate-600">Receive weekly summaries of your writing progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyProgress}
                  onChange={(e) => handleSettingChange('notifications', 'weeklyProgress', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Family Sharing Notifications</h3>
                <p className="text-sm text-slate-600">Get notified when family members interact with your stories</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.familySharing}
                  onChange={(e) => handleSettingChange('notifications', 'familySharing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Product Updates</h3>
                <p className="text-sm text-slate-600">Stay informed about new features and improvements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.productUpdates}
                  onChange={(e) => handleSettingChange('notifications', 'productUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-slate-600" />
            <h2 className="text-xl font-medium text-slate-900">Privacy & Security</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-slate-900 mb-2">Profile Visibility</h3>
              <p className="text-sm text-slate-600 mb-3">Choose who can see your profile information</p>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
              >
                <option value="private">Private (Only me)</option>
                <option value="family">Family members only</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium text-slate-900 mb-2">Story Sharing</h3>
              <p className="text-sm text-slate-600 mb-3">Control how your stories can be shared</p>
              <select
                value={settings.privacy.storySharing}
                onChange={(e) => handleSettingChange('privacy', 'storySharing', e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
              >
                <option value="private">Private (Only me)</option>
                <option value="family">Family members only</option>
                <option value="invited">Invited people only</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Allow Downloads</h3>
                <p className="text-sm text-slate-600">Let family members download your stories</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowDownloads}
                  onChange={(e) => handleSettingChange('privacy', 'allowDownloads', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="h-6 w-6 text-slate-600" />
            <h2 className="text-xl font-medium text-slate-900">Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Auto-save</h3>
                <p className="text-sm text-slate-600">Automatically save your work as you write</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.preferences.autoSave}
                  onChange={(e) => handleSettingChange('preferences', 'autoSave', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">Voice Transcription</h3>
                <p className="text-sm text-slate-600">Automatically convert voice recordings to text</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.preferences.voiceTranscription}
                  onChange={(e) => handleSettingChange('preferences', 'voiceTranscription', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-900">AI Writing Suggestions</h3>
                <p className="text-sm text-slate-600">Get AI-powered suggestions to enhance your stories</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.preferences.aiSuggestions}
                  onChange={(e) => handleSettingChange('preferences', 'aiSuggestions', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Download className="h-6 w-6 text-slate-600" />
            <h2 className="text-xl font-medium text-slate-900">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h3 className="font-medium text-slate-900">Export Your Data</h3>
                <p className="text-sm text-slate-600">Download all your stories and data</p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export Data
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <Trash2 className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-medium text-slate-900">Delete Account</h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently 
              delete all your stories, recordings, and account data.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;