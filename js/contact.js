document.addEventListener('DOMContentLoaded', function () {
    // Contact form validation and friendly feedback
    const form = document.getElementById('contactForm');
    const messageBox = document.getElementById('formMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message) {
            messageBox.textContent = 'Please fill in every field before sending your message.';
            messageBox.className = 'form-message error';
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            messageBox.textContent = 'Please enter a valid email address.';
            messageBox.className = 'form-message error';
            return;
        }

        if (!/^\d+$/.test(phone)) {
            messageBox.textContent = 'Phone number should contain only digits.';
            messageBox.className = 'form-message error';
            return;
        }

        messageBox.textContent = 'Thanks for reaching out. Your message has been received.';
        messageBox.className = 'form-message success';
        form.reset();
    });
});
