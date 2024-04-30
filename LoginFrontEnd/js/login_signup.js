document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // Check for token on page load
    // const token = sessionStorage.getItem('token');
    // if (token) {
    //     window.location.href = '/dashboard.html';
    // }

    document.querySelector('nav a[href="#login"]').addEventListener('click', function(event) {
        event.preventDefault();
        toggleForm('login');
    });

    document.querySelector('nav a[href="#signup"]').addEventListener('click', function(event) {
        event.preventDefault();
        toggleForm('signup');
    });

    function toggleForm(formType) {
        const loginContainer = document.getElementById("login");
        const signupContainer = document.getElementById("signup");
        
        if (formType === "login") {
            loginContainer.classList.add("active");
            signupContainer.classList.remove("active");
        } else if (formType === "signup") {
            signupContainer.classList.add("active");
            loginContainer.classList.remove("active");
        }
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = md5(loginForm.querySelector('input[type="password"]').value);

        const data = {
            username: username,
            password: password // Assuming you're using the md5 library for hashing
        };

        fetch('http://localhost:3000/api/login/4d1c33e5-b7dc-4814-ba35-5c72d80f8f4f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns a JWT token
            const token = data.token;

            // Store the token in session storage
            sessionStorage.setItem('token', token);

            console.log("username:"+username);
            console.log("password:"+password);
            console.log("token:"+token);
            console.log(data);

            console.log(sessionStorage.getItem('token'))
            // Redirect to a dashboard or home page
            // window.location.href = '/dashboard.html'; // Change the URL as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message to the user
        });
    });

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Handle signup logic
        console.log("Signup form submitted");
    });
});
