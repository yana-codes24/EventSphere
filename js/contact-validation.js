
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        // NAME VALIDATION
        if (name === "") {
            showError("name", "Please enter your full name.");
            isValid = false;
        } else if (name.length < 3) {
            showError("name", "Name must contain at least 3 characters.");
            isValid = false;
        } else if (!/^[A-Za-z ]+$/.test(name)) {
            showError("name", "Name should contain letters and spaces only.");
            isValid = false;
        }

        // EMAIL VALIDATION
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showError("email", "Please enter your email address.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError("email", "Please enter a valid email address.");
            isValid = false;
        }

        // SUBJECT VALIDATION
        if (subject === "") {
            showError("subject", "Please select a subject.");
            isValid = false;
        }

        // MESSAGE VALIDATION
        if (message === "") {
            showError("message", "Please enter your message.");
            isValid = false;
        } else if (message.length < 10) {
            showError("message", "Message must contain at least 10 characters.");
            isValid = false;
        }

        if (!isValid) {
            const firstError = contactForm.querySelector(".form-error");

            if (firstError) {
                firstError.previousElementSibling?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            return;
        }

        showSuccessMessage();
    });

    // DISPLAY ERROR
    function showError(fieldId, message) {

        const field = document.getElementById(fieldId);

        if (!field) {
            return;
        }

        field.classList.add("input-error");

        const error = document.createElement("small");
        error.className = "form-error";
        error.textContent = message;

        field.insertAdjacentElement("afterend", error);
    }

    // CLEAR PREVIOUS ERRORS
    function clearErrors() {

        contactForm.querySelectorAll(".form-error").forEach(function (error) {
            error.remove();
        });

        contactForm.querySelectorAll(".input-error").forEach(function (field) {
            field.classList.remove("input-error");
        });

        const success = contactForm.querySelector(".form-success");

        if (success) {
            success.remove();
        }
    }

    // DISPLAY SUCCESS MESSAGE
    function showSuccessMessage() {

        const success = document.createElement("div");

        success.className = "form-success";

        success.innerHTML = `
            <strong>Message Sent Successfully!</strong>
            <span>
                Thank you for contacting EventSphere.
                We appreciate your message.
            </span>
        `;

        contactForm.prepend(success);

        contactForm.reset();

        success.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

});
