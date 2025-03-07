document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        // Fix path to login.php - using absolute path from root
        fetch("/Model/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                document.getElementById("error-message").innerText = data.message;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("error-message").innerText = "An error occurred during login.";
        });
    });
});