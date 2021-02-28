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

  <button type="submit" class="btn btn-submit" onclick="submitForm()">Submit</button>

</form>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    const submit = document.querySelector('#submit')
    const name = document.querySelector('#nameInput')
    const phone = document.querySelector('#phoneInput')
    const email = document.querySelector('#emailInput')
    const message = document.querySelector('#messageInput')
  
    function submitForm(){
        axios.post('https://fuucfgr9t6.execute-api.eu-west-2.amazonaws.com/prod/', {
            name: name.value,
            phone: phone.value,
            email: email.value,
            message: message.value,
            token: '6Leix2saAAAAANlWh8opO9TBX3352lxyt9P4KYFn'
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }

</script>