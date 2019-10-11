$(document).ready(function() {
  // initialize dropdown
  // $(".collapsible").collapsible();
  // Materialize code to add data for autocomplete search.
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

});
