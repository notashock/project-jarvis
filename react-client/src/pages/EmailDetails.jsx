import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllEmails } from '../services/api';

export default function EmailDetails() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    loadEmail();
  }, [id]);

  async function loadEmail() {
    setLoading(true);
    try {
      const all = await getAllEmails();
      const found = all.find((e) => e._id === id);
      setEmail(found || null);
    } catch (err) {
      console.error('Failed to load email:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'resize-iframe' && e.data.id === id) {
        const iframe = iframeRef.current;
        if (iframe) {
          iframe.style.height = `${e.data.height + 15}px`;
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="glass p-12 text-center">
        <svg className="w-16 h-16 mx-auto text-surface-700 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <p className="text-lg text-surface-200/60 mb-4">Email not found</p>
        <Link to="/emails" className="btn-ghost">← Back to Emails</Link>
      </div>
    );
  }

  const isHtml = /<[a-z][\s\S]*>/i.test(email.body || '');

  // Build the self-resizing HTML document safely without querying DOM properties from the parent window
  const iframeContent = isHtml ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background-color: #ffffff;
          line-height: 1.6;
          padding: 24px;
          margin: 0;
          word-wrap: break-word;
        }
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        a {
          color: #4f46e5;
          text-decoration: underline;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      ${email.body}
      <script>
        function resize() {
          window.parent.postMessage({
            type: 'resize-iframe',
            id: '${email._id}',
            height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
          }, '*');
        }
        window.addEventListener('load', resize);
        window.addEventListener('resize', resize);
        setTimeout(resize, 300);
        setTimeout(resize, 1000);
      </script>
    </body>
    </html>
  ` : '';

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <Link to="/emails" className="btn-ghost inline-flex text-sm group">
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Emails
      </Link>

      {/* Email card */}
      <div className="glass p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-accent-purple flex items-center justify-center text-white text-lg font-bold shrink-0">
            {email.from?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl lg:text-2xl font-bold text-white leading-tight">{email.subject}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="text-sm text-surface-200">{email.from}</p>
              <span className="text-surface-700">•</span>
              <p className="text-sm text-surface-200/60">
                {new Date(email.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {email.important && <span className="badge-pending">Important</span>}
            {email.isRead ? (
              <span className="badge bg-surface-800 text-surface-200/50">Read</span>
            ) : (
              <span className="badge bg-brand-500/15 text-brand-400">Unread</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/[0.06]" />

        {/* Body */}
        {isHtml ? (
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-lg">
            <iframe
              ref={iframeRef}
              srcDoc={iframeContent}
              title="Email body"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts"
              className="w-full border-none transition-all duration-300"
              style={{ minHeight: '350px' }}
            />
          </div>
        ) : (
          <div className="text-surface-100/80 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-surface-900/40 p-6 rounded-xl border border-white/[0.06]">
            {email.body}
          </div>
        )}
      </div>
    </div>
  );
}
