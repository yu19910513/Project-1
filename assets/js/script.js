function input (){
    // $('.selector').append($('<option>').attr('value', $('.input').val()).text($('.input').val()));
    var country = $('.selector').val(); // the input value of text will be use for API fetch
    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+country+"&format=json";
    fetch(url)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
          console.log(data);
          var title = data.query.search[0].title;
          var pageId = data.query.search[0].pageid;
          fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles='+title+'&exintro=1')
          .then(function (responseAgain) {
            console.log(responseAgain);
            return responseAgain.json();
          })
          .then(function (dataAgain) {
            console.log(dataAgain);
            // console.log(dataAgain.query.pages + "." + pageId);
            $('.text').append(dataAgain.query.pages[pageId].extract)
          })
        });}
// var btn = $('.searchBtn');
// btn.on('click', input); // when button was clicked

function onChange() {
  $('.text').text("");
  $('.stateName').text(' - '+ $('.selector').val())
  input();
};
