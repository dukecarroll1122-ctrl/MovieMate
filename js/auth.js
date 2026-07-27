// ========== AUTH FUNCTIONS ==========

function registerUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem('mm_users') || '[]');
  const exists = users.find(u => u.email === email || u.username === username);
  if (exists) return { success: false, message: 'Username or email already exists.' };
  const user = { username, email, password, createdAt: new Date().toISOString() };
  users.push(user);
  localStorage.setItem('mm_users', JSON.stringify(users));
  return { success: true };
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('mm_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, message: 'Invalid email or password.' };
  localStorage.setItem('mm_current_user', JSON.stringify(user));
  return { success: true, user };
}

function logoutUser() {
  localStorage.removeItem('mm_current_user');
  window.location.href = '../index.html';
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('mm_current_user') || 'null');
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) window.location.href = 'index.html';
  return user;
}
