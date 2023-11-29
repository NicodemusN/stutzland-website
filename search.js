document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (query.length > 0) {
      fetchPages(query);
    }
  });

  async function fetchPages(query) {
    try {
      // Fetch dynamically generated pages.json
      const response = await fetch("pages.json");
      const pages = await response.json();
  
      // Filter pages based on the query
      const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(query.toLowerCase())
      );
  
      // Display search results
      searchResults.innerHTML = ""; // Clear previous results
  
      if (filteredPages.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No results found.";
        searchResults.appendChild(li);
      } else {
        for (const page of filteredPages) {
          const li = document.createElement("li");
          const link = document.createElement("a");
  
          // Use the title found inside the HTML file, or fallback to the filename
          const pageTitle = await getTitleFromHtml(page.url);
          link.textContent = pageTitle || page.title;
          link.href = page.url;
  
          li.appendChild(link);
          searchResults.appendChild(li);
        }
      }
    } catch (error) {
      console.error("Error fetching or processing pages:", error);
    }
  }
  
  // Function to extract the title from an HTML file
  async function getTitleFromHtml(url) {
    try {
      // Fetch the HTML content
      const response = await fetch(url);
      const html = await response.text();
  
      // Use a regular expression to find the title inside the <title> tag
      const match = /<title>(.*?)<\/title>/i.exec(html);
      return match ? match[1].trim() : null;
    } catch (error) {
      console.error("Error fetching HTML content:", error);
      return null;
    }
  }  
});
