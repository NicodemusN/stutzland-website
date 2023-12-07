// Get references to all toggle buttons
const toggleButtons = document.querySelectorAll('.toggleButton');

// Add click event listener to each button
toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the target ID from the data-target attribute
        const targetId = this.getAttribute('data-target');
        const hiddenContent = document.getElementById(targetId);

        // Toggle the visibility of the corresponding content
        if (hiddenContent.style.display === 'none') {
            hiddenContent.style.display = 'block';
        } else {
            hiddenContent.style.display = 'none';
        }
    });
});