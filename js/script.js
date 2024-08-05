// Get the button element by ID
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when the user scrolls down 1px from the top
window.onscroll = function () {
  scrollFunction();
};

// Function to check the scroll position
function scrollFunction() {
  if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
