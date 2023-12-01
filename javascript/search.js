// Function to fetch pages from pages.json
async function fetchPages(query) {
  try {
    // Fetch the pages.json content
    const response = await fetch("pages.json");
    const pages = await response.json();

    // Filter pages based on the query
    const filteredPages = pages.filter(page => page.title.toLowerCase().includes(query.toLowerCase()));

    // Return the filtered pages
    return filteredPages;
  } catch (error) {
    console.error("Error fetching or processing pages:", error);
    return [];
  }
}

// Function to handle search input
async function handleSearchInput() {
  // Get the search input value
  const query = document.getElementById("searchInput").value;

  // Fetch and display the search results
  const results = await fetchPages(query);
  displayResults(results);
}

// Function to display search results
function displayResults(results) {
  // Get the search results container
  const resultsContainer = document.getElementById("searchResults");

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Check if the search input is empty
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput === "") {
    // If empty, do not display any results
    return;
  }

  // Display new results
  results.forEach(result => {
    // Create a list item with the title and URL
    const listItem = document.createElement("li");
    
    // Use the title from JSON if available, otherwise use the URL
    const displayTitle = result.title || result.url;
    
    listItem.innerHTML = `<a href="${result.url}">${displayTitle}</a>`;
    
    // Append the list item to the results container
    resultsContainer.appendChild(listItem);
  });
}

// Attach an event listener to the search input
document.getElementById("searchInput").addEventListener("input", handleSearchInput);
