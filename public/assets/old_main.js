window.addEventListener('DOMContentLoaded', (event) => {
  
  // First load
  firstLoad("menu")
  firstLoad("whoami")
  // load_projects();



  ////////////////////////////////////
  ///// WHOAMI - MENU PLACEMENT //////
  ////////////////////////////////////

  // Apply interaction
  document.getElementById("menu-button").addEventListener("click", toggleNav, false);

  document.getElementById("home-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("nav-whoami").addEventListener("click", toggleWhoami, false);
  document.getElementById("close-whoami").addEventListener("click", toggleWhoami, false);


// - - - F U N C T I O N S

// Helpers
function getHeight(id) {
  console.log(id, document.getElementById(id).clientHeight)
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



////////////////////////////////////////////////
///// L O A D   H O M E   P R O J E C T S //////
////////////////////////////////////////////////

const strength_icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lime"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>';

const classes = {
    project_item: 'projects_item group relative',
    project_image: 'project_image aspect-w-1 aspect-h-1 w-full overflow-hidden',
    image: 'h-full w-full object-cover object-center',
    overlay: 'overlay absolute inset-0 flex flex-col justify-center bg-indigo opacity-0 group-hover:bg-indigo/70 group-hover:opacity-100 transition-opacity',
    overlay_copy: 'text-white flex flex-col items-center',
    strength: 'flex space-x-1'
}

function load_projects () {
  console.log('entra')
  d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQoVPZ9h7hN0Ckh41FKH2k42RaS-NGcJzHSVB_kl6GhF-AiaGHmm3JMwNfViiTDS0xeiIV-H0zxNGsd/pub?output=csv').then((data) => {
    // sort the data by order
    data.sort((a, b) => b.order - a.order)

    // append a div for each project
    let items = d3.select('#work').select('.layout').selectAll('a.projects_item')
        .data(data)
        .join('a')
        .attr('class', classes.project_item)
        .attr('href', d => `.${d.project_path}.html`);
    
    items.selectAll('.project_image')
        .data(d => [d])
        .join('div')
        .attr('class', classes.project_image)
    .selectAll('img')
        .data(d => [d])
        .join('img')
        .attr('class', classes.image)
        .attr('src', d => `./assets/images/scs/${d.img_path}`);
    
    let overlay = items.selectAll('.overlay')
        .data(d => [d])
        .join('div')
        .attr('class', classes.overlay)
        .selectAll('div')
        .data(d => [d])
        .join('div')
        .attr('class', classes.overlay_copy);
    overlay.selectAll('h2')
        .data(d => [d])
        .join('h2')
        .attr('class', 'uppercase')
        .html(d => d.title)
    
    overlay.selectAll('h3')
        .data(d => [d])
        .join('h3')
        .html(d => d.client)
    
    let strength = overlay.selectAll('div')
        .data(d => [d])
        .join('div')
        .attr('class', classes.strength)
        .html(strength_icon)
    
    strength.selectAll('h3')
    .data(d => [d])
    .join('h4')
    .html(d => d.strength)

  });
}



  ////////////////////////
  ///// M A I L T O //////
  ////////////////////////
  // copy & reset tooltip message
  // apply interaction to mail links
  const mailtos = document.querySelectorAll('.mailto-link');
  mailtos.forEach(mailto => {
    mailto.addEventListener("click", (event) => {copyToClipboard(event)}, false);

    mailto.addEventListener("mouseleave", (event) => {
      event.target.querySelector("#mailto-message").classList.add("opacity-0");

      event.target.querySelectorAll("svg").forEach(function(item) {
        item.classList.remove("animate-glow");
        item.classList.remove("text-lime");
      });

      setTimeout(() => {
        event.target.querySelector("#mailto-message").innerHTML = 'Click to copy email address';
      }, "200")
    }, false);
  });
  
});




// - - - COPY MAIL
// https://codepen.io/eclarrrk/pen/ZZywZv
function copyToClipboard(e) {
  e.target.querySelectorAll("svg").forEach(function(item) {
    item.classList.add("animate-glow");
    item.classList.add("text-lime");
  });
  
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


