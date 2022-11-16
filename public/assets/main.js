window.addEventListener('DOMContentLoaded', (event) => {
  
  // - - - NAV MENU
  function getMV() {
    const h = document.getElementById("menu").clientHeight;
    return `-mt-[${h}px]`;
  }


  function loadNav() {
    document.getElementById("menu").classList.add(getMV());
    document.getElementById("menu").classList.remove("absolute", "-top-full"); 

    setTimeout(() => {
      document.getElementById("menu").classList.add("transition-[margin]", "transition-500");
    }, "1000")
  }
  
  function toggleNav() {
    document.getElementById("menu").classList.toggle(getMV());
    document.getElementById("menu").classList.toggle("mt-0");
  }
  function closeNav() {
    document.getElementById("menu").classList.add(getMV());
    document.getElementById("menu").classList.remove("mt-0");
  }

  // Apply interaction
  loadNav();
  document.getElementById("link-menu").addEventListener("click", toggleNav, false);
  
  // - - - WHO AM I
  function toggleWhoami(e) {
    const wai = document.getElementById("whoami");
    wai.classList.toggle("top-0");
    wai.classList.toggle("-top-full");

    if ( e.target.id == "close-whoami") closeNav();
  }
  
  // Apply interaction
  document.getElementById("home-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("nav-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("close-whoami").addEventListener("click", toggleWhoami, false);
});