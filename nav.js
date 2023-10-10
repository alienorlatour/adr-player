document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const dots = document.querySelectorAll(".dot");
    const thumbnails = document.querySelectorAll(".thumbnail");

    let currentIndex = 0;
    let numSlides = document.querySelectorAll(".carousel-slide").length;

    // Toggle play/pause functionality and button visibility
    const playButton = document.querySelector(".play-button");
    const pauseButton = document.querySelector(".pause-button");

    let isPlaying = false;

    function togglePlayPause() {
        isPlaying = !isPlaying;

        // Toggle button visibility
        playButton.style.display = isPlaying ? "none" : "block";
        pauseButton.style.display = isPlaying ? "block" : "none";

        // Add any additional functionality for play/pause here
    }

    // Initial setup: Show the play button by default
    pauseButton.style.display = "none";
    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);

    // Function to update the carousel display
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Update the active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // Function to navigate to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % numSlides;
        updateCarousel();
    }

    // Function to navigate to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + numSlides) % numSlides;
        updateCarousel();
    }

    // Event listeners for previous and next buttons
    prevButton.addEventListener("click", prevSong);
    nextButton.addEventListener("click", nextSong);

    // Event listener for thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Initialize the carousel
    updateCarousel();
});
