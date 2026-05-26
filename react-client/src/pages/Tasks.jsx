import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, generateTasksFromEmails } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newDue, setNewDue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newDesc.trim()) return;
    try {
      const task = await createTask({
        description: newDesc.trim(),
        dueDate: newDue || undefined,
        status: 'pending',
        source: 'manual',
      });
      setTasks((prev) => [task, ...prev]);
      setNewDesc('');
      setNewDue('');
      setShowAdd(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  }

  async function handleToggle(task) {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    try {
      const updated = await updateTask(task._id, { ...task, status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setGenResult(null);
    try {
      const result = await generateTasksFromEmails();
      setGenResult(result);
      await loadTasks();
    } catch (err) {
      setGenResult({ error: err.message });
    } finally {
      setGenerating(false);
    }
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'done') return t.status === 'done';
    if (filter === 'email') return t.source === 'email';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <p className="text-surface-200 mt-1">
            {tasks.filter((t) => t.status === 'pending').length} pending · {tasks.filter((t) => t.status === 'done').length} done
          </p>
        </div>
        <div className="flex gap-2">
          <button
            id="btn-add-task"
            onClick={() => setShowAdd(!showAdd)}
            className="btn-ghost"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Task
          </button>
          <button
            id="btn-generate-tasks-page"
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary disabled:opacity-50"
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                AI Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generation result */}
      {genResult && (
        <div className={`glass p-4 rounded-xl border-l-4 ${genResult.error ? 'border-l-accent-red' : 'border-l-accent-green'}`}>
          <p className={`text-sm font-medium ${genResult.error ? 'text-accent-red' : 'text-accent-green'}`}>
            {genResult.error ? `Error: ${genResult.error}` : `✨ ${genResult.taskCount} new task(s) generated!`}
          </p>
        </div>
      )}

      {/* Add task form */}
      {showAdd && (
        <div className="glass p-5 space-y-4">
          <h3 className="text-sm font-semibold text-surface-200">New Task</h3>
          <div className="flex gap-3">
            <input
              id="input-task-desc"
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 bg-surface-800/60 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-surface-200/30 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/25 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <input
              id="input-task-due"
              type="date"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
              className="bg-surface-800/60 border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500/50 transition-all"
            />
            <button onClick={handleAdd} className="btn-primary">
              Add
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'done', label: 'Completed' },
          { key: 'email', label: 'AI Generated' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? 'bg-brand-600/15 text-brand-400 shadow-sm'
                : 'text-surface-200 hover:bg-white/[0.04]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-surface-700 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p className="text-surface-200/60">
            {filter === 'all' ? 'No tasks yet. Add one or generate from emails!' : 'No tasks match this filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => (
            <div
              key={task._id}
              id={`task-${task._id}`}
              className="glass glass-hover p-4 flex items-start gap-4 group"
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggle(task)}
                className={`w-5 h-5 rounded-md border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  task.status === 'done'
                    ? 'bg-accent-green border-accent-green'
                    : 'border-surface-700 hover:border-brand-500'
                }`}
              >
                {task.status === 'done' && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.status === 'done' ? 'line-through text-surface-200/50' : 'text-white'}`}>
                  {task.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  {task.source === 'email' && <span className="badge-email text-[10px]">AI Generated</span>}
                  {task.status === 'pending' && <span className="badge-pending text-[10px]">Pending</span>}
                  {task.status === 'done' && <span className="badge-done text-[10px]">Done</span>}
                  {task.dueDate && (
                    <span className="text-xs text-surface-200/50">
                      Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(task._id)}
                className="p-1.5 rounded-lg text-surface-200/30 hover:text-accent-red hover:bg-accent-red/10 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
