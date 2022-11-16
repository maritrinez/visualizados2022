window.addEventListener('DOMContentLoaded', (event) => {
  
  // - - - NAV MENU
  function getMT() {
    const h = document.getElementById("menu").clientHeight;
    return `-${h}px`;
  }

  function hideNav() {
    document.getElementById("menu").style.marginTop = getMT();
  }

  function showNav() {
    document.getElementById("menu").style.marginTop = '0px';
  }

  function toggleNav() {
    const el = document.getElementById("menu"),
          currentMargin = parseInt(el.style.marginTop);
    currentMargin < 0 ? showNav() : hideNav();
  }


  function loadNav() {
    hideNav();
    document.getElementById("menu").classList.remove("-top-full"); 
    document.getElementById("menu").classList.remove("absolute"); 

    setTimeout(() => {
      document.getElementById("menu").classList.add("transition-[margin]", "duration-500");
    }, "1000")
  }
  
  // Apply interaction
  loadNav();
  document.getElementById("link-menu").addEventListener("click", toggleNav, false);
  
  // - - - WHO AM I
  function toggleWhoami(e) {
    const wai = document.getElementById("whoami");
    wai.classList.toggle("top-0");
    wai.classList.toggle("-top-full");

    if ( e.target.id == "close-whoami") hideNav();
  }
  
  // Apply interaction
  document.getElementById("home-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("nav-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("close-whoami").addEventListener("click", toggleWhoami, false);
});