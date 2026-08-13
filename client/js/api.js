const API_BASE = '/api';

// --- Auth Functions ---

async function signup(email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.email);
  }
  return data;
}

async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.email);
  }
  return data;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = '/';
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// --- Protected Data Functions ---

async function saveTestResult(porosity) {
  const token = localStorage.getItem('token');
  if (!token) return { msg: 'Not logged in' };

  const res = await fetch(`${API_BASE}/tests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ porosity }),
  });
  return res.json();
}

async function getTestResults() {
  const token = localStorage.getItem('token');
  if (!token) return [];

  const res = await fetch(`${API_BASE}/tests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function saveRoutine(routineData) {
  const token = localStorage.getItem('token');
  if (!token) return { msg: 'Not logged in' };

  const res = await fetch(`${API_BASE}/routines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(routineData),
  });
  return res.json();
}

async function getRoutines() {
  const token = localStorage.getItem('token');
  if (!token) return [];

  const res = await fetch(`${API_BASE}/routines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}