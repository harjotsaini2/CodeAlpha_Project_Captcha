document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const prevButtons = document.querySelectorAll("[id^='prevButton']");
    const nextButtons = document.querySelectorAll("[id^='nextButton']");
    const submitButton = document.getElementById("submitButton"); // Assuming you have a submit button with this ID

    let currentPageIndex = 0;
    let generatedCaptcha = ""; // Store generated CAPTCHA here

    function showPage(pageIndex) {
        pages.forEach((page) => {
            page.style.display = "none";
        });
        pages[pageIndex].style.display = "block";
        currentPageIndex = pageIndex;

        if (currentPageIndex === pages.length - 1) {
            // On the last page, generate and display a new CAPTCHA
            generatedCaptcha = generateCaptcha();
            submitButton.style.display = "block";
        } else {
            submitButton.style.display = "none";
        }
    }

    function goToNextPage() {
        if (currentPageIndex < pages.length - 1) {
            showPage(currentPageIndex + 1);
        }
    }

    function goToPrevPage() {
        if (currentPageIndex > 0) {
            showPage(currentPageIndex - 1);
        }
    }

    function generateCaptcha() {
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var captcha = '';
        for (var i = 0; i < 6; i++) {
            captcha += alpha[Math.floor(Math.random() * alpha.length)];
        }
        document.getElementById('capt').value = captcha;
        return captcha; // Return generated CAPTCHA
    }
    
    function validateCaptcha() {
        var enteredCaptcha = document.getElementById('captchaInput').value;
    
        if (enteredCaptcha.toLowerCase() === generatedCaptcha.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    prevButtons.forEach((button) => {
        button.addEventListener("click", goToPrevPage);
    });

    nextButtons.forEach((button) => {
        button.addEventListener("click", goToNextPage);
    });
    
    submitButton.addEventListener("click", function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
    
        // If on the last page, validate the CAPTCHA
        if (currentPageIndex === pages.length - 1) {
            if (!validateCaptcha()) {
                // Show message to enter valid CAPTCHA
                alert("Please enter the correct CAPTCHA code.");
                return; // Do not proceed if CAPTCHA is not valid
            }
        }
    
        // Proceed with form submission
        document.getElementById("surveyForm").submit();
    });

    showPage(currentPageIndex);
});
