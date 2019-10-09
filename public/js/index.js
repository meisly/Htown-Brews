$(document).ready(function() {
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
  $.ajax("api/", {
    type: "GET"
  }).then(results => {
    console.log(results);
    $("input.autocomplete").autocomplete({
      data: results,
      limit: 5,
      onAutocomplete: function () {
        let searchTerm = $("#autocomplete-input").val();
        window.location.replace("/results/" + searchTerm);
      }
    });
  });
  $("#main-search").on("click", () => {
    let searchTerm = $("#autocomplete-input").val();
    window.location.replace("/results/" + searchTerm)
  });
  $(".modal-trigger").on("click", () => {
    $(".modal").modal("open");
  });
  $(".modal-close").on("click", () => {
    $(".modal").modal("close");
  });
  $(".modal-login").on("submit", () => {
    event.preventDefault();
    let userInfo = {
      userName: $("#name").val(),
      password: $("#pass").val()
    };
    $.post("/login", userInfo, () => {
      $(".modal").modal("close");
    });
  });
});
// function userClass() {
//   this.userInfo = this.findUserInfo();
//   this.findUserInfo = () => {

//   }
// }
