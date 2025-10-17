/* global IntersectionObserver */
import './index.css';

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

// Функция для анимации печати текста
function startTypewriterAnimation(element) {
  if (element.classList.contains('typewriter-started')) {
    return;
  }

  element.classList.add('typewriter-started');

  const originalText = element.textContent.trim();
  const speed = parseInt(element.dataset.typeSpeed) || 30;
  const delay = parseInt(element.dataset.typeDelay) || 200;

  element.textContent = '';
  element.style.opacity = '1';

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  element.appendChild(cursor);

  setTimeout(() => {
    typeText(element, originalText, cursor, speed, 0);
  }, delay);
}

function typeText(element, fullText, cursor, speed, index) {
  if (index < fullText.length) {
    const textNode = document.createTextNode(fullText[index]);

    element.insertBefore(textNode, cursor);

    setTimeout(() => {
      typeText(element, fullText, cursor, speed, index + 1);
    }, speed);
  } else {
    removeCursor(cursor);
  }
}

// Функция для удаления курсора с анимацией
function removeCursor(cursor) {
  setTimeout(() => {
    cursor.style.opacity = '0';
    cursor.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    }, 300);
  }, 500);
}

// Инициализация наблюдателей
function initObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('typewriter-multiline')) {
          startTypewriterAnimation(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-left, .slide-right, .typewriter-multiline').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initObservers);
