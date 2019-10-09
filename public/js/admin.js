$(document).ready(function() {
  $("#add-beer-btn").on("click", () => {
    cwindow.location.replace("/admin/addBeer");
  });
  $(".add-Beer-btn").on("click", () => {
    event.preventDefault();
    console.log("click");
    let dataObj = {
      name: $("#beer-name").val(),
      type: $("#beer-type").val(),
      description: $("#beer-description").val(),
      brewrey: $("#brewrey").val()
    };
    postBeer(dataObj);
    window.location.href = "/";
  });
});
function postBeer(modalObj) {
  $.post("/api/beer", modalObj);
}
