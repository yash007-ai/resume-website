// ===== 1. Typing effect in the hero =====
const roles = ["Class 12 student", "web developer", "Java learner", "problem solver"];
const typedEl = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = word.substring(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1400);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

// ===== 2. Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== 3. Dark / light theme (remembered in localStorage) =====
const themeBtn = document.getElementById("themeBtn");
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "Light mode" : "Dark mode";
}
try { applyTheme(localStorage.getItem("theme") === "dark"); } catch (e) { applyTheme(false); }
themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
});

// ===== 4. Highlight current section in the navbar =====
const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  menuLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== 5. Skill bars and counters animate once when visible =====
const fills = document.querySelectorAll(".fill");
const counts = document.querySelectorAll(".count");

function runCounter(el) {
  const target = Number(el.dataset.target);
  let n = 0;
  const timer = setInterval(() => {
    n++;
    el.textContent = n;
    if (n >= target) clearInterval(timer);
  }, 900 / target);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains("fill")) el.style.width = el.dataset.level + "%";
    if (el.classList.contains("count")) runCounter(el);
    obs.unobserve(el);
  });
}, { threshold: 0.4 });
fills.forEach(f => observer.observe(f));
counts.forEach(c => observer.observe(c));

// ===== 6. Project filter buttons =====
const filterBtns = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const type = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle("hide", type !== "all" && card.dataset.type !== type);
    });
  });
});

// ===== 7. Contact form validation =====
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  formMsg.className = "form-msg";
  if (name === "" || message === "") {
    formMsg.textContent = "Please fill in your name and message.";
    formMsg.classList.add("error");
  } else if (!emailOk) {
    formMsg.textContent = "Please enter a valid email address.";
    formMsg.classList.add("error");
  } else {
    formMsg.textContent = "Thanks " + name + "! Your message is ready to send.";
    formMsg.classList.add("ok");
    form.reset();
  }
});

// ===== 8. Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
