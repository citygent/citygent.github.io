$(document).ready(function(){
  console.log("PRIORITY ONE\nENSURE RETURN OF ORGANISM FOR ANALYSIS.\nALL OTHER CONSIDERATIONS SECONDARY.\nCREW EXPENDABLE.");
  $logo = $('#logoimg');
  setupBoard();
  $('#logoimg').css({opacity:0})
  setTimeout(function(){
    flicker($logo);
    flicker($('main'));
    }, 1000);

})

// build game for 16 tiles first, if time refactor for any size.
var gameTiles = [];
// var possibleTiles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var flip1 = null;
var flip2 = null;
var currentlyFlipped = 0;
var errors = 0;
var correct = 0;


// animating this is going to be a pain in the arse, see: http://jsfiddle.net/YaUPs/


function eventListeners(){
  $('.tile').on('click', function(event) {
    var id = ($(this));
    // console.log(id);
    // console.log($(this).attr("id")); // use correct syntax!! Last nigth you were trying ($(this).id).
    // console.log(this.id); // non jQueeery option. 
    var tileimg = ($(this).data("tile"));//From docs: var mydata = $( "#mydiv" ).data();
    // console.log(tileimg);
    if ((currentlyFlipped < 2) && ($(id).html() == "")) { //checks target tile isn't already flipped. 
      flipTile(id, tileimg);
    }
  });
}

function flipTile(id, tileimg){ // tells tile to display
    if (currentlyFlipped == 0) {
      flip1 = id;
      $(id).html(tileimg); // puts data attribute(letter) into html of div.
      currentlyFlipped++;
      // debugger;
      flipDisplay(flip1);
    } else if (currentlyFlipped == 1) {
      flip2 = id;
      $(id).html(tileimg);
      currentlyFlipped++;
      flipDisplay(flip2);
      // console.log(flip1);
      // console.log(flip2);
      // console.log($(flip1).html())
      // console.log($(flip2).html())
      // debugger;
      checkMatch(flip1, flip2);
  } /// This is now the messiest function I've ever written jesus christ what is wrong with me. 
}

function checkMatch(flip1, flip2) {
  if ($(flip1).html() == $(flip2).html()){
    console.log("WeheyyyyY!");
    correct++;
    currentlyFlipped = 0;
    checkWinner();
  } else {
    errors++;
    errorsDisplay();
    setTimeout(function(){
      unflipTile(flip2);
      unflipTile(flip1);
    }, 2000);    
  }
}

function unflipTile (id) { // tells tile to hide
    $(id).html("");
    currentlyFlipped--
}

function setupBoard() {
  getGameTiles(16); 
  // console.log("Selected Tiles:"+gameTiles);
  // console.log("Amount of Selected Tiles:"+gameTiles.length);
  // console.log("Unselected Tiles:"+possibleTiles);
  gameTiles = randomiseBoard(gameTiles);
  // console.log("Shuffled Game Tiles:"+gameTiles);
  // console.log("Amount of Shuffled Tiles:"+gameTiles.length);
  // this forloop goes through array of selested and randomised tiles and builds divs for them on page. 
  for (i=0; i < gameTiles.length; i++) {  // have a look at jquery.each / $.each(array, function(){} when refactoring. 
 // $('<div class="tile" data-tile="'+ gameTiles[i] +'" </div>').appendTo('#board'); // this looks funny in dev tools, investigate why. 
    $("<div class='tile' id='"+i+"' data-tile='"+ gameTiles[i] +"'></div>").appendTo("#board"); // this looks funny in dev tools, investigate why. 
  }
  eventListeners();
}


//selects random tile from possilbes list, pushes two of each to array. 
function getGameTiles(tiles) {
  for(i=0; i < (tiles/2); i++) { //needs /2 because places two of each innit.
    var randomTile = possibleTiles[Math.floor(Math.random()*possibleTiles.length)];
    // console.log(randomTile);
    gameTiles.push(randomTile);
    gameTiles.push(randomTile); 
    possibleTiles.splice(possibleTiles.indexOf(randomTile),1);
  }
}

function randomiseBoard(arrayOfTiles) {
  var shuffled = [];
  while (arrayOfTiles.length > 0) { // Whilst tiles left on unshuffled board...
		tile = arrayOfTiles[Math.floor(Math.random() * arrayOfTiles.length)]; // Pick a random tile
		shuffled.push(tile); // push it to resulting board
		arrayOfTiles.splice(arrayOfTiles.indexOf(tile), 1); // make sure can't be called again.
	  }
	  return shuffled;
}

function checkWinner() {
  if (correct === 8) {
    console.log('Winner winner, chicken dinner.')
  }
}

function errorsDisplay() {
  $('#errors').addClass('show');
  $('#errors').html("<p class='typingimmediate'>ERRORS: "+errors+"</p>");
}
function flipDisplay(flip) {
  console.log('youre in flipDisplay')
  console.log($(flip).find('img').attr('alt'));
}

function flicker(element){
  element.animate({opacity:1}, {duration:200})
  .animate({opacity:0}, {duration:10})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:10})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:50})
  .animate({opacity:1}, {duration:35})
  .animate({opacity:0}, {duration:75})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:10})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:50})
  .animate({opacity:1}, {duration:75})
  .animate({opacity:0}, {duration:100})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:100})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:50})
  .animate({opacity:1}, {duration:200})
  .animate({opacity:0}, {duration:75})
  .animate({opacity:1}, {duration:10})
  .animate({opacity:0}, {duration:50})
  .animate({opacity:1}, {duration:200})
  .animate({opacity:0}, {duration:75})
  .animate({opacity:1}, {duration:100});
};

// <img src='./images/airlock.png'>

var possibleTiles = [
'<img src="images/airlock.png" alt="Airlock">',
'<img src="images/area-sheilded-from-radiation.png" alt="Area is Radiation Shielded">',
'<img src="images/artificial-gravity-area-non-pressurized-suit-required.png" alt="Pressurized Suit Required">',
'<img src="images/astronic-systems.png" alt="Astronautic Systems">',
'<img src="images/autodoc.png" alt="Medical Station">',
'<img src="images/bridge.png" alt="Bridge">',
'<img src="images/bulkhead-door.png" alt="Bulkhead Door">',
'<img src="images/coffee.png" alt="Coffee">',
'<img src="images/computer-terminal.png" alt="Computer Terminal">',
'<img src="images/cryogenic-vault.png" alt="Cryogenic Vault">',
'<img src="images/direction-down.png" alt="Direction Down">',
'<img src="images/direction-left.png" alt="Direction Left">',
'<img src="images/direction-right.png" alt="Direction Right">',
'<img src="images/direction-up.png" alt="Direction Up">',
'<img src="images/exhaust.png" alt="Engine Exhaust">',
'<img src="images/galley.png" alt="Galley">',
'<img src="images/hazard-warning.png" alt="Hazard Ahead">',
'<img src="images/high-radiation.png" alt="High Radiation">',
'<img src="images/intercom.png" alt="Intercom">',
'<img src="images/ladderway.png" alt="Ladderway">',
'<img src="images/laser.png" alt="Laser">',
'<img src="images/life-support-systems.png" alt="Life Support Systems">',
'<img src="images/maintenance.png" alt="Maintenance">',
'<img src="images/medical-life-support-systems.png" alt="Medical Bay Life Support">',
'<img src="images/medical.png" alt="Medical Bay">',
'<img src="images/no-gravity-area-non-pressurized-suit-required.png" alt="Anti-Gravity Suit Required">',
'<img src="images/non-pressurized-area-beyond.png" alt="Non-Pressurized Area Ahead">',
'<img src="images/organic-storage-foodstuffs.png" alt="Food Storage">',
'<img src="images/photonic-systems.png" alt="Photonic Systems">',
'<img src="images/pressure-suit-locker.png" alt="Pressure Suit Locker">',
'<img src="images/pressurized-area-aritficial-gravity-absent.png" alt="Pressureized Area, No Gravity">',
'<img src="images/pressurized-area-artificial-gravity.png" alt="Pressurized Area With Gravity">',
'<img src="images/pressurized-area.png" alt="Pressurized Area">',
'<img src="images/radiation-hazard.png" alt="Radiation Hazard">',
'<img src="images/refridgerated-storage-medical.png" alt="Refridgerated Medical Storage">',
'<img src="images/refridgerated-storage-organic-foodstuffs.png" alt="Refridgerated Food Storage">',
'<img src="images/refridgeration.png" alt="Refridgeration">',
'<img src="images/storage.png" alt="Storage">'
]
