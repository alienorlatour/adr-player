document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const playButton = document.querySelector(".play-button");
    const pauseButton = document.querySelector(".pause-button");
    const audio = document.getElementById("audioPlayer");

    // Toggle play/pause functionality and button visibility
    let isPlaying = false;

    // Simulated playlist and song index
    const playlists = [
        {
            cover: "brahms/cover.jpg",
            songs: ["brahms/frank1.mp3", "brahms/frank2.mp3", "brahms/frank3.mp3"],
            background: "#c80000",
        },
        {
            cover: "podcast/cover.jpg",
            songs: ["podcast/other.mp3", "podcast/other2.mp3", "podcast/other3.mp3"],
            background: "#000"
        },
        {
            cover: "other/cover.jpg",
            songs: ["other/lento.mp3"],
            background: "#000"
        }
    ];
    let numSlides = document.querySelectorAll(".carousel-slide").length
    if (numSlides !== playlists.length) {
        console.error("num slides =", numSlides, "playlist is ", playlists.length)
    }

    let currentAlbum = -1;
    let currentSongIndex = -1;

    // Function to change the song and update the dot
    function changeSong(album, songIndex) {
        console.log(">>", album, songIndex)

        if (currentAlbum !== album) {
            currentAlbum = album
            replaceDots()
            carousel.style.transform = `translateX(-${currentAlbum * 100}%)`;
        }

        currentSongIndex = songIndex;

        // update displayed dot
        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSongIndex);
        });

        changeAudioSource(playlists[currentAlbum].songs[currentSongIndex])
    }

    function replaceDots() {
        const carouselDots = document.querySelector(".carousel-dots");

        // Clear existing dots
        carouselDots.innerHTML = "";

        let numDots = playlists[currentAlbum].songs.length

        // Add the specified number of dots
        for (let i = 1; i <= numDots; i++) {
            const dot = document.createElement("span");
            dot.className = "dot";
            // Make the first dot active
            if (i === 1) {
                dot.classList.add("active");
            }
            dot.addEventListener("click", () => {
                changeSong(currentAlbum, i-1)
            })
            carouselDots.appendChild(dot);
        }
    }

    // Event listener for previous button
    document.querySelector(".prev-button").addEventListener("click", () => {
        let newSong = (currentSongIndex - 1 + playlists[currentAlbum].songs.length) % playlists[currentAlbum].songs.length;
        changeSong(currentAlbum, newSong);
    });

    // Event listener for next button
    document.querySelector(".next-button").addEventListener("click", () => {
        let newSong = (currentSongIndex + 1 + playlists[currentAlbum].songs.length) % playlists[currentAlbum].songs.length;
        changeSong(currentAlbum, newSong);
    });

    // Event listener for thumbnail clicks
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            changeSong(index, 0);
        });
    });

    function togglePlayPause() {
        isPlaying = !isPlaying;

        // Toggle button visibility
        playButton.style.display = isPlaying ? "none" : "block";
        pauseButton.style.display = isPlaying ? "block" : "none";

        // You can add code to start/stop audio or video playback here
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    // Change the source of the audio
    function changeAudioSource(newSource) {
        const audio = document.getElementById("audioPlayer");
        audio.src = newSource;
        audio.load(); // Load the new source
        if (isPlaying) {
            audio.play()
        }
    }

    // Initial setup: Show the play button by default
    pauseButton.style.display = "none";
    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);

    // Initialize the carousel
    changeSong(0, 0);

    document.querySelectorAll('.sticker').forEach(function (sticker) {
        sticker.addEventListener('click', function () {
            if (sticker.parentElement) {
                sticker.parentElement.classList.toggle("flipped")
            }
        });
    });

});
