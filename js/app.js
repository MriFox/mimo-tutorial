document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initChapterCheckbox();
  initSmoothScroll();
});

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

function initChapterCheckbox() {
  const checkbox = document.getElementById('mark-completed');
  if (checkbox) {
    const chapterId = checkbox.dataset.chapter;
    checkbox.checked = Progress.isCompleted(chapterId);
    
    checkbox.addEventListener('change', () => {
      Progress.toggle(chapterId);
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function showTip(message) {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.textContent = message;
  document.querySelector('.content')?.appendChild(tip);
  setTimeout(() => tip.remove(), 3000);
}
