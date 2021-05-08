var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  if (readCookie("cookie-approval-status") != "true") {
    document.querySelector("#submit").disabled = true;
    var warning = document.createElement("p");
    warning.classList.add("warning");
    warning.textContent =
      "Cookie consent must be accepted to get in touch, you can either clear your cookies to accept them or reach out directly through social media.";

    document.querySelector("#form__message").appendChild(warning);
  }
});

document.getElementById('submit').addEventListener("click", function () {
  let error = "";
  document.querySelector("#form__message").textContent = "";

  const nameRegExp = /^[A-Za-z ]+$/;
  const phoneRegExp = /^[0-9 +]+$/;
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Check name
  if (
    document.querySelector("#nameInput").value.length <= 0 ||
    !nameRegExp.test(document.querySelector("#nameInput").value)
  ) {
    error += '<p class="error">Name has failed validation checks</p>';
  }

  // Check phone
  if (
    document.querySelector("#phoneInput").value.length > 0 &&
    !phoneRegExp.test(document.querySelector("#phoneInput").value)
  ) {
    error += '<p class="error">Phone number isn\'t in a valid format</p>';
  }

  // Check email
  if (!emailRegExp.test(document.querySelector("#emailInput").value)) {
    error += '<p class="error">Email address is invalid</p>';
  }

  if (error.length > 0) {
    document.querySelector("#form__message").appendChild(error);
  } else {
    submitForm();
  }
});


function submitForm() {
  document.querySelector("#form__message").textContent = "";
  let message = document.createElement("p");
  axios
    .post(
      "https://fuucfgr9t6.execute-api.eu-west-2.amazonaws.com/prod/",
      {
        name: document.querySelector("#nameInput").value,
        phone: document.querySelector("#phoneInput").value,
        email: document.querySelector("#emailInput").value,
        message: document.querySelector("#messageInput").value,
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
      if (!document.querySelector("#success")) {
        message.classList.add("success");
        message.textContent = "Message sent successfully!";
      }
    })
    .catch(function (error) {
      if (!document.querySelector("#error")) {
        message.classList.add("error");
        message.textContent =
          "Something didn't go quite right there... Message failed to send!";
      }
    });
  document.querySelector("#form__message").appendChild(message);
  document.querySelector("#submit").disabled = true;
}
