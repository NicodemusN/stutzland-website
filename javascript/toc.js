function createTOC() {
    const tocContainer = document.getElementById("tableOfContents");
    if (!tocContainer) {
        console.error("Table of Contents container not found.");
        return;
    }

    const headings = document.querySelectorAll(".main-content h2, .main-content h3");
    const tocList = document.createElement("ul");

    headings.forEach((heading) => {
        // Exclude headings that contain the "§" symbol
        if (heading.innerHTML.includes("&#167;")) {
            return;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = heading.textContent;
        link.href = `#${heading.id}`;
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

// Run the createTOC function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", createTOC);