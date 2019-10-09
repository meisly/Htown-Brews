$(document).ready(function() {
  //initialize login modal
  $(".modal").modal();
  $(".modal-trigger").on("click", () => {
    $(".modal").modal("open");
  });
  $(".modal-close").on("click", () => {
    $(".modal").modal("close");
  });
  $(".modal-login").on("click", event => {
    event.preventDefault();
    console.log("click");
    let userInfo = {
      userName: $("#name").val(),
      password: $("#pass").val()
    };
    console.log(userInfo);
    $.post("/login", userInfo, () => {
      console.table(userInfo);
      $(".modal").modal("close");
    });
  });
});
