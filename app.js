document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const messageBox = document.getElementById('messageBox');

    messageBox.style.display = 'none';

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const queryType = document.querySelector('input[name="query-type"]:checked');
        const message = document.getElementById('message');
        const consent = document.getElementById('consent');

        let isValid = true;

        if (!firstName.value) {
            showError(firstName, 'This field is required');
            isValid = false;
        } else {
            clearError(firstName);
        }

        if (!lastName.value) {
            showError(lastName, 'This field is required');
            isValid = false;
        } else {
            clearError(lastName);
        }

        if (!email.value) {
            showError(email, 'This field is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }

        if (!queryType) {
            showError(document.getElementById('query-type-error'), 'Please select a query type');
            isValid = false;
        } else {
            clearError(document.getElementById('query-type-error'));
        }

        if (!message.value) {
            showError(message, 'This field is required');
            isValid = false;
        } else {
            clearError(message);
        }

        if (!consent.checked) {
            showError(consent, 'To submit this form, please consent to being contacted');
            isValid = false;
        } else {
            clearError(consent);
        }

        if (isValid) {
            
            messageBox.classList.remove('hidden');
            messageBox.style.display = 'block';

            setTimeout(function() {
                messageBox.style.display = 'none';
            }, 5000);
        
            form.reset();
        }
    });

    function showError(element, message) {
        let errorElement;
        if (element.type === 'checkbox' || element.type === 'radio') {
            errorElement = document.getElementById(element.id + '-error');
        } else {
            errorElement = document.createElement('small');
            errorElement.classList.add('error-message');
            errorElement.style.color = 'red';
            if (element.nextElementSibling) {
                errorElement = element.nextElementSibling;
            } else {
                element.parentNode.insertBefore(errorElement, element.nextSibling);
            }
            element.style.border = '2px solid #FFCCCC';
        }
        errorElement.textContent = message;
        element.classList.add('error');
    }

    function clearError(element) {
        let errorElement;
        if (element.type === 'checkbox' || element.type === 'radio') {
            errorElement = document.getElementById(element.id + '-error');
        } else {
            errorElement = element.nextElementSibling;
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
        element.classList.remove('error');
        if (element.type !== 'radio') {
            element.style.border = '';
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const radioButtons = document.querySelectorAll('input[name="query-type"]');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            radioButtons.forEach(rb => rb.parentElement.classList.remove('selected'));
            if (radio.checked) {
                radio.parentElement.classList.add('selected');
            }
        });
    });
});
