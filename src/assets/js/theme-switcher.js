const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "light") {
    toggleSwitch.checked = true;
  } else if (currentTheme === "retro") {
    konamiTheme();
  }
}

var pattern = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
var current = 0;

var keyHandler = function (event) {
  // If the key isn't in the pattern, or isn't the current key in the pattern, reset
  if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
    current = 0;
    return;
  }

  // Update how much of the pattern is complete
  current++;

  // If complete, alert and reset
  if (pattern.length === current) {
    current = 0;
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;
    if (currentTheme === "retro") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      $(".switch").show();
      $("#msdos").remove();
    } else {
      konamiTheme();
    }
  }
};

// Listen for keydown events
document.addEventListener("keydown", keyHandler, false);

function konamiTheme() {
  document.documentElement.setAttribute("data-theme", "retro");
  localStorage.setItem("theme", "retro");
  $(".switch").hide();
  $(".switch").after(
    "<img id='msdos' alt='MS-Dos' src='/assets/icons/MSDOS.png' style='height:60px;'>"
  );
}
