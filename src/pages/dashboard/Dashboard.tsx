import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Clock, Users, Star, TrendingUp, Calendar, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, userProfile } = useAuth();

  const stats = [
    { label: 'Stories Written', value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Hours Recorded', value: '3.5', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Family Members', value: '8', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Completion', value: '45%', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const recentStories = [
    {
      id: 1,
      title: 'My First Day of School',
      category: 'Childhood',
      lastEdited: '2 hours ago',
      status: 'draft',
      wordCount: 245
    },
    {
      id: 2,
      title: 'Meeting Your Grandmother',
      category: 'Love Stories',
      lastEdited: '1 day ago',
      status: 'complete',
      wordCount: 892
    },
    {
      id: 3,
      title: 'The Recipe That Started It All',
      category: 'Family Traditions',
      lastEdited: '3 days ago',
      status: 'draft',
      wordCount: 156
    }
  ];

  const prompts = [
    {
      id: 1,
      title: 'What was your favorite family vacation?',
      category: 'Travel & Adventures',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Describe a moment when you felt most proud of your children',
      category: 'Parenting',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'What traditions do you hope your family continues?',
      category: 'Legacy',
      difficulty: 'Easy'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900 mb-2">
          Welcome back, <span className="font-medium">{userProfile?.displayName || user?.email?.split('@')[0] || 'there'}</span>
        </h1>
        <p className="text-slate-600">Continue building your family's legacy story</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Stories */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-slate-900">Recent Stories</h2>
                <Link
                  to="/dashboard/stories"
                  className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div key={story.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-slate-900">{story.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          story.status === 'complete' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {story.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>{story.category}</span>
                        <span>•</span>
                        <span>{story.wordCount} words</span>
                        <span>•</span>
                        <span>{story.lastEdited}</span>
                      </div>
                    </div>
                    <Link
                      to={`/dashboard/stories/${story.id}`}
                      className="text-rose-600 hover:text-rose-700 font-medium text-sm"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
              
              <Link
                to="/dashboard/stories/new"
                className="flex items-center justify-center space-x-2 w-full mt-6 p-4 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold"
              >
                <Plus className="h-5 w-5" />
                <span>Start Your Story</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested Prompts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-medium text-slate-900">Suggested Prompts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {prompts.map((prompt) => (
                  <div key={prompt.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        prompt.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {prompt.difficulty}
                      </span>
                    </div>
                    <h3 className="font-medium text-slate-900 mb-2">{prompt.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{prompt.category}</p>
                    <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                      Start writing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl p-6 border border-rose-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Award className="h-5 w-5 text-rose-600" />
              </div>
              <h3 className="font-medium text-slate-900">Your Progress</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              You're doing great! Keep writing to unlock new features and prompts.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Stories completed</span>
                <span className="font-medium">12/50</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-rose-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-medium text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/stories/new" 
                className="flex items-center space-x-3 p-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold"
              >
                <Plus className="h-4 w-4" />
                <span>Start Your Story</span>
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-3 p-3 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Edit Profile</span>
              </Link>
              <button className="flex items-center space-x-3 p-3 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors w-full">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Schedule Reminder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;