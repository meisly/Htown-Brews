$(document).ready(function () {
  // Materialize code to add data for autocomplete search.
  // Replace Data with our data from beers db
  $(".modal").modal();

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
  //beerQuery($(".beer-body").data("id")); //will calll on page load and query reviews
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
  });
}
function getReviewAuthors(data) {
  //once we have both username info and the review info we can append the review
  $.ajax(`api/user/${data.userId}`, {
    type: "GET"
  }).then(results => {
    appendReviews(data, results.username);
  });
}
function appendReviews(data, reviewAuthor) {
  //creates the review div then appends it
  let reviewString = "<div class='reviewBlock'><div class='stars'></div>";
  reviewString += `<h2> By: ${reviewAuthor} </h2>`;
  reviewString += `<p> ${data.review_paragraph} </p>`;
  $(reviewString).appendTo(".reviews-list");
}

// function userClass() {
//   this.userInfo = this.findUserInfo();
//   this.findUserInfo = () => {

//   }
// }
