document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const dots = document.querySelectorAll(".dot");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const playButton = document.querySelector(".play-button");
    const pauseButton = document.querySelector(".pause-button");

    let currentIndex = 0;
    let numSlides = document.querySelectorAll(".carousel-slide").length;

    // Simulated playlist and song index
    const playlist = ["Song 1", "Song 2", "Song 3", "Song 4"];
    let currentSongIndex = 0;

    // Function to update the selected dot
    function updateDot() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // Function to change the song and update the dot
    function changeSong(index) {
        currentSongIndex = index;
        updateDot();
        // You can add code here to change the audio or video source and start playing the new song
    }

    // Event listener for previous button
    document.querySelector(".prev-button").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + numSlides) % numSlides;
        changeSong(currentIndex);
    });

    // Event listener for next button
    document.querySelector(".next-button").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % numSlides;
        changeSong(currentIndex);
    });

    // Event listener for thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentIndex = index;
            changeSong(currentIndex);
            console.log(playlist[currentSongIndex])
        });
    });

    // Toggle play/pause functionality and button visibility
    let isPlaying = false;

    function togglePlayPause() {
        isPlaying = !isPlaying;

        // Toggle button visibility
        playButton.style.display = isPlaying ? "none" : "block";
        pauseButton.style.display = isPlaying ? "block" : "none";

        // You can add code to start/stop audio or video playback here
        if (isPlaying) {
            console.log("play", playlist[currentSongIndex])
        } else {
            console.log("pause", playlist[currentSongIndex])
        }
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
