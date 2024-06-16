const playlist = {
    "songs": [
        {
            "track": "music/01rouge/frank1.mp3",
            "title": "Brahms - Un titre très long avec les noms des mouvements et le numéro 259",
            "colour": "#c80000",
            "cover": "logo-rouge.png"
        },
        {
            "track": "music/01rouge/frank2.mp3",
            "title": "Brahms - Un autre titre long avec les noms et le numéro de l'opus 658",
            "colour": "#c80000",
            "cover": "music/01rouge/cover.png"
        },
        {
            "track": "music/01rouge/frank3.mp3",
            "title": "Brahms - Titre un peu long long avec le numéro de l'opus 95",
            "colour": "#c80000",
            "cover": "music/01rouge/cover.png"
        },
        {
            "track": "music/02jaune/lento.mp3",
            "title": "Liszt - La couleur jaune est souvent associée à la lumière et à la joie.",
            "colour": "#ffd100",
            "cover": "music/02jaune/cover.png"
        },
        {
            "track": "music/03violet/other1.mp3",
            "title": "Chopin - Le violet est une couleur associée à la créativité.",
            "colour": "#7f1bce",
            "cover": "music/03violet/cover.png"
        },
        {
            "track": "music/03violet/other2.mp3",
            "title": "Chopin - Petit titre.",
            "colour": "#7f1bce",
            "cover": "music/03violet/cover.png"
        },
        {
            "track": "music/04vert/lento.mp3",
            "title": "Beethoven - Le vert symbolise la nature, la croissance et la tranquillité.",
            "colour": "#70cd1b",
            "cover": "music/04vert/cover.png"
        }
    ]
}

document.addEventListener("DOMContentLoaded", function () {
    // const carousel = document.querySelector(".carousel");
    // const thumbnails = document.querySelectorAll(".thumbnail");

    const playButton = document.querySelector(".listen .play-button");
    const pauseButton = document.querySelector(".listen .pause-button");
    const listenContainer = document.querySelector(".listen")
    const nextButton = document.querySelector(".listen .next-button")
    // const prevButton = document.querySelector(".listen .prev-button")
    const audio = document.getElementById("audioPlayer");
    const currentlyPlaying = document.querySelector(".listen .currently-playing")
    const cover = document.querySelector(".listen .cover img")

    // Toggle play/pause functionality and button visibility
    let isPlaying = true;

    let currentSongIndex = 0;

    // Function to change the song and update the dot
    function changeSong(songIndex) {
        if (songIndex > playlist.songs.length) {
            songIndex = 0
        }

        currentSongIndex = songIndex;
        let song = playlist.songs[currentSongIndex]

        changeAudioSource(song.track)
        currentlyPlaying.innerHTML = song.title
        cover.src = song.cover
    }

    function next() {
        let randomIndex = Math.floor(Math.random() * playlist.songs.length);
        changeSong(randomIndex)
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
    // prevButton.addEventListener("click", () => {
    //     let newSong = (currentSongIndex - 1 + playlists[currentAlbum].songs.length) % playlists[currentAlbum].songs.length;
    //     changeSong(currentAlbum, newSong);
    // });

    // Event listener for next button
    nextButton.addEventListener("click", () => {
        next();
    });

    // Event listener for thumbnail clicks
    // thumbnails.forEach((thumbnail, index) => {
    //     thumbnail.addEventListener("click", () => {
    //         changeSong(index, 0);
    //     });
    // });

    function togglePlayPause() {
        isPlaying = !isPlaying;

        // Toggle button visibility
        listenContainer.classList.toggle("playing")
        listenContainer.classList.toggle("paused")

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
    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);

    // document.querySelectorAll('.carousel-slide').forEach(function (sticker) {
    //     sticker.addEventListener('click', function () {
    //         sticker.classList.toggle("flipped")
    //     });
    // });

    next();
});
