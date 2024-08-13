// Signup Form
const signupForm = document.getElementById("signupForm");
const signupErrorMessage = document.querySelector(".signup-error-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Simulate some validation
  const signupPass = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("cPassword").value;

  if (signupPass !== confirmPassword) {
    errorMessage.textContent = "Please enter your password again";
    errorMessage.style.display = "block"; // Show the error message
    return; // Exit the function if there are errors
  }

  // Assuming successful login, you can redirect the user after validation
  // Replace with your actual logic for handling successful login (e.g., sending data to server)
  window.location.href = "data-profile.html"; // Redirect to profile page
});

// Login Form
const loginForm = document.getElementById("loginForm");
const errorMessage = document.querySelector(".error-message");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Simulate some validation
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    errorMessage.textContent = "Please fill in all fields";
    errorMessage.style.display = "block"; // Show the error message
    return; // Exit the function if there are errors
  }

  // Assuming successful login, you can redirect the user after validation
  // Replace with your actual logic for handling successful login (e.g., sending data to server)
  window.location.href = "profile.html"; // Redirect to profile page
});

// Handle the image upload
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Upload profile picture
    let file = document.getElementById("profilePicture").files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profilePictureURL").value = e.target.result;
        // Submit the form data
        // You can add your form submission code here
      };
      reader.readAsDataURL(file);
    }
  });

// API Fetshing
let apiKey = "L3CXnXFXDdyk1eD+K2XfaQ==TDhBI3PTpeTCQDn1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
var query = "1lb brisket and fries";
console.log();
// $.ajax({
//   method: "GET",
//   url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
//   headers: { "X-Api-Key": "L3CXnXFXDdyk1eD+K2XfaQ==TDhBI3PTpeTCQDn1" },
//   contentType: "application/json",
//   success: function (result) {
//     console.log(result);
//   },
//   error: function ajaxError(jqXHR) {
//     console.error("Error: ", jqXHR.responseText);
//   },
// });
