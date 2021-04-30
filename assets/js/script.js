function input (){
    var country = $('.input').val(); // the input value of text will be use for API fetch
    url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="+country+"&exintro=1";
    // url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+country+"&format=json";
    fetch(url)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
          console.log(data);
          $('.text').text()
        });}
        var btn = $('.searchBtn');
        btn.on('click', input); // when button was clicked
