window.addEventListener('DOMContentLoaded', (event) => {
  
  // - - - who am I sroll
  function openWhoami() {
    console.log('click')
    const el = document.getElementById("whoami");
    el.classList.add("top-0")
    el.classList.remove("-top-full")
  }

  function closeWhoami() {
    console.log('click')
    const el = document.getElementById("whoami");
    el.classList.remove("top-0")
    el.classList.add("-top-full")
  }

  // Add event listener to table
  const el = document.getElementById("link-whoami");
  el.addEventListener("click", openWhoami, false);

  document.getElementById("close-whoami")
  .addEventListener("click", closeWhoami, false);


});