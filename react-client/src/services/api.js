const API_BASE = '/api';

/**
 * Retrieve the stored JWT token from localStorage.
 */
export function getToken() {
  return localStorage.getItem('jarvis_token');
}

/**
 * Store the JWT token in localStorage after login.
 */
export function setToken(token) {
  localStorage.setItem('jarvis_token', token);
}

/**
 * Remove the stored token (logout).
 */
export function clearToken() {
  localStorage.removeItem('jarvis_token');
}

/**
 * Build standard headers with Authorization if a token exists.
 */
function authHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Generic fetch wrapper with error handling.
 */
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: authHeaders(),
      ...options,
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok || body.status === 'error') {
      const errorMsg = body.message || body.error || `Request failed: ${res.status}`;
      const error = new Error(errorMsg);
      error.status = res.status;

      // Dispatch a custom event so the global notification system catches it
      window.dispatchEvent(
        new CustomEvent('api-error', {
          detail: { message: errorMsg, type: 'error' },
        })
      );

      throw error;
    }

    // Automatically unwrap success data if it follows the standardized structure
    if (body.status === 'success' && 'data' in body) {
      return body.data;
    }

    return body;
  } catch (err) {
    // Dispatch network/CORS/fetch-level failures
    if (!err.status) {
      window.dispatchEvent(
        new CustomEvent('api-error', {
          detail: { message: err.message || 'Connection to server failed', type: 'error' },
        })
      );
    }
    throw err;
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * Redirect the user to the Google OAuth consent screen.
 */
export function redirectToGoogleAuth() {
  window.location.href = `${API_BASE}/auth/google`;
}

/**
 * Get connected email accounts.
 */
export function getConnectedAccounts() {
  return request('/gmail/accounts');
}

// ─── Gmail ───────────────────────────────────────────────────────────────────

/**
 * Fetch today's emails (requires auth token).
 */
export function fetchLatestEmails() {
  return request('/gmail/latest');
}

/**
 * Get all emails stored in the DB.
 */
export function getAllEmails() {
  return request('/gmail/all');
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

/**
 * Get all tasks.
 */
export function getTasks() {
  return request('/tasks');
}

/**
 * Get a single task by id.
 */
export function getTaskById(id) {
  return request(`/tasks/${id}`);
}

/**
 * Create a new task (manual).
 */
export function createTask(data) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update a task.
 */
export function updateTask(id, data) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete a task.
 */
export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' });
}

/**
 * Generate tasks from emails — the priority feature.
 * POST /api/tasks/generate-from-emails
 */
export function generateTasksFromEmails() {
  return request('/tasks/generate-from-emails', { method: 'POST' });
}

// ─── Gemini ──────────────────────────────────────────────────────────────────

/**
 * Process/summarize emails with Gemini AI.
 */
export function processEmailsWithAI() {
  return request('/gemini/emails/process', { method: 'POST' });
}
