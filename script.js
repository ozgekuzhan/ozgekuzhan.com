document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Image Modal/Lightbox functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let currentImages = [];
    let currentIndex = 0;

    // Get all project image containers
    const projectImageContainers = document.querySelectorAll('.project-images');

    projectImageContainers.forEach(container => {
        const images = container.querySelectorAll('img');

        images.forEach((img, index) => {
            img.addEventListener('click', function() {
                // Store all images in this gallery
                currentImages = Array.from(images);
                currentIndex = index;

                // Show modal
                showImage(this.src, this.alt);
            });
        });
    });

    function showImage(src, alt) {
        modal.classList.add('active');
        modalImg.src = src;
        modalCaption.textContent = alt || '';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            const img = currentImages[currentIndex];
            modalImg.src = img.src;
            modalCaption.textContent = img.alt || '';
        }
    }

    function showNextImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            const img = currentImages[currentIndex];
            modalImg.src = img.src;
            modalCaption.textContent = img.alt || '';
        }
    }

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Click outside image to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project images scroll arrows
    const projectImageContainers2 = document.querySelectorAll('.project-images:not(.no-arrows)');

    projectImageContainers2.forEach(container => {
        // Create scroll arrows
        const leftArrow = document.createElement('button');
        leftArrow.className = 'scroll-arrow left';
        leftArrow.innerHTML = '&#10094;';
        leftArrow.setAttribute('aria-label', 'Scroll left');

        const rightArrow = document.createElement('button');
        rightArrow.className = 'scroll-arrow right';
        rightArrow.innerHTML = '&#10095;';
        rightArrow.setAttribute('aria-label', 'Scroll right');

        container.appendChild(leftArrow);
        container.appendChild(rightArrow);

        // Update arrow states
        function updateArrows() {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            leftArrow.disabled = scrollLeft <= 0;
            rightArrow.disabled = scrollLeft >= maxScroll - 1;
        }

        // Scroll functionality
        leftArrow.addEventListener('click', function() {
            container.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', function() {
            container.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });

        container.addEventListener('scroll', updateArrows);
        updateArrows();
    });
});
