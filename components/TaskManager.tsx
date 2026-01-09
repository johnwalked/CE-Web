import React, { useState } from 'react';
import { Task, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ClipboardList, Plus, CheckCircle2, Circle, Trash2, Calendar, AlertCircle, Check } from 'lucide-react';

interface TaskManagerProps {
  language: Language;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ language }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Yuchai Specifications',
      description: 'Check if the 100kW model fits the client requirements for the new hospital project.',
      status: 'pending',
      priority: 'high',
      createdAt: Date.now(),
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
    }
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const t = TRANSLATIONS[language];

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || '',
      status: 'pending',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      dueDate: newTask.dueDate,
      createdAt: Date.now()
    };

    setTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Create Task Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl h-fit sticky top-24">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase italic">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Plus className="text-black w-5 h-5" />
            </div>
            {t.tasks.title}
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">{t.tasks.inputTitle}</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="e.g., Call supplier"
                className="w-full bg-black border border-zinc-700 rounded-xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-500 transition-all placeholder-zinc-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">{t.tasks.inputDesc}</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Add details..."
                rows={3}
                className="w-full bg-black border border-zinc-700 rounded-xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-500 resize-none transition-all placeholder-zinc-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">{t.tasks.inputPriority}</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full appearance-none bg-black border border-zinc-700 rounded-xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-500"
                >
                  <option value="low" className="bg-zinc-900">Low</option>
                  <option value="medium" className="bg-zinc-900">Medium</option>
                  <option value="high" className="bg-zinc-900">High</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 ml-1">{t.tasks.inputDate}</label>
                 <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-6 py-4 text-white text-sm focus:outline-none focus:border-yellow-500 [color-scheme:dark]"
                />
              </div>
            </div>

            <button
              onClick={handleAddTask}
              disabled={!newTask.title}
              className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_0_rgb(161,98,7)] hover:shadow-[0_2px_0_rgb(161,98,7)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
            >
              <Plus className="w-5 h-5" />
              {t.tasks.btnAdd}
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-yellow-500" />
              {t.tasks.listTitle}
            </h2>
            
            <div className="flex bg-zinc-900 rounded-full p-1.5 border border-zinc-800 shadow-lg">
              {(['all', 'pending', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    filter === f 
                      ? 'bg-yellow-500 text-black shadow' 
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                 <ClipboardList className="w-10 h-10 text-zinc-600" />
              </div>
              <p className="text-zinc-500 font-bold uppercase text-sm">{t.tasks.noTasks}</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-yellow-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
                  task.status === 'completed' ? 'opacity-60 grayscale' : 'opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStatus(task.id)}
                    className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === 'completed'
                        ? 'bg-yellow-500 border-yellow-500 text-black'
                        : 'border-zinc-600 hover:border-yellow-500 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 font-bold" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`text-lg font-bold truncate ${task.status === 'completed' ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className={`text-sm mb-3 ${task.status === 'completed' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                      {task.dueDate && (
                        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-yellow-600" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};