document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

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
            slideContainer.appendChild(images[0].cloneNode(true));

            container.innerHTML = '';
            container.appendChild(slideContainer);

            let currentSlide = 0;
            const totalSlides = images.length;

            const slideInterval = setInterval(() => {
                currentSlide++;
                slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

                if (currentSlide === totalSlides) {
                    setTimeout(() => {
                        slideContainer.style.transition = 'none';
                        currentSlide = 0;
                        slideContainer.style.transform = `translateX(0)`;
                        setTimeout(() => {
                            slideContainer.style.transition = 'transform 0.6s ease-in-out';
                        }, 50);
                    }, 600);
                }
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

    closeBtn.addEventListener('click', closeModal);

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

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
