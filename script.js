// 1. Menu Mobile Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 2. Smooth Scroll (Rolagem Suave)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Fecha o menu mobile se estiver aberto
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 3. Envio do Formulário (FormSubmit via AJAX)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerText;
  btn.innerText = 'Enviando...';
  btn.disabled = true;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // INSIRA O SEU E-MAIL AQUI (substitua a string abaixo pelo seu email)
  const email = 'dariofa69@gmail.com';

  fetch(`https://formsubmit.co/ajax/${email}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      alert('Mensagem enviada com sucesso! Importante: Verifique a caixa de entrada do seu email para confirmar o FormSubmit no primeiro envio.');
      form.reset();
    })
    .catch(error => {
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
      console.error(error);
    })
    .finally(() => {
      btn.innerText = originalText;
      btn.disabled = false;
    });
});
// --- Script para Animação Tecnológica ---
const techContainer = document.getElementById('tech-animation');
const symbols = ['0', '1', '{', '}', '<', '>', '/', '*', '=', '+', ';', '(', ')', '[', ']', 'T', 'E', 'C', 'H'];

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('tech-particle');

  // Seleciona um símbolo aleatório
  particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

  // Posição aleatória na horizontal
  particle.style.left = Math.random() * 100 + 'vw';

  // Duração aleatória da animação
  particle.style.animationDuration = Math.random() * 5 + 5 + 's'; // Entre 5s e 10s

  // Tamanho aleatório
  particle.style.fontSize = Math.random() * 1.5 + 1 + 'rem';

  // Define o delay inicial para que não nasçam todos de uma vez
  particle.style.animationDelay = Math.random() * 5 + 's';

  techContainer.appendChild(particle);

  // Remove o elemento após a animação para não pesar a memória
  setTimeout(() => {
    particle.remove();
  }, 15000);
}

// Cria partículas iniciais
for (let i = 0; i < 20; i++) {
  createParticle();
}

// Mantém criando novas partículas continuamente
setInterval(createParticle, 300);
