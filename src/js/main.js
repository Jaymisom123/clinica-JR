/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navOverlay = document.getElementById('nav-overlay')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
        if(navOverlay) navOverlay.classList.add('show-overlay')
        document.body.style.overflow = 'hidden'
    })
}

/*===== MENU HIDDEN =====*/
function closeMenu() {
    navMenu.classList.remove('show-menu')
    if(navOverlay) navOverlay.classList.remove('show-overlay')
    document.body.style.overflow = 'auto'
}

/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', closeMenu)
}

/*===== CLOSE MENU ON OVERLAY CLICK =====*/
if(navOverlay){
    navOverlay.addEventListener('click', closeMenu)
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    // When we click on each nav__link, we close the menu
    closeMenu()
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SERVICES TABS ====================*/
const tabButtons = document.querySelectorAll('.tab-btn');
const serviceTabs = document.querySelectorAll('.service-tab');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        serviceTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked button and corresponding tab
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== SCROLL TO TOP ====================*/
const scrollTopButton = document.getElementById('scroll-top')
if(scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObj = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual API call)
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        this.reset();
    });
}

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .notification__close:hover {
            background-color: rgba(255,255,255,0.2);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat, .feature, .doctor-card, .contact__item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .stat, .feature, .doctor-card, .contact__item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .stat.animate, .feature.animate, .doctor-card.animate, .contact__item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat:nth-child(1) { transition-delay: 0.1s; }
        .stat:nth-child(2) { transition-delay: 0.2s; }
        .stat:nth-child(3) { transition-delay: 0.3s; }
        
        .feature:nth-child(1) { transition-delay: 0.1s; }
        .feature:nth-child(2) { transition-delay: 0.2s; }
        .feature:nth-child(3) { transition-delay: 0.3s; }
        
        .doctor-card:nth-child(1) { transition-delay: 0.1s; }
        .doctor-card:nth-child(2) { transition-delay: 0.2s; }
        .doctor-card:nth-child(3) { transition-delay: 0.3s; }
        .doctor-card:nth-child(4) { transition-delay: 0.4s; }
        
        .contact__item:nth-child(1) { transition-delay: 0.1s; }
        .contact__item:nth-child(2) { transition-delay: 0.2s; }
        .contact__item:nth-child(3) { transition-delay: 0.3s; }
        .contact__item:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(animationStyle);
});

/*==================== WHATSAPP INTEGRATION ====================*/
function openWhatsApp(message = '') {
    const phoneNumber = '5594991518569'; // WhatsApp da Clínica JR
    const defaultMessage = message || 'Olá! Gostaria de agendar uma consulta na Clínica JR.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
}

// Add WhatsApp button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create floating WhatsApp button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = '#';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
    
    // Add WhatsApp button styles
    const whatsappStyle = document.createElement('style');
    whatsappStyle.textContent = `
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 6rem;
            right: 1rem;
            background-color: #25d366;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 2rem;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }
        
        @media screen and (max-width: 768px) {
            .whatsapp-float {
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
                bottom: 5rem;
            }
        }
    `;
    document.head.appendChild(whatsappStyle);
    document.body.appendChild(whatsappBtn);
});

/*==================== LOADING SCREEN ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader__content">
            <div class="loader__logo">
                <i class="fas fa-heartbeat"></i>
                <h3>Clínica JR</h3>
            </div>
            <div class="loader__spinner"></div>
        </div>
    `;
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f8f9fa 0%, #ede7d5 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader__content {
            text-align: center;
        }
        
        .loader__logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .loader__logo i {
            font-size: 3rem;
            color: #b7cc18;
            animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .loader__logo h3 {
            font-size: 2rem;
            color: #545454;
            font-family: 'Poppins', sans-serif;
        }
        
        .loader__spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #8cbfaf;
            border-top: 4px solid #b7cc18;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes heartbeat {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader.hidden {
            opacity: 0;
            pointer-events: none;
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
});

/*==================== SCROLL REVEAL ANIMATIONS ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

// Apply scroll reveal to different sections
sr.reveal('.hero__title, .section__title', {});
sr.reveal('.hero__description, .section__description', {delay: 200});
sr.reveal('.hero__buttons', {delay: 400});
sr.reveal('.hero__image', {origin: 'right', delay: 600});

sr.reveal('.about__image', {origin: 'left'});
sr.reveal('.about__content', {origin: 'right', delay: 200});

sr.reveal('.services__tabs', {interval: 100});
sr.reveal('.service__info', {delay: 300});

sr.reveal('.doctor-card', {interval: 200});

sr.reveal('.contact__info', {origin: 'left'});
sr.reveal('.contact__form', {origin: 'right', delay: 200});

/*==================== STATISTICS COUNTER ====================*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            const targetText = statElement.textContent;
            const targetNumber = parseInt(targetText.replace(/\D/g, ''));
            
            if (targetNumber && !statElement.classList.contains('animated')) {
                statElement.classList.add('animated');
                animateCounter(statElement, targetNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

/*==================== KEYBOARD NAVIGATION ====================*/
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    
    const skipLinkStyle = document.createElement('style');
    skipLinkStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #545454;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        }
        
        .skip-link:focus {
            top: 6px;
        }
    `;
    
    document.head.appendChild(skipLinkStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add focus indicators for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .btn:focus,
        .nav__link:focus,
        .tab-btn:focus,
        .form__input:focus {
            outline: 2px solid #b7cc18;
            outline-offset: 2px;
        }
    `;
    
    document.head.appendChild(focusStyle);
});

console.log('Clínica JR - Site carregado com sucesso! 🏥'); 