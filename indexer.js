// indexer.js
document.addEventListener('DOMContentLoaded', function () {
  const pageLinks = document.querySelector('ul');

  // Add links to all HTML files in the repository
  const htmlFiles = ['page1.html', 'page2.html']; // Add more as needed
  htmlFiles.forEach(file => {
    const link = document.createElement('li');
    link.innerHTML = `<a href="${file}">${file}</a>`;
    pageLinks.appendChild(link);
  });
});
