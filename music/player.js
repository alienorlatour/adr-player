const playlist = {
    "songs": [
        {
            "track": "music/01rouge/frank1.mp3",
            "title": "Brahms - Sonate n° 3 op 5 en fa mineur",
            // "colour": "#EF1925",
            // "cover": "logo-rouge.png"
        },
        {
            "track": "music/01rouge/frank2.mp3",
            "title": "Brahms - Allegro maestoso, Andante, Scherzo, Intermezzo, Finale.",
            // "colour": "#EF1925",
            // "cover": "music/01rouge/cover.png"
        },
        {
            "track": "music/01rouge/frank3.mp3",
            "title": "Brahms - Von Ewiger Liebe, opus 43 n°1",
            // "colour": "#EF1925",
            // "cover": "music/01rouge/cover.png"
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
    const audio = document.getElementById("audioPlayer");
    const currentlyPlaying = document.querySelector(".listen .currently-playing")

    // Toggle play/pause functionality and button visibility
    let isPlaying = false;

    // Function to change the song and update the dot
    function changeSong(songIndex) {
        if (songIndex > playlist.songs.length) {
            songIndex = 0
        }

        let song = playlist.songs[songIndex]

        changeAudioSource(song.track)
        currentlyPlaying.innerHTML = song.title
        // listenContainer.style.background = "linear-gradient(60deg, " + song.colour + " 75%, #000)"

    }

    function next() {
        let randomIndex = Math.floor(Math.random() * playlist.songs.length);
        changeSong(randomIndex)
    }

    // Event listener for next button
    nextButton.addEventListener("click", () => {
        next();
    });

    function togglePlayPause() {
        isPlaying = !isPlaying;

        // Toggle button visibility
        listenContainer.classList.toggle("playing")
        listenContainer.classList.toggle("paused")

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

    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);

    // start on first interaction
    document.addEventListener('click', playOnce);
    document.addEventListener('keydown', playOnce);
    document.addEventListener('touchstart', playOnce);
    window.addEventListener('focus', playOnce);

    function playOnce() {
        next();
        audio.play().then(() => {
            document.removeEventListener('click', playOnce);
            document.removeEventListener('keydown', playOnce);
            document.removeEventListener('touchstart', playOnce);
            window.removeEventListener('focus', playOnce);
            listenContainer.classList.toggle("playing");
            listenContainer.classList.toggle("paused");
            isPlaying = true
        }).catch(error => {});
    }
});
