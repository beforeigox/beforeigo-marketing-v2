import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    displayName: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Portland, Oregon',
    birthDate: '1958-03-15',
    bio: 'A mother of three and grandmother of five, I love gardening, cooking family recipes, and sharing stories that connect our generations.',
    plan: 'Premium',
    joinDate: '2024-01-15'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save to Firebase
      console.log('Saving profile:', profile);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }, 1000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your account information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture & Plan Info */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-rose-600" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <h3 className="text-lg font-medium text-slate-900">{profile.displayName}</h3>
            <p className="text-slate-600">{profile.email}</p>
          </div>

          {/* Plan Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-medium text-slate-900 mb-4">Plan Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Current Plan</span>
                <span className="font-medium text-rose-600">{profile.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Member Since</span>
                <span className="text-slate-900">
                  {new Date(profile.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-xl font-medium text-slate-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={profile.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  About Me
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500 resize-none"
                  placeholder="Tell your family a bit about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Family Members */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-slate-900">Family Members</h3>
              <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                Add Family Member
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Michael Mitchell', relationship: 'Spouse', email: 'michael@email.com' },
                { name: 'Emma Mitchell', relationship: 'Daughter', email: 'emma@email.com' },
                { name: 'James Mitchell', relationship: 'Son', email: 'james@email.com' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{member.name}</h4>
                    <p className="text-sm text-slate-600">{member.relationship} • {member.email}</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <User className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;