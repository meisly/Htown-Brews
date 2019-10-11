$(document).ready(function() {
  // initialize dropdown
  $(".collapsible").collapsible();
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
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

  // review code
  $(".rating-system4").on("click", ".ratinglabel", event => {
    //sets rating value to parent div for later
    $(".rating-system4").data("rating", $(event.target).data("star"));
  });
  $("#writereview").on("click", () => {
    $(".modal").modal("open");
  });
  $(".reviewmodal-close").on("click", () => {
    $(".modal").modal("close");
  });
  $(".reviewmodal-submit").on("click", () => {
    event.preventDefault();
    let reviewInfo = {
      id: $("#user-info").data("userid"),
      reviewRating: $(".rating-system4").data("rating"),
      reviewParagraph: $("#userreview").val(),
      beerid: $("#writereview").data("id")
    };
    console.table(reviewInfo);
    $.ajax({
      url: "/api/beer/" + reviewInfo.beerid,
      method: "PUT"
    }).then(result => {
      $.post("/api/review", reviewInfo, () => {
        $(".modal").modal("close");
      });
    });
  });
});
