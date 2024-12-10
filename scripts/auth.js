document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
  
    // Simulated user database
    const users = [];
  
    // Handle Sign-Up
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        if (users.some(user => user.email === email)) {
          alert('Email is already registered.');
          return;
        }
  
        users.push({ username, email, password });
        alert('Sign-up successful!');
        window.location.href = 'login.html';
      });
    }
  
    // Handle Log-In
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        const user = users.find(user => user.email === email && user.password === password);
  
        if (user) {
          alert(`Welcome back, ${user.username}!`);
          // Redirect to the dashboard (to be implemented)
          window.location.href = 'index.html';
        } else {
          alert('Invalid email or password.');
        }
      });
    }
  });
  