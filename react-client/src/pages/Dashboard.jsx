import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllEmails, getTasks, generateTasksFromEmails, redirectToGoogleAuth } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [emailData, taskData] = await Promise.allSettled([getAllEmails(), getTasks()]);
      if (emailData.status === 'fulfilled') setEmails(emailData.value);
      if (taskData.status === 'fulfilled') setTasks(taskData.value);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateTasks() {
    setGenerating(true);
    setGenResult(null);
    try {
      const result = await generateTasksFromEmails();
      setGenResult(result);
      // Reload tasks
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      setGenResult({ error: err.message });
    } finally {
      setGenerating(false);
    }
  }

  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const doneTasks = tasks.filter((t) => t.status === 'done');
  const emailTasks = tasks.filter((t) => t.source === 'email');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-purple flex items-center justify-center shadow-2xl shadow-brand-500/30 mb-8">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Welcome to Jarvis</h1>
        <p className="text-surface-200 mb-8 max-w-md">
          Your intelligent personal assistant. Connect your Google account to get started with email management and AI-powered task generation.
        </p>
        <button
          id="btn-connect-google"
          onClick={redirectToGoogleAuth}
          className="btn-primary text-base px-8 py-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Connect Google Account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-surface-200 mt-1">Welcome back. Here's your overview.</p>
        </div>
        <button
          id="btn-generate-tasks"
          onClick={handleGenerateTasks}
          disabled={generating}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
              Generate Tasks from Emails
            </>
          )}
        </button>
      </div>

      {/* Generation result toast */}
      {genResult && (
        <div className={`glass p-4 rounded-xl border-l-4 ${genResult.error ? 'border-l-accent-red' : 'border-l-accent-green'}`}>
          <p className={`text-sm font-medium ${genResult.error ? 'text-accent-red' : 'text-accent-green'}`}>
            {genResult.error
              ? `Error: ${genResult.error}`
              : `✨ ${genResult.taskCount} task(s) generated from your emails!`}
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Emails"
          value={loading ? '—' : emails.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          }
          color="brand"
        />
        <StatCard
          label="Pending Tasks"
          value={loading ? '—' : pendingTasks.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          color="amber"
        />
        <StatCard
          label="Completed"
          value={loading ? '—' : doneTasks.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          color="green"
        />
        <StatCard
          label="AI-Generated"
          value={loading ? '—' : emailTasks.length}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          }
          color="purple"
        />
      </div>

      {/* Two-column layout: Recent Emails + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Emails</h2>
            <Link to="/emails" className="btn-ghost text-xs">View All →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}
            </div>
          ) : emails.length === 0 ? (
            <p className="text-sm text-surface-200/60 py-8 text-center">No emails yet. Sync your inbox to get started.</p>
          ) : (
            <div className="space-y-2">
              {emails.slice(0, 5).map((email) => (
                <Link
                  key={email._id}
                  to={`/emails/${email._id}`}
                  className="block glass-hover rounded-xl p-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${email.important ? 'bg-accent-amber' : 'bg-surface-700'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate group-hover:text-brand-400 transition-colors">
                        {email.subject}
                      </p>
                      <p className="text-xs text-surface-200/60 truncate mt-0.5">{email.from}</p>
                    </div>
                    <span className="text-xs text-surface-200/40 shrink-0">
                      {new Date(email.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Tasks */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Active Tasks</h2>
            <Link to="/tasks" className="btn-ghost text-xs">View All →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}
            </div>
          ) : pendingTasks.length === 0 ? (
            <p className="text-sm text-surface-200/60 py-8 text-center">No pending tasks. Use AI to generate tasks from your emails!</p>
          ) : (
            <div className="space-y-2">
              {pendingTasks.slice(0, 5).map((task) => (
                <div key={task._id} className="glass-hover rounded-xl p-3 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md border-2 border-surface-700 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white">{task.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.source === 'email' && <span className="badge-email">AI Generated</span>}
                      {task.dueDate && (
                        <span className="text-xs text-surface-200/50">
                          Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    brand: 'from-brand-500/20 to-brand-600/5 text-brand-400',
    amber: 'from-accent-amber/20 to-accent-amber/5 text-accent-amber',
    green: 'from-accent-green/20 to-accent-green/5 text-accent-green',
    purple: 'from-accent-purple/20 to-accent-purple/5 text-accent-purple',
  };

  return (
    <div className="glass glass-hover p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-surface-200/70">{label}</span>
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}
