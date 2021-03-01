---
layout: page
title: Contact
description: Use the form below to send me a message or reach out to me on social media
---

<form method="post" onsubmit="return false;" id="contact-form">

  <label for="nameInput" class="form-label required">Name</label>
  <input type="text" id="nameInput" name="name" required>

  <label for="phoneInput" class="form-label">Phone</label>
  <input type="text" id="phoneInput" name="phone">

  <label for="emailInput" class="form-label required">Email</label>
  <input type="email" id="emailInput" name="email" required>

  <label for="messageInput" class="form-label required">Message</label>
  <textarea rows="6" type="textarea" id="messageInput" name="message" required></textarea>

  <button type="submit"
        id="submit"
        class="btn btn-submit g-recaptcha"
        data-sitekey="6LcrQGwaAAAAAODk2BdrQJSlYMj90B4kXlRjbO4S"
        data-callback="validateForm"
        onclick="validateForm()">Submit</button>

  <div id="form__message" style="margin-top:20px;text-align:center"></div>

</form>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>

    $( document ).ready(function() {
        if (readCookie('cookie-approval-status') != 'true') {
            submit.prop('disabled', true)
            $('#form__message').append('<p class="warning">Cookie consent must be accepted to get in touch, you can either clear your cookies to accept them or reach out directly through social media.</p>')
        }
    });

    const submit = $('#submit')
    const name = $('#nameInput')
    const phone = $('#phoneInput')
    const email = $('#emailInput')
    const message = $('#messageInput')
    const statusMessage = $('#form__message')

    function validateForm(){
        var error = ""
        $('#form__message').empty()

        // Check name
        if($('#nameInput').length <= 0 || !($('#nameInput').val().match(/^[A-Za-z ]+$/))){
            error += '<p class="error">Name has failed validation checks!</p>'
        }

        // Check phone
        if($('#phoneInput').val() > 0 && !($('#phoneInput').val().match(/^[0-9 +]+$/))){
            error += '<p class="error">Phone number isn\'t in a valid format!</p>'
        }

        // Check email
        if(!($('#emailInput').val().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))){
            error += '<p class="error">Email address is invalid!</p>'
        }

        if (error.length > 0){
            $('#form__message').append(error)
        } else {
            submitForm()
        }
    }

    function submitForm(){
        $('#form__message').empty()
        axios.post('https://fuucfgr9t6.execute-api.eu-west-2.amazonaws.com/prod/', {
                name: $('#nameInput').val(),
                phone: $('#phoneInput').val(),
                email: $('#emailInput').val(),
                message: $('#messageInput').val(),
                token: document.querySelector('#contact-form textarea[name=\'g-recaptcha-response\']').value
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            }).then(function(response) {
                $('#form__message').html('<p class="success">Message sent successfully!</p>')
                submit.prop('disabled', true);
            }).catch(function(error) {
                 $('#form__message').append('<p class="error">Something didn\'t go quite right there... Message failed to send!</p>')
                submit.prop('disabled', true);
        });
    }

</script>