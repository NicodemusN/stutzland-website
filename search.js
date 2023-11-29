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
  
      console.log("Fetched pages:", pages);
  
      // Filter pages based on the query
      const filteredPages = pages.filter((page) =>
        page.title.toLowerCase().includes(query)
      );
  
      console.log("Filtered pages:", filteredPages);
  
      // Display search results
      filteredPages.forEach((page) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
  
        link.href = page.url;
        link.textContent = page.title;
  
        li.appendChild(link);
        searchResults.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching or processing pages:", error);
    }
  }
});
