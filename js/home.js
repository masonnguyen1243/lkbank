/* ================================================================
   HENO × Tingee — Portal Landing Page
   Theme Toggle Script
   ================================================================ */

"use strict";

const toggleBtn = document.getElementById('themeToggleBtn');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
