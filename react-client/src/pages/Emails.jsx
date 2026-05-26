import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmails, fetchLatestEmails } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Emails() {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filter, setFilter] = useState('all'); // all | important | unread

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    setLoading(true);
    try {
      const data = await getAllEmails();
      setEmails(data);
    } catch (err) {
      console.error('Failed to load emails:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    if (!user) return;
    setSyncing(true);
    try {
      await fetchLatestEmails();
      await loadEmails();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncing(false);
    }
  }

  const filtered = emails.filter((e) => {
    if (filter === 'important') return e.important;
    if (filter === 'unread') return !e.isRead;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Emails</h1>
          <p className="text-surface-200 mt-1">{emails.length} emails in your inbox</p>
        </div>
        <button
          id="btn-sync-emails"
          onClick={handleSync}
          disabled={syncing || !user}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {syncing ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Syncing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
              </svg>
              Sync Inbox
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'important', 'unread'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-brand-600/15 text-brand-400 shadow-sm'
                : 'text-surface-200 hover:bg-white/[0.04]'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Email list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-surface-700 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <p className="text-surface-200/60">No emails found. Try syncing your inbox.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((email) => (
            <Link
              key={email._id}
              to={`/emails/${email._id}`}
              id={`email-${email._id}`}
              className="block glass glass-hover p-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-accent-purple flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {email.from?.[0]?.toUpperCase() || '?'}
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-brand-400 transition-colors">
                      {email.subject}
                    </p>
                    {email.important && <span className="badge-pending text-[10px]">Important</span>}
                  </div>
                  <p className="text-xs text-surface-200/70 truncate">{email.from}</p>
                  <p className="text-xs text-surface-200/40 mt-1 line-clamp-1">{email.body}</p>
                </div>
                {/* Meta */}
                <div className="text-right shrink-0">
                  <p className="text-xs text-surface-200/40">
                    {new Date(email.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  {!email.isRead && (
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-500 mt-2" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
