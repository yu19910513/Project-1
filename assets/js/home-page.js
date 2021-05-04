// Event listeners for homepage (index.html).
  //flag buttons
  var stateNameArr = [];

  $('.eventBtn').on("click", function(event) {
    var stateName = event.target.value;
    console.log(event.target.value);
    localStorage.setItem('stateVisited', stateName)
    // window.location.href = 'page2.html';
    stateNameArr.push(stateName);
    localStorage.setItem('stateVisitedArr', JSON.stringify(stateNameArr));

  })

  //dropdown list
  // $('a').on("click", function(event) {
  //   var stateName = event.target.value;
  //   console.log(event.target.value);
  //   localStorage.setItem('stateVisited', stateName)
  //   stateNameArr.push(stateName);
  //   localStorage.setItem('stateVisitedArr', JSONstringify(stateNameArr))
    
  // });

  $('.displaySearchHistory').on("click", function(stateVisitedArr){
    var travelLocations = JSON.parse(localStorage.getItem('stateVisitedArr'));
    console.log(travelLocations);
    for (var i=0; i < travelLocations.length; i++){
       var travelListItem = $('li').text(travelLocations[i]);
      $('#searchHistory').append(travelListItem);
    } 
  
  })



