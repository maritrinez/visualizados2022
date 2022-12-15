window.addEventListener('DOMContentLoaded', (event) => {
  
  // First load
  firstLoad("menu")
  firstLoad("whoami")
  
  // Apply interaction
  document.getElementById("menu-button").addEventListener("click", toggleNav, false);

  document.getElementById("home-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("nav-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("close-whoami").addEventListener("click", toggleWhoami, false);

  // MAILTO copy & reset tooltip message
  const mailtos = document.querySelectorAll('.mailto-link');
 
  mailtos.forEach(mailto => {
    // mailto.addEventListener('pointerdown', (event) => {

    //   if (event.pointerType === "mouse") {copyToClipboard(event)}
    //   if (event.pointerType === "touch") {console.log('touch');}

    // }, false);


    mailto.addEventListener("click", (event) => {copyToClipboard(event)}, false);
    mailto.addEventListener("mouseout", (event) => {
      setTimeout(() => {
        event.target.querySelector("#mailto-message").innerHTML = 'Click to copy email address';
      }, "200")
    }, false);
  });
  
});



//////////////////////////////
///// F U N C T I O N S //////
//////////////////////////////

// - - - MANAGE CONTAINERS

// Helpers
function getHeight(id) {
  return document.getElementById(id).clientHeight;
}

function setMarginTop(id) {
  const h = getHeight(id)
  document.getElementById(id).style.marginTop = `-${h}px`;
}

function resetMarginTop(id) {
  document.getElementById(id).style.marginTop = "0px";
}

// First load
function firstLoad(id) {
  document.getElementById(id).classList.remove("hidden");
  document.getElementById('base').style.maxHeight = "120000px";
  setMarginTop(id);

  setTimeout(() => {
    document.getElementById(id).classList.add("transition-[margin]", "duration-500");
  }, "500")
}

// Showers
function showWhoami () {
  resetMarginTop("whoami");
  // scroll to top
  window.scrollTo(0, 0);
  // hide base 
  document.getElementById('base').style.maxHeight = "0px";
}

function showNav () {
  resetMarginTop("menu");

  // toggle menu button
  document.getElementById("bars-3").classList.remove("block"); 
  document.getElementById("bars-3").classList.add("hidden");
  document.getElementById("x-mark").classList.remove("hidden"); 
  document.getElementById("x-mark").classList.add("block");
  
}


// Hidders
function hideWhoami () {
  setMarginTop("whoami");

  // reset base height
  document.getElementById('base').style.maxHeight = "120000px";

  // close nav
  setTimeout(() => { hideNav()}, "100")
}

function hideNav () {
  setMarginTop("menu");

  // toggle menu button
  document.getElementById("bars-3").classList.remove("hidden"); 
  document.getElementById("bars-3").classList.add("block");
  document.getElementById("x-mark").classList.remove("block"); 
  document.getElementById("x-mark").classList.add("hidden"); 
}

// Togglers
function toggleNav () {
  const el = document.getElementById("menu"),
        currentMargin = parseInt(el.style.marginTop);
  currentMargin < 0 ? showNav() : hideNav();
}

function toggleWhoami () {
  const el = document.getElementById("whoami"),
        currentMargin = parseInt(el.style.marginTop);
  currentMargin < 0 ? showWhoami() : hideWhoami();
}








// - - - COPY MAIL
// https://codepen.io/eclarrrk/pen/ZZywZv
function copyToClipboard(e) {
  if (e.pointerType != 'mouse') return;
  
  // Disable opening the email client.
  e.preventDefault();
  
  // Get the email text
  const str = e.target.dataset.mail;
  
  // Create a hidden element and copy the text to the clipboard
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', str);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  // Update tooltip message
  e.target.querySelector("#mailto-message").innerHTML = "Email copied to clipboard !!";
}

