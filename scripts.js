        // Инициализация AOS
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                once: true,
                easing: 'ease-in-out'
            });

            // Header scroll effect
            const header = document.querySelector('header');
            if (header) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }

            // Tab switching functionality
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            if (tabBtns.length && tabContents.length) {
                tabBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove active class from all buttons and contents
                        tabBtns.forEach(btn => btn.classList.remove('active'));
                        tabContents.forEach(content => content.classList.remove('active'));
                        
                        // Add active class to clicked button and corresponding content
                        btn.classList.add('active');
                        const tabId = btn.getAttribute('data-tab');
                        if (tabId) {
                            const targetTab = document.getElementById(tabId);
                            if (targetTab) targetTab.classList.add('active');
                        }
                    });
                });
            }

            // Animated counter
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            function animateCounters() {
                let allComplete = true;
                
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        allComplete = false;
                    } else {
                        counter.innerText = target;
                    }
                });
                
                if (!allComplete) {
                    requestAnimationFrame(animateCounters);
                }
            }

            function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

            
            
            // Start counters when stats section is in view
        // Start animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue('students-count', 0, 1200, 2000);
                    animateValue('teachers-count', 0, 45, 1500);
                    animateValue('classes-count', 0, 30, 1800);
                    animateValue('subjects-count', 0, 15, 1200);
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        observer.observe(statsSection);

            // Video player functionality
            const videoContainer = document.querySelector('.video-container');
            const video = document.querySelector('video');
            const videoOverlay = document.querySelector('.video-overlay');
            
            if (videoContainer && video && videoOverlay) {
                videoOverlay.addEventListener('click', function() {
                    video.play()
                        .then(() => {
                            videoOverlay.style.display = 'none';
                            video.setAttribute('controls', 'true');
                        })
                        .catch(error => {
                            console.error('Video playback failed:', error);
                        });
                });
                
                video.addEventListener('ended', function() {
                    videoOverlay.style.display = 'flex';
                    video.removeAttribute('controls');
                });
            }
            
            // Testimonial slider
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            
            if (testimonials.length && dots.length) {
                let currentSlide = 0;
                
                function showSlide(n) {
                    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                    dots.forEach(dot => dot.classList.remove('active'));
                    
                    currentSlide = (n + testimonials.length) % testimonials.length;
                    testimonials[currentSlide].classList.add('active');
                    dots[currentSlide].classList.add('active');
                }
                
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        showSlide(index);
                    });
                });
                
                // Auto slide change
                let slideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
                
                // Pause on hover
                const sliderContainer = document.querySelector('.testimonials-container');
                if (sliderContainer) {
                    sliderContainer.addEventListener('mouseenter', () => {
                        clearInterval(slideInterval);
                    });
                    
                    sliderContainer.addEventListener('mouseleave', () => {
                        slideInterval = setInterval(() => {
                            showSlide(currentSlide + 1);
                        }, 5000);
                    });
                }
            }
            
            // Timeline animation on scroll
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            if (timelineItems.length) {
                function checkTimelineItems() {
                    timelineItems.forEach(item => {
                        const itemTop = item.getBoundingClientRect().top;
                        if (itemTop < window.innerHeight - 100) {
                            item.classList.add('visible');
                        }
                    });
                }
                
                window.addEventListener('scroll', checkTimelineItems);
                checkTimelineItems(); // Check on load
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            document.getElementById("feedbackBtn").onclick = function() {
                document.getElementById("feedbackModal").style.display = "block";
              };
              document.getElementById("closeFeedback").onclick = function() {
                document.getElementById("feedbackModal").style.display = "none";
              };
              document.getElementById("feedbackForm").onsubmit = function(e) {
                e.preventDefault();
                alert("Спасибо за ваше сообщение! Мы свяжемся с вами.");
                document.getElementById("feedbackModal").style.display = "none";
                this.reset();
              };
        });