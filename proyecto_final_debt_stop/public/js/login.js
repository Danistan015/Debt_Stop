const userInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btnLogin")

loginButton.addEventListener("click", function () {
    user = userInput.value;
    password = passwordInput.value;
    if(user == "admin" && password == "123"){
        window.location = "./menu"
    } else {
        Swal.fire({
            title: "Login Failed",
            text: "Invalid username or password.",
            icon: "error",
            confirmButtonText: "OK"
          });
    }
    
});
