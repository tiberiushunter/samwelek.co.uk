var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  if (readCookie("cookie-approval-status") != "true") {
    document.querySelector("#submit").disabled = true;

    let message = createMessage(
      "Cookie consent must be accepted to get in touch, you can either clear your cookies to accept them or reach out directly through social media.",
      "warning"
    );

    document.querySelector("#form__messages").appendChild(message);
  }
});

function createMessage(message, severity) {
  var element = document.createElement("p");
  element.classList.add("form__message");
  element.classList.add(severity);
  element.textContent = message;

  return element;
}

document.getElementById("submit").addEventListener("click", function () {
  validateForm();
});

function validateForm() {
  let messages = [];

  document.querySelectorAll(".form__message").forEach((e) => e.remove());

  const nameRegExp = /^[A-Za-z ]+$/;
  const phoneRegExp = /^[0-9 +]+$/;
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Check name
  if (
    document.querySelector("#nameInput").value.length <= 0 ||
    !nameRegExp.test(document.querySelector("#nameInput").value)
  ) {
    messages.push(createMessage("Name has failed validation checks", "error"));
  }

  // Check phone
  if (
    document.querySelector("#phoneInput").value.length > 0 &&
    !phoneRegExp.test(document.querySelector("#phoneInput").value)
  ) {
    messages.push(
      createMessage("Phone number isn't in a valid format", "error")
    );
  }

  // Check email
  if (!emailRegExp.test(document.querySelector("#emailInput").value)) {
    messages.push(createMessage("Email address is invalid", "error"));
  }

  if (messages.length > 0) {
    messages.forEach((x) => {
      document.querySelector("#form__messages").appendChild(x);
    });
  } else {
    submitForm();
  }
}

function submitForm() {
  document.querySelectorAll(".form__message").forEach((e) => e.remove());
  let message = createMessage("Thank you for getting in touch.", "success");

  if (readCookie("recently-sent-message") != "true") {
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
        message = createMessage(
          "Message sent successfully! Thank you for getting in touch.",
          "success"
        );
      })
      .catch(function (error) {
        message = createMessage(
          "Something didn't go quite right there... Message failed to send!",
          "error"
        );
      });
  }

  document.querySelector("#form__messages").appendChild(message);

  createCookie("recently-sent-message", true, 7);
}
