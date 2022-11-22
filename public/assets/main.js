window.addEventListener('DOMContentLoaded', (event) => {
  
  // NAV first load & interaction
  loadNav();
  document.getElementById("menu-button").addEventListener("click", toggleNav, false);
  
  // WHO AM I interaction
  document.getElementById("home-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("nav-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("close-whoami").addEventListener("click", toggleWhoami, false);

  // MAILTO copy & reset tooltip message
  document.getElementById("mailto-link").addEventListener("click", (event) => {copyToClipboard(event)}, false);

  document.getElementById("mailto-link").addEventListener("mouseout", (event) => {
    setTimeout(() => {
      document.getElementById("mailto-message").innerHTML = 'Click to copy email address';
    }, "200")
  }, false);
  
});



//////////////////////////////
///// F U N C T I O N S //////
//////////////////////////////

// - - - NAV MENU
function getMT() {
  const h = document.getElementById("menu").clientHeight;
  return `-${h}px`;
}

function hideNav() { 
  document.getElementById("menu").style.marginTop = getMT();
  document.getElementById("hd-wrapper").style.top = getMT();

  document.getElementById("bars-3").classList.remove("hidden"); 
  document.getElementById("bars-3").classList.add("block");
  document.getElementById("x-mark").classList.remove("block"); 
  document.getElementById("x-mark").classList.add("hidden"); 
}

function showNav() {
  document.getElementById("menu").style.marginTop = '0px';
  document.getElementById("hd-wrapper").style.top = '0px';

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
  document.getElementById("menu").classList.remove("hidden");
  hideNav();

  setTimeout(() => {
    document.getElementById("menu").classList.add("transition-[margin]", "duration-500");
    document.getElementById("hd-wrapper").classList.add("transition-[top]", "duration-500");
  }, "500")
}


// - - - WHO AM I
function toggleWhoami(e) {
    
  const wai = document.getElementById("whoami");
  wai.classList.toggle("top-0");
  wai.classList.toggle("top-[-150%]");
  
  window.scrollTo(0, 0);
  
  setTimeout(() => {
    // Show the nav when Who Am I is opened, so it aligns correctly to top of the screen.
    e.target.id == "close-whoami" ? hideNav() : showNav();
  }, "100")
  
}

// - - - COPY MAIL
// https://codepen.io/eclarrrk/pen/ZZywZv
function copyToClipboard(e) {
  // Disable opening the email client.
  e.preventDefault();
  
  // Get the email text
  const str = e.target.text;

  // Create a hidden element and copy the text to the clipboard
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', str);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  // Update tooltip message
  document.getElementById("mailto-message").innerHTML = 'Email address copied to clipboard';
}