// sidebarhighlight.js

document.addEventListener('DOMContentLoaded', function() {
  // Get the current page URL
  var currentPage = window.location.href;

  // Select all sidebar links
  var sidebarLinks = document.querySelectorAll('.sidebar a');

  // Loop through each link and check if its href matches the current page
  sidebarLinks.forEach(function(link) {
    if (link.href === currentPage) {
      link.parentElement.classList.add('active');
    }
  });
});