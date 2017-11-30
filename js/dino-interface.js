
$(document).ready(function() {

  $('#generate').click(function() {
    let paragraphs = $(`#paragraphs`).val();
    let words = $(`#words`).val();
    $('#paragraphs').val("");
    $('#words').val("");

      let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${paragraphs}&words=${words}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      body.forEach(function(sentence){
        sentence.forEach(function(word){
          $('#output').append(word + " ");
          });
          $('#output').append("<br>"+"<br>");
        });
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
