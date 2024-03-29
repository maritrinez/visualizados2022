import {csv} from "https://cdn.skypack.dev/d3-fetch@3";
import {selectAll, select} from "https://cdn.skypack.dev/d3-selection@3";
import {sort, max, filter} from "https://cdn.jsdelivr.net/npm/d3-array@3/+esm";


// - - GRID ANIMATION - -
function revealWork() {
  if (isOpened.whoami) return;
  const cards = document.querySelectorAll(".card"); 
  for (let i = 0; i < cards.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = cards[i].getBoundingClientRect().top,
          elementBottom = cards[i].getBoundingClientRect().bottom;
    const offset = windowHeight * 0; 
    if (elementTop < windowHeight - offset & elementBottom > 0) { // reveals
      cards[i].classList.add("active");
    } else if (elementBottom < 0) { // hides upwards
      cards[i].classList.remove("active");
      cards[i].classList.remove("fade-up");
      cards[i].classList.add("fade-down");
    } else { // hide downwards
      cards[i].classList.remove("active");
      cards[i].classList.remove("fade-down");
      cards[i].classList.add("fade-up");
    }
  }
}


window.addEventListener('DOMContentLoaded', (event) => {
  ///////////////////////////
  ///// ON LOAD ORDERS //////
  ///////////////////////////
  
  // - - -  P R O J E C T S  - - -
  const csv_file = './assets/visualizados_projects.csv',
        csv_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQoVPZ9h7hN0Ckh41FKH2k42RaS-NGcJzHSVB_kl6GhF-AiaGHmm3JMwNfViiTDS0xeiIV-H0zxNGsd/pub?output=csv';

  const atHome = document.querySelector('#greeting') ? true : false,
        isTouch = ('ontouchstart' in document.documentElement) ? true : false;

  csv(csv_file).then((data) => {
    atHome ? loadProjects(data) : updateNavigator(data, isTouch);
  });
  
  // - - -  S C R O L L   T O   W O R K  - - -
  if (window.location.hash == '#work') {
    setTimeout(() => { 
      document.querySelector('#work').scrollIntoView();  
    }, 300);
  } 

  // - - -  R E V E A L   W O R K  - - -
  
  // reveal nexts on scrolling
  window.addEventListener("scroll", revealWork);

  // - - -  H I D D E N   E L E M E N T S   - - -
  firstLoad('whoami');
  firstLoad('menu');


  // - - -  E V E N T S  - - -
  
  // - - WHOAMI/NAV INTERACTION - -
  const whoamis = document.querySelectorAll('.whoami-link');
  whoamis.forEach(wai => {
    wai.addEventListener("click", () => { toggle('whoami')}, false);
  });

  document.querySelector('#menu-button').addEventListener("click", () => { toggle('menu')}, false);
  
  // link to work
  document.querySelectorAll('.work-link').forEach(e => {
    e.addEventListener("click", () => { 
      toggle('menu');
      setTimeout(() => { 
        document.querySelector('#work').scrollIntoView();  
      }, 300);
    }, false);
  });

  // - - RESIZE - -
  // https://www.cluemediator.com/how-to-wait-resize-end-event-and-then-perform-an-action-using-javascript
  let timeOutFunctionId;
  window.addEventListener("resize", function () {
    // si el menu está abierto, el menú no se toca, que si no se cierra solo
    if (!isOpened.whoami) {
      _resetTansition('whoami')
      _setMarginTop('whoami');
    }
    
    if (!isOpened.menu) {
      _resetTansition('menu')
      _setMarginTop('menu');
    }

    // do this at the end (after 500 ms without resizing)
    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(() => { 
      _setTansition('whoami')
      _setTansition('menu')
    }, 500);
  });

  
  // - - MAILTO - -
  // copy & reset tooltip message
  // apply interaction to mail links
  const mailtos = document.querySelectorAll('.mailto-link');
  mailtos.forEach(mailto => {
    // remove text for touch devices to avoid
    mailto.querySelector("#mailto-message").innerHTML = isTouch ? '' : 'Click to copy email address';

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

//////////////////////////////////////////////////
// - - -  P R O J E C T   N A V I G A T O R  - - -
//////////////////////////////////////////////////
function updateNavigator (data, isTouch) {
  const path = window.location.pathname.split('/').pop().replace(/\.html/, ''),
        current = data.filter(d => d.project_path == path)[0],
        maxIndex = max(data, d => d.index);
  
  const navs = document.querySelectorAll('.projects-navigator');

  // prara cada nav
  navs.forEach(nav => {
    const prev = nav.getElementsByClassName('prev')[0],
          next = nav.getElementsByClassName('next')[0];
    let prev_path, next_path;
    
    // - - switch depending on project index
    // update prev/next href
    switch (current.index) {
      case '1':
        next_path = data.filter(d => d.index == +current.index + 1)[0].project_path;
        next.href = `./${next_path}.html`;
        break;
      case maxIndex:
        prev_path = data.filter(d => d.index == +current.index - 1)[0].project_path;
      case maxIndex: 
        prev.href = `./${prev_path}.html`;
        break;
      default:
        prev_path = data.filter(d => d.index == +current.index - 1)[0].project_path;
        next_path = data.filter(d => d.index == +current.index + 1)[0].project_path;
        next.href = `./${next_path}.html`;
        prev.href = `./${prev_path}.html`;
    }
    
    // - - SWIPE - -
    if (isTouch) {
      const swipeZone = document.getElementById('project');

      let touchstartX = 0
      let touchendX = 0
          
      function checkDirection() {
        if (touchendX < touchstartX && next_path) window.location.href = `./${next_path}.html`;
        if (touchendX > touchstartX && prev_path) window.location.href = `./${prev_path}.html`;
      }

      swipeZone.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
      })

      swipeZone.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        if (Math.abs(touchendX - touchstartX) > 80) checkDirection();
      })
    }
  });
}






////////////////////////////////////////
// - - -  W H O A M I    M E N U  - - -
////////////////////////////////////////
// - -  VARIABLES - -
let isOpened = {
  whoami: false,
  menu: false
};


// - -  FUNCTIONS - -
function firstLoad(id) {
  setTimeout(function() {
    _setMarginTop(id);
  }, "500")
 
  setTimeout(function() {
    _setTansition(id);
    _rmAbsPos(id);
  }, "700")

}


// - - PRIVATE FUNCTIONS - -
function toggle (id) {
  isOpened[id] ? _hide(id) : _show(id);
  if (id == 'whoami') _hide('menu')
}

function _show (id) {
  _resetMarginTop(id);
  isOpened[id] = true;

  switch (id) {
    case 'whoami':
      document.getElementById('main').style.maxHeight = "0px";
      window.scrollTo(0, 0);
      break;
    case 'menu':
      // Toggle menu button
      document.getElementById("bars-3").classList.remove("block"); 
      document.getElementById("bars-3").classList.add("hidden");
      document.getElementById("x-mark").classList.remove("hidden"); 
      document.getElementById("x-mark").classList.add("block");
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
}

function _hide (id) {
  _setMarginTop(id);
  isOpened[id] = false;

  switch (id) {
    case 'whoami':
      document.getElementById('main').style.maxHeight = "120000px";
      break;
    case 'menu':
      // toggle menu button
      document.getElementById("bars-3").classList.remove("hidden"); 
      document.getElementById("bars-3").classList.add("block");
      document.getElementById("x-mark").classList.remove("block"); 
      document.getElementById("x-mark").classList.add("hidden"); 
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
}

function _setMarginTop(id) {
  const el = document.getElementById(id),
        h = el.clientHeight;
  el.style.marginTop = `-${h}px`;
}

function _resetMarginTop(id) {
  document.getElementById(id).style.marginTop = '0px';
}

function _setTansition(id) {
  document.getElementById(id).classList.add("transition-[margin]", "duration-500");
}

function _resetTansition(id) {
  document.getElementById(id).classList.remove("transition-[margin]", "duration-500")
}

function _rmAbsPos(id) {
  const top = id == 'whoami' ? 350 : 35 ;
  document.getElementById(id).classList.remove('absolute');
  document.getElementById(id).classList.remove(`top-[-${top}%]`);
}


/////////////////////////////////////////////////////
// - - -  L O A D   H O M E   P R O J E C T S  - - -
/////////////////////////////////////////////////////

function loadProjects (data) {
  const strength_icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6 text-lime"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path></svg>';

  const classes = {
      card_odd: 'card fade-up group',
      card_even: 'card fade-up group md:delay-300',
      card_image: 'figure h-min overflow-hidden',
      image: 'h-full w-full object-cover object-center group-hover:scale-[1.03] transition-all duration-300',
      caption: 'caption text-right',
      caption_title: 'title flex space-x-2 justify-end items-center mt-2',
      caption_title_line: 'w-full md:w-1/4 border-b border-black transition-all duration-700 group-hover:w-full',
      caption_title_text: 'font-sans font-medium whitespace-nowrap',
      caption_subtitle: 'subtitle overflow-hidden transition-all md:h-8',
      caption_subtitle_strength: 'strength flex space-x-1 md:space-x-2 justify-end items-end transition-all duration-300 -mt-1 md:-mt-8 group-hover:-mt-0.5',
      caption_subtitle_client: 'client p-small mt-1 hidden md:block'
  }

  // sort the data by order
  data.sort((a, b) => a.index - b.index)

  // append a div for each project
  let items = select('#work').select('ul').selectAll('li.card')
      .data(data)
      .join('li')
      .attr('class', (d,i) => (i%2 == 0) ? classes.card_odd : classes.card_even);
  
  items.selectAll('.figure')
      .data(d => [d])
      .join('div')
      .attr('class', classes.card_image)
    .selectAll('a')
      .data(d => [d])
      .join('a')
      .attr('href', d => `./${d.project_path}.html`)
    .selectAll('img')
      .data(d => [d])
      .join('img')
      .attr('class', classes.image)
      .attr('src', d => `./assets/images/scs/${d.img_path}`);
  
  let caption = items.selectAll('.caption')
      .data(d => [d])
      .join('div')
      .attr('class', classes.caption);
  
  caption.selectAll('.title')
      .data(d => [d])
      .join('div')
      .attr('class', classes.caption_title)
    .selectAll('div')
      .data(d => [classes.caption_title_line, d])
      .join('div')
      .attr('class', d => (d.title) ? classes.caption_title_text : d)
      .html(d => (d.title) ? d.title : '')
  
  let subtitle = caption.selectAll('.subtitle')
      .data(d => [d])
      .join('div')
      .attr('class', classes.caption_subtitle);
  
  subtitle.selectAll('.strength')
    .data(d => [d])
    .join('div')
    .attr('class', classes.caption_subtitle_strength)
    .html(d => `${strength_icon}<p class="p-small sm:font-medium">${d.strength}</p>`);
  
  subtitle.selectAll('.client')
    .data(d => [d])
    .join('div')
    .attr('class', classes.caption_subtitle_client)
    .html(d => d.client);
  
  revealWork();
}

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


