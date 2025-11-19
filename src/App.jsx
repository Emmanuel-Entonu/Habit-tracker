import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, ChevronRight, Home, BarChart3, Grid3x3, User, Award, Target, Flame, TrendingUp, Clock } from 'lucide-react';

function App() {
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Health');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'statistics'

  const categories = ['Health', 'Productivity', 'Learning', 'Fitness', 'Mindfulness'];
  const categoryColors = {
    Health: 'bg-green-500',
    Productivity: 'bg-blue-500',
    Learning: 'bg-cyan-400',
    Fitness: 'bg-purple-500',
    Mindfulness: 'bg-pink-500'
  };

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit = {
        id: Date.now(),
        name: newHabitName,
        category: selectedCategory,
        completedDates: [],
        createdAt: new Date().toISOString()
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabitToday = (id) => {
    const today = new Date().toDateString();
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isCompletedToday = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompletedToday
            ? habit.completedDates.filter(d => d !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  const getStreak = (completedDates) => {
    if (completedDates.length === 0) return 0;
    
    const dates = completedDates.map(d => new Date(d)).sort((a, b) => b - a);
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let date of dates) {
      date.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const isCompletedToday = (completedDates) => {
    const today = new Date().toDateString();
    return completedDates.includes(today);
  };

  const totalCompleted = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const completedToday = habits.filter(h => isCompletedToday(h.completedDates)).length;
  const bestStreak = Math.max(0, ...habits.map(h => getStreak(h.completedDates)));


  const categoryData = categories.map(cat => {
    const categoryHabits = habits.filter(h => h.category === cat);
    const total = categoryHabits.reduce((sum, h) => sum + h.completedDates.length, 0);
    return { category: cat, count: total };
  });

  const totalCategoryCount = categoryData.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wider">ALPHA</h1>
          <button className="p-2">
            <User size={24} className="text-gray-400" />
          </button>
        </div>
      </div>

      {currentView === 'home' && (
        <div className="px-6 py-6 pb-24">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-1">FRANCIS SUCK MY DICK</h2>
            <p className="text-gray-500 text-sm">Dashboard</p>
          </div>

         
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <Target className="text-blue-400 mb-2" size={20} />
              <p className="text-2xl font-bold">{habits.length}</p>
              <p className="text-xs text-gray-500">Tasks</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <Flame className="text-orange-400 mb-2" size={20} />
              <p className="text-2xl font-bold">{bestStreak}</p>
              <p className="text-xs text-gray-500">Streak</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <Check className="text-green-400 mb-2" size={20} />
              <p className="text-2xl font-bold">{completedToday}</p>
              <p className="text-xs text-gray-500">Today</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Task Lists</h3>
            

            <div 
              onClick={() => setCurrentView('statistics')}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 mb-3 border border-gray-700 flex items-center justify-between cursor-pointer hover:border-blue-500 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Flame className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Streak System</h4>
                  <p className="text-xs text-gray-500">Track your consistency</p>
                </div>
              </div>
              <ChevronRight className="text-gray-500" size={20} />
            </div>


            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 mb-3 border border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Award className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Consistency Badges</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs">
                      🏆
                    </div>
                    <span className="text-xs text-gray-400">{totalCompleted} completed</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-500" size={20} />
            </div>


            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl p-4 flex items-center justify-center gap-2 font-semibold transition"
            >
              <Plus size={20} />
              Add New Habit
            </button>
          </div>


          {showAddForm && (
            <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4">Create New Habit</h3>
              <input
                type="text"
                placeholder="Habit name (e.g., Morning Exercise)"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                className="w-full bg-black px-4 py-3 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <div className="mb-4">
                <label className="block text-gray-400 mb-2 text-sm">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === cat
                          ? `${categoryColors[cat]} text-white`
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addHabit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewHabitName('');
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Your Habits</h3>
            {habits.length === 0 ? (
              <div className="bg-gray-900 rounded-2xl p-12 text-center border border-gray-800">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
                <p className="text-gray-500 text-sm">Start building better habits today!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {habits.map(habit => {
                  const streak = getStreak(habit.completedDates);
                  const completed = isCompletedToday(habit.completedDates);

                  return (
                    <div
                      key={habit.id}
                      className="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <button
                            onClick={() => toggleHabitToday(habit.id)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-green-500'
                                : 'bg-gray-800 border-2 border-gray-700'
                            }`}
                          >
                            {completed && <Check size={20} className="text-white" />}
                          </button>
                          <div className="flex-1">
                            <h4 className="font-semibold">{habit.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`${categoryColors[habit.category]} text-white text-xs px-2 py-1 rounded-full`}>
                                {habit.category}
                              </span>
                              {streak > 0 && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Flame size={12} className="text-orange-400" />
                                  {streak} days
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteHabit(habit.id)}
                          className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>


          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Badges Grid</h3>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((badge, idx) => {
                const isUnlocked = totalCompleted >= badge * 5;
                return (
                  <div
                    key={badge}
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center transition ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400 shadow-lg shadow-blue-500/50'
                        : 'bg-gray-900 border-gray-800'
                    }`}
                  >
                    {isUnlocked ? (
                      <Award className="text-white" size={24} />
                    ) : (
                      <div className="text-gray-700 text-xl">🔒</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {currentView === 'statistics' && (
        <div className="px-6 py-6 pb-24">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-gray-400 mb-6 hover:text-white transition"
          >
            <ChevronRight size={20} className="rotate-180" />
            Back
          </button>

          <h2 className="text-3xl font-bold mb-6">Statistics</h2>

          <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Category Overview</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  {categoryData.map((cat, idx) => {
                    const percentage = totalCategoryCount > 0 ? (cat.count / totalCategoryCount) * 100 : 0;
                    const offset = categoryData.slice(0, idx).reduce((sum, c) => {
                      return sum + (totalCategoryCount > 0 ? (c.count / totalCategoryCount) * 100 : 0);
                    }, 0);
                    
                    const colors = {
                      Health: '#10b981',
                      Productivity: '#3b82f6',
                      Learning: '#22d3ee',
                      Fitness: '#a855f7',
                      Mindfulness: '#ec4899'
                    };

                    return percentage > 0 ? (
                      <circle
                        key={cat.category}
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={colors[cat.category]}
                        strokeWidth="10"
                        strokeDasharray={`${percentage * 2.2} ${220 - percentage * 2.2}`}
                        strokeDashoffset={-offset * 2.2}
                      />
                    ) : null;
                  })}
                  <circle cx="50" cy="50" r="25" fill="#111" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{totalCompleted}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                {categoryData.filter(c => c.count > 0).map(cat => (
                  <div key={cat.category} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[cat.category]}`}></div>
                    <span className="text-sm text-gray-400">{cat.category}</span>
                    <span className="text-sm font-semibold ml-auto">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Check className="text-green-400" size={20} />
                <h4 className="text-sm text-gray-400">Tasks Completed</h4>
              </div>
              <p className="text-3xl font-bold">{totalCompleted}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="text-orange-400" size={20} />
                <h4 className="text-sm text-gray-400">Streak Days</h4>
              </div>
              <p className="text-3xl font-bold">{bestStreak}</p>
              <p className="text-xs text-gray-500 mt-1">Best streak</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-400" size={20} />
              <h4 className="text-sm text-gray-400">Time Spent Today</h4>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{completedToday * 15}m</p>
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Average 15min per task</p>
          </div>
        </div>
      )}


      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-6 py-4">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 transition ${
              currentView === 'home' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('statistics')}
            className={`flex flex-col items-center gap-1 transition ${
              currentView === 'statistics' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs">Stats</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Grid3x3 size={24} />
            <span className="text-xs">Badges</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
