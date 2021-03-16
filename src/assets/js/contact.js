$(document).ready(function () {
  if (readCookie("cookie-approval-status") != "true") {
    $("#submit").prop("disabled", true);
    $("#form__message").append(
      '<p class="warning">Cookie consent must be accepted to get in touch, you can either clear your cookies to accept them or reach out directly through social media.</p>'
    );
  }
});

function validateForm() {
  var error = "";
  $("#form__message").empty();

  // Check name
  if (
    $("#nameInput").length <= 0 ||
    !$("#nameInput")
      .val()
      .match(/^[A-Za-z ]+$/)
  ) {
    error += '<p class="error">Name has failed validation checks!</p>';
  }

  // Check phone
  if (
    $("#phoneInput").val() > 0 &&
    !$("#phoneInput")
      .val()
      .match(/^[0-9 +]+$/)
  ) {
    error += '<p class="error">Phone number isn\'t in a valid format!</p>';
  }

  // Check email
  if (
    !$("#emailInput")
      .val()
      .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ) {
    error += '<p class="error">Email address is invalid!</p>';
  }

  if (error.length > 0) {
    $("#form__message").append(error);
  } else {
    submitForm();
  }
}

function submitForm() {
  $("#form__message").empty();
  axios
    .post(
      "https://fuucfgr9t6.execute-api.eu-west-2.amazonaws.com/prod/",
      {
        name: $("#nameInput").val(),
        phone: $("#phoneInput").val(),
        email: $("#emailInput").val(),
        message: $("#messageInput").val(),
        token: document.querySelector(
          "#contact-form textarea[name='g-recaptcha-response']"
        ).value,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
    .then(function (response) {
      $("#form__message").html(
        '<p class="success">Message sent successfully!</p>'
      );
      $("#submit").prop("disabled", true);
    })
    .catch(function (error) {
      $("#form__message").append(
        '<p class="error">Something didn\'t go quite right there... Message failed to send!</p>'
      );
      $("#submit").prop("disabled", true);
    });
}
