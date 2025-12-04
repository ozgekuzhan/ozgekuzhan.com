document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Image Modal/Lightbox functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let currentImages = [];
    let currentIndex = 0;

    const projectImageContainers = document.querySelectorAll('.project-images');

    projectImageContainers.forEach(container => {
        const images = container.querySelectorAll('img');

        if (images.length >= 2) {
            const slideContainer = document.createElement('div');
            slideContainer.className = 'slide-container';

            images.forEach(img => {
                slideContainer.appendChild(img.cloneNode(true));
            });

            container.innerHTML = '';
            container.appendChild(slideContainer);

            let currentSlide = 0;
            const totalSlides = images.length;

            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 3000);

            const slideImages = slideContainer.querySelectorAll('img');
            slideImages.forEach((img, index) => {
                img.addEventListener('click', function() {
                    currentImages = Array.from(slideImages);
                    currentIndex = index;
                    showImage(this.src, this.alt);
                });
            });
        } else {
            images.forEach((img, index) => {
                img.addEventListener('click', function() {
                    currentImages = Array.from(images);
                    currentIndex = index;
                    showImage(this.src, this.alt);
                });
            });
        }
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
});
