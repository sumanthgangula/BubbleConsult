/* ============================================================
   BUBBLE CONSULT - JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============ MOBILE NAVIGATION TOGGLE ============
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const navLinkItems = document.querySelectorAll('.nav-link');
        navLinkItems.forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (link.classList.contains('dropdown-toggle')) {
                    return; // Don't close mobile menu when opening dropdown
                }
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when a dropdown menu link is clicked
        const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownMenuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (pagesDropdownMenu) {
                    pagesDropdownMenu.classList.remove('show');
                    navDropdown.classList.remove('active');
                }
            });
        });
    }

    // ============ PAGES DROPDOWN ============
    const pagesDropdownToggle = document.getElementById('pages-dropdown-toggle');
    const pagesDropdownMenu = document.getElementById('pages-dropdown-menu');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (pagesDropdownToggle && pagesDropdownMenu) {
        pagesDropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            pagesDropdownMenu.classList.toggle('show');
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (navDropdown && !navDropdown.contains(e.target)) {
                pagesDropdownMenu.classList.remove('show');
                navDropdown.classList.remove('active');
            }
        });
    }

    // ============ COUNTRY SELECTOR ============
    const countryTrigger = document.getElementById('country-trigger');
    const countryList = document.getElementById('country-list');
    const selectedFlag = document.getElementById('selected-flag');
    const selectedCode = document.getElementById('selected-code');

    if (countryTrigger && countryList) {
        countryTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            countryList.classList.toggle('show');
        });

        document.addEventListener('click', function () {
            countryList.classList.remove('show');
        });

        const countryItems = countryList.querySelectorAll('.country-item');
        countryItems.forEach(function (item) {
            item.addEventListener('click', function () {
                var code = this.getAttribute('data-code');
                var flag = this.getAttribute('data-flag');

                selectedFlag.src = 'https://flagcdn.com/w40/' + flag + '.png';
                selectedFlag.alt = this.querySelector('img').alt;
                selectedCode.textContent = code;
                countryList.classList.remove('show');
            });
        });
    }

    // ============ NAVBAR SCROLL EFFECT ============
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============ TESTIMONIAL CAROUSEL ============
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;
    let autoSlideInterval;
    const AUTO_SLIDE_DELAY = 5000; // 5 seconds

    function showSlide(index) {
        // Wrap around
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Remove active from all slides
        slides.forEach(function (slide) {
            slide.classList.remove('active');
        });

        // Set active slide
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-rotate testimonials every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners for carousel controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Start auto-slide
    startAutoSlide();

    // ============ CONTACT FORM VALIDATION ============
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Validate fields
            var isValid = true;

            var phone = document.getElementById('phone');
            var email = document.getElementById('email');
            var message = document.getElementById('message');

            // Phone validation
            if (!phone.value.trim()) {
                showError(phone, 'phone-error', 'Phone number is required');
                isValid = false;
            } else if (phone.value.trim().length < 6) {
                showError(phone, 'phone-error', 'Please enter a valid phone number');
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, 'email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'email-error', 'Please enter a valid email address');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, 'message-error', 'Message is required');
                isValid = false;
            }

            // If valid, show success message
            if (isValid) {
                alert('Your details have been submitted');
                contactForm.style.display = 'none';
                successMessage.classList.add('show');

                // Reset form after showing success
                contactForm.reset();

                // Optionally hide success and show form again after 5 seconds
                setTimeout(function () {
                    contactForm.style.display = 'block';
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });

        // Real-time validation on input
        var formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(function (input) {
            input.addEventListener('input', function () {
                this.classList.remove('error');
                var errorEl = document.getElementById(this.id + '-error');
                if (errorEl) {
                    errorEl.textContent = '';
                }
            });
        });
    }

    function showError(inputEl, errorId, message) {
        inputEl.classList.add('error');
        var errorEl = document.getElementById(errorId);
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    function clearErrors() {
        var errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(function (el) {
            el.classList.remove('error');
        });
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (el) {
            el.textContent = '';
        });
    }

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============ SCROLL ANIMATIONS ============
    // Add animation class to elements
    var animateElements = document.querySelectorAll(
        '.about-content, .about-image, .service-card, .contact-form-wrapper, .contact-image, .team-card, .blog-card'
    );

    animateElements.forEach(function (el) {
        el.classList.add('animate-on-scroll');
    });

    function checkVisibility() {
        var windowHeight = window.innerHeight;
        animateElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    // Run on load and scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var headerHeight = navbar.offsetHeight;
                var targetPosition = targetEl.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ FOOTER SUBSCRIBE ============
    var subscribeBtn = document.getElementById('subscribe-btn');
    var footerEmail = document.getElementById('footer-email');

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function () {
            var emailValue = footerEmail.value.trim();
            if (emailValue && isValidEmail(emailValue)) {
                alert('You have subscribed');
                footerEmail.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

});
