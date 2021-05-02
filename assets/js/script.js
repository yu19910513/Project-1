// DC - https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function onChange() {
localStorage.setItem('item', $('.selector').val());
window.location.href = 'page2.html';
};

input();

function input (){
    // TODO: DC - Perhaps we should call this state, because they are states not countries?
    var country = localStorage.getItem('item');
    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+country+"&format=json&origin=*";
  fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
          var title = data.query.search[0].title;
          var pageId = data.query.search[0].pageid;
          fetch('http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles='+title+'&exintro=1&origin=*')
          .then(function (responseAgain) {
            return responseAgain.json();
          })
          .then(function (dataAgain) {
            $('.info').append(dataAgain.query.pages[pageId].extract);
            $('#header').text(title)
          })
        })

    // DC - This is also the logical place to fetch the images from pixabay.com/api ...
    const url2 = `https://pixabay.com/api?q=${country}&key=21438663-60940dce2a3b8f288719617da&lang=en&image_type=all&orientation=horizontal&safesearch=true&per_page=5&category=backgrounds,nature,science,education,places,animals,sports,buildings`;

    fetch(url2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const statePictureListEl = document.getElementById('statePictureList');
        removeAllChildNodes(statePictureListEl);
        for (let i = 0; i < data.hits.length; i++) {
          const imgEl = document.createElement('img');
          imgEl.setAttribute('src', data.hits[i].webformatURL);
          imgEl.setAttribute('alt', `State of ${country} picture`);
          imgEl.setAttribute('uk-cover', '');
          const listItemEl = document.createElement('li');
          listItemEl.appendChild(imgEl);
          statePictureListEl.appendChild(listItemEl);
        }
      });
}


        $('button').on("click", function() {
            localStorage.setItem('item', $(this).val())
            console.log($(this).val());
            window.location.href = 'page2.html';
        })
