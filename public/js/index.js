$(document).ready(function () {
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
  $.ajax("api/", {
    type: "GET"
  }).then(results => {
    console.log(results);
    $("input.autocomplete").autocomplete({
      data: results
    });
  });
});
