// DC - https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

input();

function input (){
    var state = localStorage.getItem('item');
    weather(state);
    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+state+"&format=json&origin=*";
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
    const url2 = `https://pixabay.com/api?q=${state}&key=21438663-60940dce2a3b8f288719617da&lang=en&image_type=all&orientation=horizontal&safesearch=true&per_page=5&category=backgrounds,nature,science,education,places,animals,sports,buildings`;

    fetch(url2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const statePictureListEl = document.getElementById('statePictureList');
        if (data.hits.length > 0) {
          removeAllChildNodes(statePictureListEl);
          for (let i = 0; i < data.hits.length; i++) {
            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', data.hits[i].webformatURL);
            imgEl.setAttribute('alt', `State of ${state} picture`);
            imgEl.setAttribute('uk-cover', '');
            const listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            statePictureListEl.appendChild(listItemEl);
          }
        }
      });
}

        $('.eventBtn').on("click", function(event) {
            var stateSelected = event.target.value;
            console.log(event.target.text);
            localStorage.setItem('item', stateSelected)
            window.location.href = 'page2.html';
        })

        $('a').on("click", function(event) {
          var stateSelected = event.target.text;
          console.log(event.target.text);
          localStorage.setItem('item', stateSelected)
        });


        $('.gobackbtn').on("click", function() {
          window.location.href = 'index.html';
      })

// weather
//event function


var rain = '🌧';
var sun = '☀️';
var cloud = '🌥';
var snow = '🌨';

function weather(state) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q='+state+ '&appid=c24b1e69b12182932011de7f1b2d7c83';
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        generalInfo(data);
        });

};

function generalInfo(data) {
        var temp = Math.round(data.main.temp-273.15);
        var tempF = Math.round((data.main.temp-273.15)*1.8 + 32);
        $('.name').text(data.name);
        $('.temp').text("Temperature: " + temp + "\xB0C/ " + tempF + "\xB0F");
        var rex = data.weather[0].description.toString().split(' ');
        if (rex.includes('rain')) {
            $('.condition').text(data.weather[0].description + rain);
        } else if (rex.includes('clear')) {
            $('.condition').text(data.weather[0].description + sun);
        } else if (rex.includes('snow')) {
            $('.condition').text(data.weather[0].description + snow);
        } else if (rex.includes('clouds')) {
            $('.condition').text(data.weather[0].description + cloud);
        } else {
            $('.condition').text(data.weather[0].description)
        };
};

//time
var cityArray = ['America/New_York', 'America/Los_Angeles', 'America/Phoenix', 'America/Boise', 'America/Kentucky/Louisville', 'America/Anchorage', 'Pacific/Honolulu']
var cT = ["Alabama","Illinois" , "Iowa","Minnesota","Mississippi" ,"Oklahoma" ,"Texas" ,"Missouri" ,"South Dakota" , "Wisconsin" ,"Kansas","Kentucky","Louisiana","Nebraska","North Dakota"];
var mT = ["Colorado" ,"Idaho","Montana", "Nevada",  "Wyoming" ,"New Mexico" ,"Utah" ,];
var eT = ["Arkansas","Connecticut","Delaware" ,"Ohio","Florida" , "Pennsylvania" ,"Georgia (U.S. state)","Indiana" ,"Maine" ,"Maryland","West Virginia","Massachusetts","Vermont" ,"Virginia" ,"Michigan", "New Hampshire","New Jersey" ,"New York" ,"Rhode Island" ,"South Carolina","Tennessee","North Carolina",]
var pST = ["California","Oregon" , "Washington (state)" ]
function time(){
  var d = new Date();
  for (let j = 0; j < cT.length; j++) {
  for (let k = 0; k < mT.length; k++) {
  for (let l = 0; l < eT.length; l++) {
  for (let p = 0; p < pST.length; p++) {
  if (localStorage.getItem('item') === 'Arizona' ){
  $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[2] }))}
  if (localStorage.getItem('item') === cT[j]){
  $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[4] }))}
  if (localStorage.getItem('item') === mT[k]){
    $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[3] }))}
  if (localStorage.getItem('item') === eT[l]){
    $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[0] }))}
  if (localStorage.getItem('item') === pST[p]){
    $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[1] }))}
  if(localStorage.getItem('item') === 'Hawaii'){
    $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[6] }))}
 if (localStorage.getItem('item') === 'Alaska'){
    $('.currenttime').text(d.toLocaleString('en-US', { timeZone: cityArray[5] }))}
  }
  }
  }
  }

};

setInterval(time, 1000);

        // Trying out SVG https://www.amcharts.com/docs/v4/

        // Create map instance
        // var chart = am4core.create("chartdiv", am4maps.MapChart);

        // // Set map definition
        // chart.geodata = am4geodata_usaLow;

        // // Set projection
        // chart.projection = new am4maps.projections.AlbersUsa();

        // // Series for World map
        // var series1 = chart.series.push(new am4maps.MapPolygonSeries());
        // series1.name = "United States";
        // series1.useGeodata = true;

        // var series1Template = series1.mapPolygons.template;
        // series1Template.tooltipText = "{name}";
        // series1Template.fill = am4core.color("#74B266");
        // series1Template.propertyFields.disabled = "disabled";

        // var hs = series1Template.states.create("hover");
        // hs.properties.fill = am4core.color("#367B25");

        // // Add zoom control
        // chart.zoomControl = new am4maps.ZoomControl();
