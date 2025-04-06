// movimiento del texto
document.addEventListener("DOMContentLoaded", function () {
    const slideElements = document.querySelectorAll(".slide-in");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.3 // Más sensible para mobile
      }
    );
  
    slideElements.forEach((el) => observer.observe(el));
  });
  
// DARK MODE
window.onload = () => {
    const body = document.body;
    const themeButton = document.getElementById("theme-toggle");
    const icon = document.getElementById("icon");
    
    let savedTheme = localStorage.getItem("lightMode");

    // Si no hay tema guardado en localStorage, Dark Mode es el predeterminado
    if (savedTheme === null) {
        localStorage.setItem("lightMode", "false"); // Guardar Dark Mode por defecto
        savedTheme = "false";
    }

    // Aplicar el tema guardado
    if (savedTheme === "true") {
        body.classList.add("light-mode");
        themeButton.innerHTML = '<i id="icon" class="fas fa-moon"></i> Dark';
    } else {
        themeButton.innerHTML = '<i id="icon" class="fas fa-sun"></i> Light';
    }
};

// Evento para cambiar el modo al hacer clic
document.getElementById("theme-toggle").addEventListener("click", () => {
    const body = document.body;
    const themeButton = document.getElementById("theme-toggle");

    // Alternar el modo de la página
    const isLightMode = body.classList.toggle("light-mode");

    // Guardar la preferencia en localStorage
    localStorage.setItem("lightMode", isLightMode);

    // Cambiar el contenido del botón (ícono y texto)
    themeButton.innerHTML = isLightMode
        ? '<i id="icon" class="fas fa-moon"></i> Dark'
        : '<i id="icon" class="fas fa-sun"></i> Light';

    logo.src = isLightMode
        ? "Assets/logo_nav_light.svg" // Logo para modo claro
        : "Assets/logo_nav.svg"; // Logo para modo oscuro   
    
    metod.src = isLightMode
        ? "Assets/metodologia_light.webp" // imagen para modo claro
        : "Assets/metodologia.webp"; // imagen para modo oscuro            

    // Regenerar las partículas con los nuevos colores del modo
    particles.length = 0;
    createParticles();
});

// ANIMACION
function createParticleAnimation(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // Ajustar el canvas al tamaño del contenedor
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configurar partículas
    const particles = [];
    const numParticles = 100;

    // Colores de las partículas
    const particleColors = ["#ff0080", "#ff8c00", "#6a0dad"]; // Fucsia, Naranja, Lila

    // Crear partículas
    function createParticles() {
        particles.length = 0; // Limpiar array de partículas
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1
            });
        }
    }

    // Dibujar partículas
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particles) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();

            // Movimiento
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rebote en bordes del canvas
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        }
        requestAnimationFrame(drawParticles);
    }

    // Iniciar animación
    createParticles();
    drawParticles();
}

// Llamar función
createParticleAnimation("animationCanvas"); 

