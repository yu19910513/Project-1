var stateName;
var flowerName;
var butterflyName;
var birdName;
var mammalName;
var treeName;
var capitalName;
var nickName;
var index = 0;
var imageNumber = 0;
var noOfsymbols = 7;
var factImage = [];
var noOfImages = 5;
var stateFlowerEl = document.querySelector(".state-flower");
var stateButterflyEl = document.querySelector(".state-butterfly");
var stateBirdEl = document.querySelector(".state-bird");
var stateCapitalEl = document.querySelector(".state-capital");
var stateMammalEl = document.querySelector(".state-mammal");
var stateTreeEl = document.querySelector(".state-tree");
var stateNickNameEl = document.querySelector(".state-nickname");

// var buttonClickEl = document.querySelectorAll(".state-buttons");

// console.log("buttonClickEl", buttonClickEl);
var symbols = [
  "List_of_U.S._state_and_territory_flowers",
  "List_of_U.S._state_insects",
  "List_of_U.S._state_birds",
  "List_of_U.S._state_mammals",
  "List_of_U.S._state_and_territory_trees",
  "List_of_capitals_in_the_United_States",
  "List_of_U.S._state_and_territory_nicknames",
];

function getInfo(stateName, fact) {
  console.log("%%%%%%%%%%%%%", index);
  fetch(
    `http://en.wikipedia.org/w/api.php?action=parse&page=${fact}&format=json&origin=*`
  )
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      // console.log(typeof data.parse.text["*"]);
      console.log(data);
      console.log(typeof data.parse.text);
      const parser = new DOMParser();
      const htmlString = data.parse.text["*"];
      const doc3 = parser.parseFromString(htmlString, "text/html");
      console.log(doc3);
      var wikiEl = doc3.querySelector(".wikitable");
      if (index === 5) {
        var wikiEl = doc3.querySelector(
          "body > div > table.wikitable.plainrowheaders.sortable"
        );
      }
      console.log(wikiEl);
      //   for (var i = 0; i < wikiEl.children[0].childElementCount; i++) {
      //     var tableRow = wikiEl.children[0].children[i];
      //     for (var j = 0; j < tableRow.childElementCount; j++) {
      //       var tableColumn = tableRow.children[j];
      //       console.log(
      //         "Cell [" + i + "," + j + "] value: " + tableColumn.innerText
      //       );
      //     }
      //   }

      //all rows
      var rows = wikiEl.querySelectorAll("tr");
      console.log(rows);
      //browser thru rows for state look where it starts
      for (i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].textContent.trim() === stateName) {
          console.log("#########################################");
          //   console.log("State Name", rows[i].cells[0].textContent);
          //   console.log("flowername", rows[i].cells[1].textContent);
          console.log("rowno", i);
          console.log(rows[i].cells[0].textContent);
          if (index === 0) {
            // if (rows[i].cells[1].textContent == "")
            flowerName = rows[i].cells[1].textContent;
            stateFlowerEl.textContent = flowerName;
            console.log("flower Name", flowerName);
          } else if (index === 1) {
            butterflyName = rows[i].cells[1].textContent;
            stateButterflyEl.textContent = butterflyName;
            console.log("butterfly", butterflyName);
          } else if (index === 2) {
            birdName = rows[i].cells[1].textContent;
            stateBirdEl.textContent = birdName;
            console.log("bird", birdName);
          } else if (index === 3) {
            console.log(rows[i].cells[1].textContent);
            console.log(rows[i].cells[2].textContent);
            console.log(rows[i].cells[3].textContent);
            console.log(!rows[i].cells[1].textContent);
            if (rows[i].cells[1].textContent) {
              mammalName = rows[i].cells[1].textContent;
            } else if (rows[i].cells[2].textContent) {
              mammalName = rows[i].cells[2].textContent;
            } else if (rows[i].cells[3].textContent) {
              mammalName = rows[i].cells[3].textContent;
            } else {
              mammalName = "State don't have any";
            }
            console.log("Mamal", mammalName);
            stateMammalEl.textContent = mammalName;
          } else if (index === 4) {
            treeName = rows[i].cells[1].textContent;
            stateTreeEl.textContent = treeName;
            console.log("trees", treeName);
          } else if (index === 5) {
            capitalName = rows[i].cells[1].textContent;
            stateCapitalEl.textContent = capitalName;
            console.log("Capital", capitalName);
          } else if (index === 6) {
            console.log("here in nick name");
            console.log("rowno", i);
            var listItemOne = doc3.querySelector(
              `tbody > tr:nth-child(${i}) > td:nth-child(2) > ul > li:nth-child(1)`
            );
            // nickName = rows[i].cells[1].textContent;
            // console.log(
            //   doc3.querySelector(
            //     `tbody > tr:nth-child(${i}) > td:nth-child(2) > ul > li:nth-child(1)`
            //   )
            // );
            nickName = listItemOne.textContent;
            // var regex = "(\\[.*\\])|(\".*\")|('.*')|(\\(.*\\))";
            // var output = RegExp.replace(nickName, regex, "");
            // console.log(output);
            stateNickNameEl.textContent = nickName;
            console.log("NickName", nickName);
          }
        }
      }
      //   console.log("Capital", capitalName);
      index++;
      console.log("value of index@@@@@@@@@@@@@@@@@@@@@@@@@@@", index);
      console.log("value of noOfsymbols", noOfsymbols);
      if (index !== noOfsymbols) {
        getInfo(stateName, symbols[index]);
      } else if (index === noOfsymbols) {
        index = 0;
        imageNumber = 0;
        console.log("CALLING imAGE FUNCTION %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        factImage = [flowerName, butterflyName, birdName, mammalName, treeName];
        getImages(stateName);
      }
    });
}

function getImages(statename) {
  mystring = statename + " monuments";
  console.log(mystring);

  fetch(
    "https://pixabay.com/api/?key=&q=" +
      encodeURIComponent(mystring) +
      "&image_type=photo"
  )
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
        //   return Promise.reject(new Error(response.statusText));
      }
    })
    // .catch(alert)
    .then(function (data) {
      console.log(data);
      //   var photoEl = document.querySelector(".photo");
      var loopCounter = 0;
      if (parseInt(data.totalHits) > 0) {
        if (parseInt(data.totalHits) < 5) {
          loopCounter = parseInt(data.totalHits);
        } else {
          loopCounter = noOfImages;
        }
        console.log("loopCounter val", loopCounter);
        for (var i = 0; i < loopCounter; i++) {
          var image1 = document.createElement("img");
          imageUrl = data.hits[i].webformatURL;
          image1.setAttribute("src", imageUrl);
          photoEl.append(image1);
          var text = data.hits[i].tags;
          console.log(text);
        }
      } else {
        console.log("No hits");
      }
    });
}

// function onChange() {
//   localStorage.setItem("item", $(".selector").val());
//   window.location.href = "page2.html";
// }

// input();

function input() {
  var country = localStorage.getItem("StateVisited");
  url =
    "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
    country +
    "&format=json&origin=*";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var title = data.query.search[0].title;
      var pageId = data.query.search[0].pageid;
      fetch(
        "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" +
          title +
          "&exintro=1&origin=*"
      )
        .then(function (responseAgain) {
          return responseAgain.json();
        })
        .then(function (dataAgain) {
          $(".info").append(dataAgain.query.pages[pageId].extract);
          $("#header").text(title);
        });
    });
}

function startCollectingData() {
  console.log("here on second page");
  stateName = localStorage.getItem("StateVisited");
  console.log("@@@@@@@@@@@@@@@@@@", stateName);
  index = 0;
  imageNumber = 0;
  input();
  getInfo(stateName, symbols[index]);
}

startCollectingData();
