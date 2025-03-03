// Enhanced Gallery Carousel with Proper Looping
document.addEventListener('DOMContentLoaded', function() {
  console.log('Gallery script loaded');
  const galleryContainer = document.querySelector('.gallery-container');
  
  if (galleryContainer) {
    console.log('Gallery container found with', galleryContainer.querySelectorAll('.gallery-image').length, 'images');
    // Get all gallery slides
    const slides = galleryContainer.querySelectorAll('.gallery-image');
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Add counter display
    const counter = document.createElement('div');
    counter.className = 'gallery-counter';
    counter.style.position = 'absolute';
    counter.style.bottom = '10px';
    counter.style.right = '10px';
    counter.style.background = 'rgba(0,0,0,0.5)';
    counter.style.color = 'white';
    counter.style.padding = '5px 10px';
    counter.style.borderRadius = '15px';
    counter.style.fontSize = '14px';
    galleryContainer.appendChild(counter);
    
    // Update counter text
    function updateCounter() {
      counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
    }
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = 'none';
      }
    });
    
    // Update counter for initial slide
    updateCounter();
    
    // Create navigation buttons if they don't exist
    let leftBtn = galleryContainer.querySelector('.gallery-prev');
    let rightBtn = galleryContainer.querySelector('.gallery-next');
    
    if (!leftBtn) {
      leftBtn = document.createElement('button');
      leftBtn.className = 'gallery-prev';
      leftBtn.innerHTML = '';
      galleryContainer.appendChild(leftBtn);
    }
    
    if (!rightBtn) {
      rightBtn = document.createElement('button');
      rightBtn.className = 'gallery-next';
      rightBtn.innerHTML = '';
      galleryContainer.appendChild(rightBtn);
    }
    
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
      });
      
      // Show the current slide
      slides[index].style.display = 'block';
      slides[index].classList.add('active');
      
      // Update current index
      currentIndex = index;
      
      // Update counter
      updateCounter();
    }
    
    // Event listeners for navigation buttons
    leftBtn.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(newIndex);
    });
    
    rightBtn.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % totalSlides;
      showSlide(newIndex);
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    galleryContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        const newIndex = (currentIndex + 1) % totalSlides;
        showSlide(newIndex);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(newIndex);
      }
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
      const newIndex = (currentIndex + 1) % totalSlides;
      showSlide(newIndex);
    }, 5000);
    
    // Pause auto-advance when hovering over gallery
    galleryContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume auto-advance when mouse leaves gallery
    galleryContainer.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        const newIndex = (currentIndex + 1) % totalSlides;
        showSlide(newIndex);
      }, 5000);
    });
  }
}); 