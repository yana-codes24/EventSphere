/* =========================================================
   EVENTSPHERE
   CLIENT-SIDE FORM VALIDATION
   Registration Form
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const registrationForm = document.getElementById("registrationForm");

    if (!registrationForm) {
        return;
    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    registrationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -------------------------------------------------
           GET FORM VALUES
        ------------------------------------------------- */

        const fullName = document
            .getElementById("fullName")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const phone = document
            .getElementById("phone")
            .value
            .trim();

        const eventSelect = document
            .getElementById("eventSelect")
            .value;

        const participants = document
            .getElementById("participants")
            .value;


        /* -------------------------------------------------
           CLEAR PREVIOUS ERRORS
        ------------------------------------------------- */

        clearErrors();


        let isValid = true;


        /* =================================================
           FULL NAME VALIDATION
        ================================================= */

        if (fullName === "") {

            showError(
                "fullName",
                "Please enter your full name."
            );

            isValid = false;

        } else if (fullName.length < 3) {

            showError(
                "fullName",
                "Name must contain at least 3 characters."
            );

            isValid = false;

        } else if (!/^[A-Za-z ]+$/.test(fullName)) {

            showError(
                "fullName",
                "Name should contain letters and spaces only."
            );

            isValid = false;
        }


        /* =================================================
           EMAIL VALIDATION
        ================================================= */

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            showError(
                "email",
                "Please enter your email address."
            );

            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                "email",
                "Please enter a valid email address."
            );

            isValid = false;
        }


        /* =================================================
           PHONE VALIDATION
        ================================================= */

        const phonePattern =
            /^[0-9]{10}$/;


        if (phone === "") {

            showError(
                "phone",
                "Please enter your phone number."
            );

            isValid = false;

        } else if (!phonePattern.test(phone)) {

            showError(
                "phone",
                "Phone number must contain exactly 10 digits."
            );

            isValid = false;
        }


        /* =================================================
           EVENT VALIDATION
        ================================================= */

        if (eventSelect === "") {

            showError(
                "eventSelect",
                "Please select an event."
            );

            isValid = false;
        }


        /* =================================================
           PARTICIPANT VALIDATION
        ================================================= */

        if (participants === "") {

            showError(
                "participants",
                "Please select the number of participants."
            );

            isValid = false;
        }


        /* =================================================
           IF FORM IS INVALID
        ================================================= */

        if (!isValid) {

            const firstError =
                registrationForm.querySelector(".form-error");

            if (firstError) {

                firstError
                    .previousElementSibling
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
            }

            return;
        }


        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        showSuccessMessage();

    });


    /* =====================================================
       ERROR DISPLAY FUNCTION
    ===================================================== */

    function showError(fieldId, message) {

        const field =
            document.getElementById(fieldId);

        if (!field) {
            return;
        }


        field.classList.add("input-error");


        const error =
            document.createElement("small");

        error.className = "form-error";

        error.textContent = message;


        field.insertAdjacentElement(
            "afterend",
            error
        );
    }


    /* =====================================================
       CLEAR ERRORS
    ===================================================== */

    function clearErrors() {

        const errors =
            registrationForm.querySelectorAll(
                ".form-error"
            );

        errors.forEach(function (error) {
            error.remove();
        });


        const fields =
            registrationForm.querySelectorAll(
                ".input-error"
            );

        fields.forEach(function (field) {
            field.classList.remove(
                "input-error"
            );
        });


        const success =
            registrationForm.querySelector(
                ".form-success"
            );

        if (success) {
            success.remove();
        }
    }


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    function showSuccessMessage() {

        const success =
            document.createElement("div");

        success.className =
            "form-success";

        success.innerHTML = `
            <strong>Registration Successful!</strong>
            <span>
                Thank you for registering with EventSphere.
                Your event registration has been received.
            </span>
        `;


        registrationForm.prepend(success);


        registrationForm.reset();


        success.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

});