function bars() {
    const bars = document.querySelectorAll('.cdtheque .bar');
    const mainImage = document.getElementById('main-image');
    const imageText = document.getElementById('image-text');

    bars.forEach(bar => {
        bar.addEventListener('click', () => {
            const newImage = bar.getAttribute('data-image');
            const textId = bar.getAttribute('data-text-id');
            const newText = document.getElementById(textId).innerHTML;

            mainImage.src = newImage;
            imageText.innerHTML = newText;

            document.querySelector("#image-text h4").style.color = bar.style.backgroundColor
        });
    });

    bars[0].click()
}

document.addEventListener('DOMContentLoaded', function () {
    const posts = Array.from(document.querySelectorAll('.nav-links a')).map(link => ({
        hash: link.getAttribute('href').substring(1),
        file: link.getAttribute('data-file')
    }));

    let currentIndex = 0;

    // Function to load content from an external file
    function loadContentFromFile(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                document.querySelector('.content-text').innerHTML = html;
                return 0
            }).then(n => {
                bars();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.querySelector('.content-text').innerHTML = "<p>Cette page n'est actuellement pas disponible.</p>";
            });
    }

    // Function to load the content based on the hash
    function loadContentFromHash() {
        const hash = window.location.hash.substring(1); // Remove the '#' from the hash
        const file = document.querySelector(`a[href="#${hash}"]`)?.getAttribute('data-file');
        if (file) {
            loadContentFromFile(file);
        }
    }

    // Load the content on initial page load
    loadContentFromHash();

    // Get all the anchor links
    const links = document.querySelectorAll('.nav-links a, .listen a');

    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Update the URL hash
            window.location.hash = this.getAttribute('href');

            // Load the content based on the new hash
            loadContentFromHash();
        });
    });

    // Listen for hash changes (e.g., when navigating back/forward)
    window.addEventListener('hashchange', loadContentFromHash);
});


// JavaScript to fill the span with dots up to 72 characters
document.addEventListener("DOMContentLoaded", function () {
    // Select all span elements with the class "fill"
    const fillSpans = document.querySelectorAll(".fill:first-child");

    // Define the maximum width in pixels
    const maxWidth = fillSpans[0].offsetWidth - 10; // Change this value to your desired width

    // Loop through each span element
    fillSpans.forEach(fillSpan => {
        let innerSpan = fillSpan.querySelector("span")
        let textContent = innerSpan.textContent;
        let currentWidth = innerSpan.offsetWidth

        textContent += " "

        // Add dots until the width reaches the maximum width
        while (currentWidth < maxWidth) {
            textContent += ".";
            innerSpan.innerText = textContent
            currentWidth = innerSpan.offsetWidth;
        }

        // Update the span content
        fillSpan.textContent = textContent;
    });
});