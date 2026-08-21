const displayMainPoints = document.getElementById("data-1");
const displayPolygonPoints = document.getElementById("data-2");
const display3 = document.getElementById("data-3");
const display4 = document.getElementById("data-4");

const addPolygonButton = document.getElementById("button-add-polygon");
const displayPolygonPrice = document.getElementById("polygon-price");

let increasePolygonPrice = 10;
let pointAmount = 0;
let pointIncreaseAmount = 1;

let polygon = "";

let polygonArray = [200, 300, 300, 200, 100, 200];
console.log(polygonArray);
let currentPolygonString;

let randomPolygonPoint1 = 0;
let randomPolygonPoint2 = 0;

let randomColor1;
let randomColor2;
let randomColor3;

addEventListener("click", (event) => {
   if (event.target.parentNode.id === "left-content") {
      // console.log("[click event]", event.target.parentNode.id);
      let section = "left";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "middle-content") {
      // console.log("[click event]", event.target.parentNode.id);
      let section = "middle";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "right-content") {
      // console.log("[click event]", event.target.parentNode.id);
      let section = "right";
      actionContent(section, event);
   }
});

function actionContent(section, event) {
   if (section === "left") {
      // console.log("[captured event]", event.target.id);
      addPoint();
   }
   if (section === "middle") {
      // console.log("[captured event]", event.target.id);
   }
   if (section === "right") {
      // console.log("[captured event]", event.target.id);
      buyUpgrade(event.target.id);
   }
}

function updateView() {
   displayMainPoints.innerText = pointAmount;
   displayPolygonPrice.innerText = increasePolygonPrice;

   updateSVG();
   checkPrice();
}
updateView();

function checkPrice() {
   if (pointAmount < increasePolygonPrice) {
      addPolygonButton.disabled = true;
   }
   if (pointAmount >= increasePolygonPrice) {
      addPolygonButton.disabled = false;
   }
}

function buyUpgrade(id) {
   if (id === "button-add-polygon") {
      pointAmount -= increasePolygonPrice;
      pointIncreaseAmount = Math.floor(pointIncreaseAmount * 2.5);
      increasePolygonPrice = Math.floor(increasePolygonPrice * 3);
   }
   updateSVGData();
}

function addPoint() {
   pointAmount += pointIncreaseAmount;
   updateView();
}

function updateSVGData() {
   polygonArray.push(Math.floor(Math.random() * 500) + 10);
   polygonArray.push(Math.floor(Math.random() * 600));

   randomPolygonPoint1 = Math.floor(Math.random() * 500) + 10;
   randomPolygonPoint2 = Math.floor(Math.random() * 600);

   randomColor1 = Math.floor(Math.random() * 85) + 170;
   randomColor2 = Math.floor(Math.random() * 55) + 200;
   randomColor3 = Math.floor(Math.random() * 45) + 210;

   updateView();
}

function updateSVG() {
   let polygonString = "";
   let count = 0;
   polygonArray.forEach((polygon) => {
      if (count === 0) {
         polygonString += `${polygon} `;
         count++;
      } else {
         polygonString += `${polygon}`;
         polygonString += `, `;
         count = 0;
      }
      currentPolygonString = polygonString;
   });
   console.log(polygonString);

   document.getElementById("svg").innerHTML = `
   <defs>
    <linearGradient id="Gradient1">
      <stop offset="5%" stop-color="rgb(${randomColor3}, ${randomColor2}, ${randomColor1})" />
      <stop offset="95%" stop-color="rgb(${randomColor1}, ${randomColor1}, ${randomColor3})" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="5%" stop-color="rgb(${randomColor1}, ${randomColor2}, ${randomColor3})" />
      <stop offset="95%" stop-color="rgb(${randomColor3}, ${randomColor3}, ${randomColor1})" />
    </linearGradient>

    <pattern id="Pattern" x="0" y="0" width="${randomPolygonPoint1}" height="${randomPolygonPoint1}">
      <rect x="0" y="0" width="${randomPolygonPoint1}" height="${randomPolygonPoint2}" fill="rgb(${randomColor3}, ${randomColor1}, ${randomColor3})" />
      <rect x="0" y="0" width="${randomPolygonPoint2}" height="${randomPolygonPoint1}" fill="url(#Gradient2)" />
      <circle
        cx="${randomPolygonPoint2}"
        cy="${randomPolygonPoint1}"
        r="${randomPolygonPoint2}"
        fill="url(#Gradient1)"
        fill-opacity="0.9" />
    </pattern>
  </defs>
    <polygon points=" ${currentPolygonString}" fill="url(#Pattern)"/>
    `;
}
