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

    function loadContentByIndex(index) {
        const post = posts[index];
        if (post) {
            const file = post.file;
            loadContentFromFile(file);
            window.location.hash = '#' + post.hash;

            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: smooth scrolling animation
            });
            updateButtonVisibility();
        }
    }

    // Function to update visibility of prevButton and nextButton
    function updateButtonVisibility() {
        document.getElementById('prevButton').style.display = currentIndex === 0 ? 'none' : 'inline-block';
        document.getElementById('nextButton').style.display = currentIndex === posts.length - 1 ? 'none' : 'inline-block';
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

    // document.getElementById('prevButton').addEventListener('click', function () {
    //     currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    //     loadContentByIndex(currentIndex);
    // });
    //
    // document.getElementById('nextButton').addEventListener('click', function () {
    //     currentIndex = (currentIndex + 1) % posts.length;
    //     loadContentByIndex(currentIndex);
    // });

    updateButtonVisibility();
});
