const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
const reveals = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');
const form = document.querySelector('.contact-form');
const formNote = document.getElementById('form-note');
const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-author');

const testimonials = [
  {
    quote:
      '"The nurses were kind every step of the way. Our daughter arrived safely and we felt truly cared for."',
    author: 'Aisha & Daniel, First-time Parents'
  },
  {
    quote:
      '"From prenatal classes to delivery day, the support was exceptional and deeply reassuring."',
    author: 'Priya, Mother of Two'
  },
  {
    quote:
      '"Our baby needed NICU care, and the pediatric team was remarkable throughout recovery."',
    author: 'Olivia & Mark, New Parents'
  }
];

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const onReveal = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(onReveal, {
  threshold: 0.18
});

reveals.forEach((el) => observer.observe(el));

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && formNote) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value.trim();

    if (!name || !email || !service) {
      formNote.textContent = 'Please fill in your name, email, and service required.';
      formNote.style.color = '#a84f35';
      return;
    }

    formNote.textContent = 'Your request has been received. Our coordinator will contact you soon.';
    formNote.style.color = '#2c6a42';
    form.reset();
  });
}

let currentTestimonial = 0;

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  quoteEl.style.opacity = '0';
  authorEl.style.opacity = '0';

  setTimeout(() => {
    quoteEl.textContent = testimonials[currentTestimonial].quote;
    authorEl.textContent = testimonials[currentTestimonial].author;
    quoteEl.style.opacity = '1';
    authorEl.style.opacity = '1';
  }, 260);
}, 5000);
