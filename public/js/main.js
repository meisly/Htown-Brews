$(document).ready(function() {
  //initialize login modal
  $(".modal").modal();
  $(".login-modal-trigger").on("click", () => {
    $(".login-modal").modal("open");
  });
  $(".modal-close").on("click", () => {
    $(".modal").modal("close");
  });
  $(".modal-login").on("click", event => {
    event.preventDefault();
    let userInfo = {
      userName: $("#name").val(),
      password: $("#pass").val()
    };
    $.post("/login", userInfo, () => {
      $(".modal").modal("close");
      window.location.reload();
    });
  });
});
