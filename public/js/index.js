$(document).ready(function() {
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
  beerQuery($(".beer-body").data("id")); //will calll on page load and query reviews
});

function beerQuery(id) {
  //queries reviews then queries their user in the getReviewsAuthors based on userId
  $.ajax(`api/review/${id}`, {
    type: "GET"
  }).then(results => {
    console.table(results);
    results.forEach(index => {
      getReviewAuthors(index);
    });
  });
}
function getReviewAuthors(data) {
  //once we have both username info and the review info we can append the review
  $.ajax(`api/user/${data.userId}`, {
    type: "GET"
  }).then(results => {
    appendReviews(data, results[0].username);
  });
}
function appendReviews(data, reviewAuthor) {
  //creates the review div then appends it
  let reviewString = `<div class='reviewBlock'><div class='stars'></div>`;
  reviewString += `<h2> By: ${reviewAuthor} </h2>`;
  reviewString += `<p> ${data.review_paragraph} </p>`;
  $(reviewString).appendTo(".reviews-list");
}
