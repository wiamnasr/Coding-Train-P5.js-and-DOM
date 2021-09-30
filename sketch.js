var canvas;
var bgcolor; //for background color
var newParag;
var x = 100;
var y = 100;
var button;
var buttonGo;
var slider;
var nameInput;
var nameP;
var txt;
var textbox;
var sliderTwo;
var paragraph;
var firstPara;
var paraS;
var allP;
var orderedList = [
  "first ordered list item",
  "second ordered list item",
  "third ordered list item",
  "forth ordered list item",
];
var orderedListButton;
var headers;
var listItems;
var linkedP;
var anchorP;
var allImages = []; //creating a global variable that is an array so anytime I make an image element, I store a version of it here for myself => check addPhoto() function
var dropzone;
var sliderDance;
var q = 151;
var sliderDanceToo = [];
var angle = 0;
var mic;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent("canvasp");
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.position(0, 0); //setting the position of my canvas! => this is the pixel coordinate for the entire page!
  canvas.style("z-index", "-1");
  mic = new p5.AudioIn();
  mic.start();

  slider = createSlider(10, 100, 47); // creating a slider, with a min, max and starting value => to get the value out of the slider, we use a function called value();
  // slider.position(1200, 450);
  slider.parent("canvasp");
  nameInput = createInput("type your name ...");
  nameInput.parent("canvasp");
  // newParag.position(400, 600);
  // createP("");
  bgcolor = color(200);
  nameP = createP("YOUR NAME");
  nameP.mouseOver(overpara); //when I mouseOver() this DOM element, this overpara() function will be executed
  nameP.mouseOut(outpara);
  nameP.parent("canvasp");

  button = createButton(
    "I'm a button, I change the background color of the canvas!"
  ); //attach mousePressed() function to this button => callback
  button.mousePressed(changeColor);
  // button.position(1085, 690);
  button.parent("canvasp");

  txt = createP("Example of mouseOver(), mouseOut()");
  txt.mouseOver(changeStyle);
  txt.mouseOut(revertStyle);

  // buttonGo = createButton("go"); //also changes the color of the canvas background, for now
  // buttonGo.mousePressed(changeColor);
  // buttonGo.mousePressed(changeStyle);

  // nameInput.changed(updateText);
  nameInput.input(updateText);

  paragraph = createP(
    "I update in real time with the contents of the text-box and the style of the slider!"
  );
  textbox = createInput("enter text");
  sliderTwo = createSlider(10, 100, 50);

  // textbox.changed(doSomething); //the changed event is triggered whenever the browser decides that you have finished your action
  //thats why we use the input event instead => updates in real time => no need to press enter or TAB
  textbox.input(updateParagraphText);
  sliderTwo.input(updateParagraphFontSize);

  newParag = createElement("p", "Creating an element with JS! => CLICK MOUSE!"); // this is the default content of newParag, before mouse is pressed
  newParag.mousePressed(randomPar);

  // Important to note here that we started with all p, then all p with class .paraS then the p with ID firstPara
  allP = selectAll("p");
  allP.forEach((par) => {
    par
      .style("fontSize", "15pt")
      .style("color", "white")
      .style("fontWeight", "bolder")
      .style("padding", "10pt");

    par.mouseOver(highlight);
    par.mouseOut(unhighlight);
  });
  headers = selectAll("h3");
  headers.forEach((header) => header.class("paraS"));

  paraS = selectAll(".paraS");
  paraS.forEach((para) =>
    para.style("fontSize", "18pt").style("color", "white")
  );

  firstPara = select("#firstPara");
  firstPara.style("fontSize", "24pt");
  firstPara.mouseOver(highlight);
  firstPara.mouseOut(unhighlight);

  orderedListButton = select("#orderedListButton");
  orderedListButton.mousePressed(addItem);

  for (var i = 0; i < 5; i++) {
    linkedP = createP("This is a link: ");
    linkedP.parent("imgPara");
    linkedP
      .style("background-color", "#CCC")
      .style("padding", "24px")
      .style("fontSize", "18pt");
    anchorP = createA("#", "tech");
    anchorP
      .style("background-color", "#CCC")
      .style("padding", "24px")
      .style("fontSize", "18pt");

    anchorP.mousePressed(addPhoto);

    anchorP.parent(linkedP);
  }

  var clearButton = select("#clear");
  clearButton.mousePressed(clearImages);

  dropzone = select("#dropzone");
  dropzone
    .style("padding", "24px")
    .style("border-style", "dashed")
    .style("font-size", "36pt")
    .style("width", "50%");

  dropzone.dragOver(imgDragOver);
  dropzone.dragLeave(imgDragLeave);
  dropzone.drop(gotFile, imgDragLeave);

  sliderDance = createSlider(0, 300, 50);
  sliderDance.parent("sliderDance");

  for (var i = 0; i < 400; i++) {
    sliderDanceToo[i] = createSlider(0, 300, 50);
    sliderDanceToo[i].parent("sliderDance");
  }
}

/*
End of Setup
Start of Function declarations
*/

function gotFile(file) {
  //this file variable is an instane of a p5.js object => a lot of metadata associated with that file (how big it is, what it contains, ...) => a property that is within the file is "data" => can be text, other data format or image data
  createP(file.name + " " + file.type + " " + file.size);
  var img = createImg(file.data);
  img.size(200, 200);
}

function imgDragOver() {
  dropzone.style("background-color", "#ccc");
}

function imgDragLeave() {
  dropzone.style("background-color", "#CCC");
}

function clearImages() {
  for (var i = 0; i < allImages.length; i++) {
    allImages[i].remove(); //you could use hide(), but the element is still there in the active page
  }
  images = [];
}

function addPhoto() {
  var techImg = createImg("caspar-camille-rubin-fPkvU7RDmCo-unsplash.jpg"); //different than loadImg => createImg() creates a DOM element => inserting an img as its own DOM element
  techImg.size(200, 200).style("padding", "2pt");
  allImages.push(techImg);
  var paragraphTwo = this.parent(); //this is me asking the anchor tag who is your parent so I can append the techImg directly to it (make the parent of the anchor also the parent of the techImg, previously the anchor was the parent of techImg but we want to change that)
  // techImg.parent(this); //parenting the techImg by the link => this is referring to the specific DOM element that triggered the call back addPhoto()=> anchorP
  // instead we are making the linkedP (parent of anchorP) also the parent of techImg so when a user clicks our link, the techImg is added under the linkedP as its new parent, sharing it with anchorP as a parent now
  techImg.parent(paragraphTwo);
}

function addItem() {
  var r = floor(random(0, orderedList.length));
  var li = createElement("li", orderedList[r]);
  li.parent("orderedList").style("color", "white");
}

function highlight() {
  this.style("background-color", "rgba(255, 192, 203, 0.596)").style(
    "padding",
    "28pt"
  );
}

function unhighlight() {
  this.style("background-color", "rgba(204, 204, 204, 0.664)").style(
    "padding",
    "10pt"
  );
}

function updateParagraphFontSize() {
  paragraph.style("font-size", sliderTwo.value() + "pt"); // slider.value followed by pt (point)
}

function updateParagraphText() {
  paragraph.html(textbox.value()); //this will change the contents of the paragraph with whatever you type in the textbox
}

function revertStyle() {
  txt.style("background-color", "rgba(0, 128, 0, 0.616)");
  txt.style("padding", "10pt");
}

function changeStyle() {
  txt.style("background-color", "rgba(255, 192, 203, 0.596);");
  txt.style("padding", "25px");
}

function updateText() {
  nameP.html(nameInput.value());
}

//defining a function to attach with the mouseOver();
function overpara() {
  nameP.html("I am a mouseOver() paragraph!");
}

//defining a function for out:
function outpara() {
  nameP.html("Your mouse is out");
}

//defining a function to associate (attach) with the mousePressed() event of that particular button => p5 dom .js allows for such functionalities
function changeColor() {
  bgcolor = color(random(200), random(200), random(200));
}

function randomPar() {
  newParag.html("Checkout my favorite numbers."); // when mouse is pressed, the newParag element content will change to this message
  createElement(
    "p",
    "Creating a paragraph! Also, My favorite number is: " + random(0, 100)
  );
}

/*
End of Function Declarations
Start of draw loop
*/

function draw() {
  clear(); //changing from background to clear => a function, instead of drawing a colored board on the background => it clears it and leaves it transparent
  background(bgcolor);
  // background(sliderDance.value());
  fill(230, 0, 100);
  // rect(x, y, 50, 50); // remember, the location of the rect is relative to the canvas itself
  // meaning, as you move the canvas around, it still maintains its coordinates system relative to the canvas, only!
  // newParag.position(x + 400, y + 15); // this will be positioned relative to the page not the canvas

  // x += ranxdom(-5, 5); // adding animation to demonstrate that we are inside a draw loop here
  // slider.position(x + 735, y + 80);
  ellipse(windowWidth / 4, windowHeight / 1.8, slider.value(), slider.value());

  // nameP.html(nameInput.value()); //=> this has been commented out as its in the draw() fnction and is continously over-writing the mouseOver() and mouseOut()
  text(nameInput.value(), 10, 20);

  ellipse(windowWidth / 1.1, windowHeight / 25, random(100), random(100));
  sliderDance.value(q);
  q = q + random(-5, 5);

  var offset = 0;

  for (var i = 0; i < sliderDanceToo.length; i++) {
    var l = map(sin(angle + offset), -1, 1, 0, 255); // the sin function has a range bn 1 and -1 (x-axis is the angle moving through time)
    sliderDanceToo[i].value(l);
    offset += 0.25;
  }

  angle += 0.2; //the unit of measurement is in radiance

  var vol = mic.getLevel();
  ellipse(width / 2, height / 2, vol * width);
}
