window.addEventListener('DOMContentLoaded', (event) => {
  
  // - - - NAV MENU
  function getMT() {
    const h = document.getElementById("menu").clientHeight;
    return `-${h}px`;
  }

  function hideNav() {
    document.getElementById("menu").style.marginTop = getMT();
    document.getElementById("bars-3").classList.remove("hidden"); 
    document.getElementById("bars-3").classList.add("block");
    document.getElementById("x-mark").classList.remove("block"); 
    document.getElementById("x-mark").classList.add("hidden"); 
  }

  function showNav() {
    document.getElementById("menu").style.marginTop = '0px';
    document.getElementById("bars-3").classList.remove("block"); 
    document.getElementById("bars-3").classList.add("hidden");
    document.getElementById("x-mark").classList.remove("hidden"); 
    document.getElementById("x-mark").classList.add("block");  
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
  document.getElementById("menu-button").addEventListener("click", toggleNav, false);
  
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