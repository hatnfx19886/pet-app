'use strict';
// Add Animation for Sidebar
const navbarEl = document.getElementById('sidebar');
navbarEl.addEventListener('click', function () {
  navbarEl.classList.toggle('active');
});

// Local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
