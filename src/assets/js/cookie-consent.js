function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

if (readCookie("cookie-approval-status") == "true") {
  // Cookies and scripts approved
} else if (readCookie("cookie-approval-status") == "false") {
  // Don't use Google Analytics and don't show banner
} else {
  // Show banner
  document.getElementById("cookie-notice").style.display = "block";
}
document
  .getElementById("cookie-notice-approve")
  .addEventListener("click", function () {
    createCookie("cookie-approval-status", "true", 31);
    document.getElementById("cookie-notice").style.display = "none";
    location.reload();
  });
document
  .getElementById("cookie-notice-decline")
  .addEventListener("click", function () {
    createCookie("cookie-approval-status", "false", 31);
    document.getElementById("cookie-notice").style.display = "none";
    location.reload();
  });
