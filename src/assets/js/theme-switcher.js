const toggleSwitch = document.querySelector(".switch .switch__input");

toggleSwitch.addEventListener("change", function () {
  document.querySelector('body').classList.add("transition");
  if (this.checked) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);

  if (themeName === "light") {
    toggleSwitch.checked = true;
  } else if (themeName === "retro") {
    createKonamiLogo();
  }
}

var konamiPattern = [
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

var konamiKeyCount = 0;

document.addEventListener(
  "keydown",
  function (event) {
    if (
      konamiPattern.indexOf(event.key) < 0 ||
      event.key !== konamiPattern[konamiKeyCount]
    ) {
      konamiKeyCount = 0;
      return;
    }
    konamiKeyCount++;

    if (konamiPattern.length === konamiKeyCount) {
      konamiKeyCount = 0;

      if (localStorage.theme === "retro") {
        setTheme("dark");
        toggleSwitch.checked = false;
        document.querySelector(".switch").style.display = "block";
        document.querySelectorAll(".msdos").forEach((e) => e.remove());
      } else {
        setTheme("retro");
      }
    }
  },
  false
);

function createKonamiLogo() {
  var msdosElem = document.createElement("img");
  msdosElem.classList.add("msdos");
  msdosElem.src = "/assets/icons/MSDOS.png";
  msdosElem.alt = "MS-Dos";

  document.querySelector(".switch").style.display = "none";
  document.querySelector(".switch").after(msdosElem);
}

// Initialise Theme
(function () {
  if (localStorage.theme) {
    setTheme(localStorage.theme);
  } else {
    setTheme("dark");
  }
})();
