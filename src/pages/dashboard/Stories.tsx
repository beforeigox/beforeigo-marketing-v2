import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, BookOpen, Clock, Mic, Type } from 'lucide-react';

const Stories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    'all', 'childhood', 'family-traditions', 'love-stories', 'career', 'wisdom', 'recipes'
  ];

  const stories = [
    {
      id: 1,
      title: 'My First Day of School',
      category: 'childhood',
      status: 'draft',
      wordCount: 245,
      hasAudio: false,
      lastEdited: '2 hours ago',
      prompt: 'What do you remember about your first day of school?'
    },
    {
      id: 2,
      title: 'Meeting Your Grandmother',
      category: 'love-stories',
      status: 'complete',
      wordCount: 892,
      hasAudio: true,
      lastEdited: '1 day ago',
      prompt: 'Tell the story of how you met your spouse'
    },
    {
      id: 3,
      title: 'The Recipe That Started It All',
      category: 'recipes',
      status: 'draft',
      wordCount: 156,
      hasAudio: false,
      lastEdited: '3 days ago',
      prompt: 'What family recipe holds special meaning for you?'
    },
    {
      id: 4,
      title: 'Building My Career',
      category: 'career',
      status: 'complete',
      wordCount: 1240,
      hasAudio: true,
      lastEdited: '1 week ago',
      prompt: 'What career moment are you most proud of?'
    },
    {
      id: 5,
      title: 'Sunday Family Dinners',
      category: 'family-traditions',
      status: 'draft',
      wordCount: 89,
      hasAudio: false,
      lastEdited: '2 weeks ago',
      prompt: 'What family tradition means the most to you?'
    },
    {
      id: 6,
      title: 'Lessons from Grandpa',
      category: 'wisdom',
      status: 'complete',
      wordCount: 567,
      hasAudio: false,
      lastEdited: '3 weeks ago',
      prompt: 'What wisdom did an elder family member share with you?'
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || story.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCategory = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900 mb-2">My Stories</h1>
          <p className="text-slate-600">Manage and continue writing your family legacy</p>
        </div>
        <Link
          to="/dashboard/stories/new"
          className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors font-semibold"
        >
          <Plus className="h-5 w-5" />
          <span>Start Your Story</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : formatCategory(category)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div key={story.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      story.status === 'complete' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {story.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                      {formatCategory(story.category)}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">{story.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{story.prompt}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{story.wordCount} words</span>
                  </div>
                  {story.hasAudio && (
                    <div className="flex items-center space-x-1">
                      <Mic className="h-4 w-4" />
                      <span>Audio</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{story.lastEdited}</span>
                </div>
              </div>

              <Link
                to={`/dashboard/stories/${story.id}`}
                className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded-lg transition-colors font-medium"
              >
                {story.status === 'complete' ? 'View Story' : 'Continue Writing'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No stories found</h3>
          <p className="text-slate-600 mb-6">
            {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
              ? 'Try adjusting your filters to see more stories.'
              : 'Start your legacy journey by writing your first story.'
            }
          </p>
          <Link
            to="/dashboard/stories/new"
            className="inline-flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Start Your Story</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Stories;