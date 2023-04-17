// Wait for the document to be loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {
  // Get the subscribe form element
  const subscribeForm = document.getElementById('subscribe-form');

  // Attach a submit event listener to the form
  subscribeForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email input field and the error message element
    const emailInput = subscribeForm.querySelector('input[name="email"]');
    const errorMessage = subscribeForm.querySelector('.error-message');

    // Validate the email address using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      // If the email is not valid, display an error message and return
      errorMessage.textContent = 'Please enter a valid email address';
      return;
    }

    // If the email is valid, clear the error message and submit the form
    errorMessage.textContent = '';
    subscribeForm.submit();
  });
});
