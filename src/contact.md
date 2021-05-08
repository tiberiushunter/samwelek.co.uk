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
  <textarea rows="6" id="messageInput" name="message" required></textarea>

  <button type="submit"
        id="submit"
        class="btn btn-submit g-recaptcha"
        data-sitekey="6LcrQGwaAAAAAODk2BdrQJSlYMj90B4kXlRjbO4S"
        data-callback="submitForm"
        >Submit</button>

  <div id="form__message" style="margin-top:20px;text-align:center"></div>

</form>

<script src="/assets/js/axios.min.js"></script>
<script src="/assets/js/contact.js"></script>
