// function onChange() {
// localStorage.setItem('item', $('.selector').val());
// window.location.href = 'page2.html';
// };

input();

function input (){
    var state = localStorage.getItem('item');
    url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+state+"&format=json&origin=*";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
          var title = data.query.search[0].title;
          var pageId = data.query.search[0].pageid;
          fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles='+title+'&exintro=1&origin=*')
          .then(function (responseAgain) {
            return responseAgain.json();
          })
          .then(function (dataAgain) {
            $('.info').append(dataAgain.query.pages[pageId].extract);
            $('#header').text(title)
          })
        })
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


