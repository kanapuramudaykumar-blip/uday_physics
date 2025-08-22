// Slider functionality
let currentSlideIndex = 0;
const totalSlides = 5;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider if it exists
    if (document.getElementById('sliderWrapper')) {
        initializeSlider();
    }

    // About page tabs functionality
    const aboutTabs = document.querySelectorAll('#aboutTabs .nav-link');
    const aboutSections = document.querySelectorAll('.about-section');

    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            aboutTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all sections
            aboutSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 58, 138, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });
});

function initializeSlider() {
    startAutoSlide();
    
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Touch support for mobile
    let startX = 0;
    let endX = 0;
    
    sliderContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    });
}

function showSlide(index) {
    const slider = document.getElementById('sliderWrapper');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    
    const translateX = -currentSlideIndex * 100;
    slider.style.transform = `translateX(${translateX}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function previousSlide() {
    showSlide(currentSlideIndex - 1);
}

function currentSlide(index) {
    showSlide(index - 1);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}