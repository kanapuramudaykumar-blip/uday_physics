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
    initializeAboutTabs();

    // Handle hash navigation on page load
    handleHashNavigation();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(146, 64, 14, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #92400e 0%, #d97706 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
});

function initializeAboutTabs() {
    const aboutTabs = document.querySelectorAll('#aboutTabs .nav-link');
    const aboutSections = document.querySelectorAll('.about-section');

    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target') || this.getAttribute('href').substring(1);
            switchToTab(targetId);
            
            // Update URL hash without triggering hashchange event
            history.pushState(null, null, '#' + targetId);
        });
    });
}

function switchToTab(targetId) {
    const aboutTabs = document.querySelectorAll('#aboutTabs .nav-link');
    const aboutSections = document.querySelectorAll('.about-section');
    
    // Remove active class from all tabs
    aboutTabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to target tab
    const targetTab = document.querySelector(`#aboutTabs .nav-link[data-target="${targetId}"], #aboutTabs .nav-link[href="#${targetId}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Hide all sections
    aboutSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        // Smooth scroll to the section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    
    // Check if we're on the about page and have a valid hash
    if (hash && document.getElementById(hash)) {
        const validHashes = ['about-content', 'views-content', 'awards-content'];
        
        if (validHashes.includes(hash)) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                switchToTab(hash);
            }, 100);
        }
    }
}

function initializeSlider() {
    startAutoSlide();
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
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
}

function showSlide(index) {
    const slider = document.getElementById('sliderWrapper');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider) return;
    
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    
    const translateX = -currentSlideIndex * 100;
    slider.style.transform = `translateX(${translateX}%)`;
    
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
    }
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