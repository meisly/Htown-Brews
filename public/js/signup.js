$("#signupbutton")
  .on("click", function(event) {
    event.preventDefault();

    function validateForm() {
      var isValid = true;
      $(".validate").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }

    if (validateForm()) {
      var newUser = {
        username: $("#username").val(),
        email: $("#useremail").val(),
        password: $("#userpassword").val()
      };
      $.post("/api/newUser", newUser, function(data) {});
    } else {
      alert("Please fill out all fields!");
    }
  })
  .then(function() {
    window.location.href = "/";
  });
