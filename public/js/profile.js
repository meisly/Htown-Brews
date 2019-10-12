$(document).ready(function() {
  // initialize dropdown
  // $(".collapsible").collapsible();
  // Materialize code to add data for autocomplete search.
  appendUserImage($("#user-info").data("userid"));
  $.ajax("/api/", {
    type: "GET"
  }).then(results => {
    $("input.autocomplete").autocomplete({
      data: results,
      limit: 5,
      onAutocomplete: function() {
        let searchTerm = $("#autocomplete-input-small").val();
        window.location.replace("/results/" + searchTerm);
      }
    });
  });
  // search button
  $("#re-search").on("click", () => {
    let searchTerm = $("#autocomplete-input-small").val();
    window.location.replace("/results/" + searchTerm);
  });
  $(".profile-btn").on("click", event => {
    event.preventDefault();
    let ajaxVar = {
      newUrl: $("#profile-url").val()
    };
    let userID = $("#user-info").data("userid");
    $.ajax("/api/user/" + userID, {
      type: "PUT",
      data: ajaxVar
    })
      .then(results => {
        let userID = $("#user-info").data("userid");
        window.location.href = "/user/" + userID;
      })
      .catch(() => {
        let userID = $("#user-info").data("userid");
        window.location.href = "/user/" + userID;
      });
  });
  function appendUserImage(userId) {
    $.get("/api/user/" + userId, result => {
      let userImage =
        "<img class='userImage' src='" + result.profileUrl + "' alt='profile'>";
      $(userImage).appendTo(".profile-image-zone");
    }).catch(() => {

      let userID = $("#user-info").data("userid");
      window.location.href = "/user/" + userID;
    });
  }
});
