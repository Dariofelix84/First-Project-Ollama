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

// Função para exibir Toast Notification (Aviso Bonito)
function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;

  const icon = document.createElement('i');
  icon.className = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';

  const text = document.createElement('span');
  text.innerText = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerText;
  btn.innerText = 'Enviando...';
  btn.disabled = true;

  const formData = new FormData(form);

  // Captura o nome do remetente para usar no assunto do e-mail
  const senderName = formData.get('name') || 'Visitante';
  const senderEmail = formData.get('email') || '';
  const userSubject = formData.get('subject') || 'Contato via Site';

  // Monta o objeto de dados com campos renomeados para o corpo do e-mail
  const data = {
    '👤 Nome': formData.get('name'),
    '📧 E-mail': formData.get('email'),
    '💬 Mensagem': formData.get('message'),
    // Campos de controle do FormSubmit
    '_subject': `DFelixTech — ${userSubject} (de ${senderName})`,
    '_replyto': senderEmail,
    '_template': 'box',
    '_captcha': 'false'
  };

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
      showToast('Mensagem enviada com sucesso! Importante: Verifique a caixa de entrada para confirmar o primeiro envio.', 'success');
      form.reset();
    })
    .catch(error => {
      showToast('Erro ao enviar a mensagem. Tente novamente mais tarde.', 'error');
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
