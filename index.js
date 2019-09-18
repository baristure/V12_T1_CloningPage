const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  /* */
  if (window.pageYOffset > 535) {
    //Show bactotopButton
    backToTopButton.style.display = "block";
    backToTopButton.classList.remove("btnExit");
    backToTopButton.classList.add("btnEntrance");
  } else {
    //Hide backtotopButton
    backToTopButton.style.display = "none";
  }
}

backToTopButton.addEventListener("click", backtoTop);

function backtoTop() {
  window.scrollTo(0, 0);
}
