$(document).ready(function () {
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
  $("input.autocomplete").autocomplete({
    data: {
      Apple: null,
      Microsoft: null,
      Google: null
    }
  });
});
