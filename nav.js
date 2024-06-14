document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const thumbnails = document.querySelectorAll(".thumbnail");

    const playButton = document.querySelector(".play-button");
    const pauseButton = document.querySelector(".pause-button");
    const nextButton = document.querySelector(".next-button")
    const prevButton = document.querySelector(".prev-button")

    const audio = document.getElementById("audioPlayer");
    const currentlyPlaying = document.querySelector(".currently-playing")

    // Toggle play/pause functionality and button visibility
    let isPlaying = false;

    // Simulated playlist and song index
    const playlists = [
        {
            cover: "music/01rouge/cover.png",
            songs: [
                {
                    track: "music/01rouge/frank1.mp3",
                    title: "Brahms - Un titre très long avec les noms des mouvements et le numéro 259"
                },
                {
                    track: "music/01rouge/frank2.mp3",
                    title: "Brahms - Un autre titre long avec les noms et le numéro de l'opus 658"
                },
                {track: "music/01rouge/frank3.mp3", title: "Brahms - Titre un peu long long avec le numéro de l'opus 95"}
            ],
            background: "#c80000",
        },
        {
            cover: "music/02jaune/cover.png",
            songs: [
                {
                    track: "music/02jaune/lento.mp3",
                    title: "Liszt - La couleur jaune est souvent associée à la lumière et à la joie."
                }
            ],
            background: "#ffd100"
        },
        {
            cover: "music/03violet/cover.png",
            songs: [
                {
                    track: "music/03violet/other1.mp3",
                    title: "Chopin - Le violet est une couleur associée à la créativité."
                },
                {
                    track: "music/03violet/other2.mp3",
                    title: "Chopin - Petit titre."
                }
            ],
            background: "#7f1bce"
        },
        {
            cover: "music/04vert/cover.png",
            songs: [
                {
                    track: "music/04vert/lento.mp3",
                    title: "Beethoven - Le vert symbolise la nature, la croissance et la tranquillité."
                }
            ],
            background: "#70cd1b"
        }
    ];

    let numSlides = document.querySelectorAll(".carousel-slide").length
    if (numSlides !== playlists.length) {
        console.error("num slides =", numSlides, "playlist is ", playlists.length)
    }

    let currentAlbum = 0;
    let currentSongIndex = 0;

    // Function to change the song and update the dot
    function changeSong(album, songIndex) {
        if (currentAlbum !== album) {
            currentAlbum = album
            // replacePlaylist()
            carousel.style.transform = `translateX(-${currentAlbum * 100}%)`;
        }

        // Toggle button visibility
        nextButton.style.opacity = songIndex + 1 === playlists[currentAlbum].songs.length ? "0" : "1";
        prevButton.style.opacity = songIndex === 0 ? "0" : "1";

        currentSongIndex = songIndex;

        // update displayed dot
        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSongIndex);
        });

        changeAudioSource(playlists[currentAlbum].songs[currentSongIndex].track)
        currentlyPlaying.innerHTML = playlists[currentAlbum].songs[currentSongIndex].title
    }

    // function replacePlaylist() {
    //     const carouselDots = document.querySelector(".playlist");
    //
    //     // Clear existing dots
    //     carouselDots.innerHTML = "";
    //
    //     let numDots = playlists[currentAlbum].songs.length
    //
    //     // Add the specified number of dots
    //     for (let i = 0; i < numDots; i++) {
    //         const dot = document.createElement("li");
    //         dot.className = "dot";
    //         // Make the first dot active
    //         if (i === 0) {
    //             dot.classList.add("active");
    //         }
    //         dot.innerHTML = playlists[currentAlbum].songs[i].title
    //         dot.addEventListener("click", () => {
    //             changeSong(currentAlbum, i)
    //         })
    //         carouselDots.appendChild(dot);
    //     }
    //
    // }

    // Event listener for previous button
    prevButton.addEventListener("click", () => {
        let newSong = (currentSongIndex - 1 + playlists[currentAlbum].songs.length) % playlists[currentAlbum].songs.length;
        changeSong(currentAlbum, newSong);
    });

    // Event listener for next button
    nextButton.addEventListener("click", () => {
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

    document.querySelectorAll('.carousel-slide').forEach(function (sticker) {
        sticker.addEventListener('click', function () {
            sticker.classList.toggle("flipped")
        });
    });

});
