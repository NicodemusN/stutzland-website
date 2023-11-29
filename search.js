document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const links = document.querySelectorAll('.sidebar ul li a');

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    links.forEach(link => {
      const linkText = link.textContent.toLowerCase();
      const isVisible = linkText.includes(searchTerm);

      link.style.display = isVisible ? 'block' : 'none';
    });
  });
});