$(document).ready(function () {
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
  $.ajax("/api/", {
    type: "GET"
  }).then(results => {
    $("input.autocomplete").autocomplete({
      data: results,
      limit: 5,
      onAutocomplete: function () {
        let searchTerm = $("#autocomplete-input-small").val();
        window.location.replace("/results/" + searchTerm);
      }
    });
  });
  $("#re-search").on("click", () => {
    let searchTerm = $("#autocomplete-input-small").val();
    window.location.replace("/results/" + searchTerm);
  });
});

$("#writereview").on("click", () => {
  $(".modal").modal("open");
});
$(".reviewmodal-close").on("click", () => {
  $(".modal").modal("close");
});
$(".reviewmodal-submit").on("submit", () => {
  event.preventDefault();
  let reviewInfo = {
    id: req.session.userId,
    reviewRating: $(".rating").val(),
    reviewParagraph: $("#userreview").val(),
    beerid: $("#writereview").data("id")
  };
  $.post("/api/newreview", reviewInfo, () => {
    $(".modal").modal("close");
  });
});
