var signupForm = document.getElementById("signupForm");
var loginForm = document.getElementById("loginForm");

var topErrorMessageDiv = document.querySelector(
  ".formWrapper .topErrorMessage"
);
var topErrorMessageText = document.querySelector(
  ".formWrapper .topErrorMessage strong"
);
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateSignupForm();
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateLoginForm();
});

// validate  signup form function
var validateSignupForm = async () => {
  var error = false;
  var userName = document.querySelector(".signup .userName");
  var email = document.querySelector(".signup .email");
  var phoneNumber = document.querySelector(".signup .phoneNumber");
  var password = document.querySelector(".signup .password");

  var userNameError = document.querySelector(".signup .userNameError");
  var emailError = document.querySelector(".signup .emailError");
  var phoneNumberError = document.querySelector(".signup .phoneNumberError");
  var passwordError = document.querySelector(".signup .passwordError");

  userNameError.innerHTML = "";
  emailError.innerHTML = "";
  passwordError.innerHTML = "";
  phoneNumberError.innerHTML = "";

  //   username validation
  if (!/^ak@45\(\w+\)$/.test(userName.value)) {
    userNameError.innerHTML =
      "Username should be of this pattern : ak@45(Given name)";
    error = true;
  }

  //   email validation
  if (!/@.*\..*/.test(email.value)) {
    emailError.innerHTML = "Email should contain this ‘@’";
    error = true;
  }

  //   phoneNumber validation
  if (!/^\d{10}$/.test(phoneNumber.value)) {
    phoneNumberError.innerHTML = "Phone Number should be exact 10 digit";
    error = true;
  }

  //   password validation

  if (!/^.{8,}$/.test(password.value)) {
    passwordError.innerHTML =
      "password must be greater or equal to  8 character";
    error = true;
  }
  if (!/.*[A-Z].*/.test(password.value)) {
    passwordError.innerHTML =
      "Alphabetic chracters (a-z) must contain with capital letters.";
    error = true;
  }

  if (!/.*[0-9].*/.test(password.value)) {
    passwordError.innerHTML = "Password must contain numeric characters (0-9)";
    error = true;
  }
  if (!/^[$%@#^].*$/.test(password.value)) {
    passwordError.innerHTML = "password must be start with '$','%','@','#','^'";
    error = true;
  }
  if (!error) {
    var data = {
      userName: userName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      password: password.value,
    };
    submitSignupForm(data);
  }
};

// validate login form function
var validateLoginForm = () => {
  var email = document.querySelector(".login .email");
  var password = document.querySelector(".login .password");
  var error = false;
  var emailError = document.querySelector(".login .emailError");
  var passwordError = document.querySelector(".login .passwordError");
  emailError.innerHTML = "";
  passwordError.innerHTML = "";
  if (!email.value) {
    emailError.innerHTML = "Email is required";
    error = true;
  }
  if (!password.value) {
    passwordError.innerHTML = "Password is required";
    error = true;
  }
  if (!error) {
    var data = {
      email: email.value,
      password: password.value,
    };
    submitLoginForm(data);
  }
};

// submit signup form function
var submitSignupForm = async (obj) => {
  var loadingBtn = document.querySelector(".signup .loadingBtn");
  var signupBtn = document.querySelector(".signup .signupBtn");
  loadingBtn.style.display = "flex";
  signupBtn.style.display = "none";
  topErrorMessageDiv.style.display = "none";
  try {
    var fetchData = await fetch("http://localhost:8000/user/signup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    var data = await fetchData.json();
    console.log(data);
    if (data.status == "success") {
      signupForm.reset();
      alert("signup successfull ");
    } else {
      topErrorMessageDiv.style.display = "block";
      topErrorMessageText.innerHTML = data.message;
    }
  } catch (e) {
    topErrorMessageDiv.style.display = "block";
    topErrorMessageText.innerHTML = "could not connect to the server";
  }
  loadingBtn.style.display = "none";
  signupBtn.style.display = "block";
};

// sumit login form function
var submitLoginForm = async (obj) => {
  var loadingBtn = document.querySelector(".login .loadingBtn");
  var loginBtn = document.querySelector(".login .loginBtn");
  loadingBtn.style.display = "flex";
  loginBtn.style.display = "none";
  topErrorMessageDiv.style.display = "none";
  try {
    var fetchData = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    });
    var data = await fetchData.json();
    console.log(data);
    if (data.status == "success") {
      alert("login successfull");
    } else {
      topErrorMessageDiv.style.display = "block";
      topErrorMessageText.innerHTML = data.message;
    }
  } catch (e) {
    console.log(e);
    topErrorMessageDiv.style.display = "block";
    topErrorMessageText.innerHTML = "could not connect to the server";
  }
  loadingBtn.style.display = "none";
  loginBtn.style.display = "block";
};
