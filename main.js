const displayMainPoints = document.getElementById("data-1");
const displayPolygonPoints = document.getElementById("data-2");
const display3 = document.getElementById("data-3");
const display4 = document.getElementById("data-4");

const verticeIncrement = document.getElementById("vertice-increment");
const verticeAutoIncrement = document.getElementById("auto-increment");

const addPolygonButton = document.getElementById("button-add-polygon");
const addArtistButton = document.getElementById("button-auto-increment");

const displayPolygonPrice = document.getElementById("polygon-price");

let increasePolygonPrice = 25;
let verticeAutoIncrementPrice = 500;

let pointAmount = 0;
let pointIncreaseAmount = 1;
let pointAutoIncreaseAmount = 0;

let polygon = "";

let polygonArray = [];
let currentPolygonString;

let randomPolygonPoint1 = 0;
let randomPolygonPoint2 = 0;

let randomColor1;
let randomColor2;
let randomColor3;

addEventListener("click", (event) => {
   console.log(event);
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
      if (event.target.id === "button-increment") {
         addPoint();
      }
      if (event.target.id === "button-auto-increment") {
         buyUpgrade(event.target.id);
      }
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
   updateData();
   checkPrice();
}
updateView();

setInterval(() => {
   pointAmount += pointAutoIncreaseAmount;
   updateView();
}, 1000);

function updateData() {
   displayMainPoints.innerText = pointAmount;
   verticeIncrement.innerText = pointIncreaseAmount;
   displayPolygonPrice.innerText = increasePolygonPrice;
   verticeAutoIncrement.innerText = verticeAutoIncrementPrice;
}

function updatePolygonDisplay() {
   displayPolygonPoints.innerText = polygonArray.length / 2;
}

function checkPrice() {
   if (pointAmount < increasePolygonPrice) {
      addPolygonButton.disabled = true;
   }
   if (pointAmount >= increasePolygonPrice) {
      addPolygonButton.disabled = false;
   }
   if (pointAmount < verticeAutoIncrementPrice) {
      addArtistButton.disabled = true;
   }
   if (pointAmount >= verticeAutoIncrementPrice) {
      addArtistButton.disabled = false;
   }
}

function buyUpgrade(id) {
   if (id === "button-add-polygon") {
      pointAmount -= increasePolygonPrice;
      // pointIncreaseAmount = Math.floor(pointIncreaseAmount * 2.5);
      // increasePolygonPrice = Math.floor(increasePolygonPrice * 3);
      pointIncreaseAmount = pointIncreaseAmount + 2;
      increasePolygonPrice = increasePolygonPrice + 25;

      updateSVG();
      updateSVGData();
      updatePolygonDisplay();
   }
   if (id === "button-auto-increment") {
      pointAmount -= verticeAutoIncrementPrice;
      pointAutoIncreaseAmount++;
      // verticeAutoIncrementPrice = Math.floor(verticeAutoIncrementPrice * 2.426);
      verticeAutoIncrementPrice = verticeAutoIncrementPrice + 100;
   }
   addIncrement();
}

function addPoint() {
   pointAmount += pointIncreaseAmount;
   updateView();
}

function addIncrement() {
   updateView();
}

function updateSVGData() {
   polygonArray.push(Math.floor(Math.random() * 100));
   polygonArray.push(Math.floor(Math.random() * 100));

   randomPolygonPoint1 = Math.floor(Math.random() * 100);
   randomPolygonPoint2 = Math.floor(Math.random() * 100);

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

   document.getElementById("svg-container").innerHTML = `
   
   <svg id="svg" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
            <rect x="0" y="0" 
            width="${randomPolygonPoint1}" 
            height="${randomPolygonPoint2}" 
            fill="rgb(${randomColor3}, ${randomColor1}, ${randomColor3})" />
            <rect x="0" y="0" 
            width="${randomPolygonPoint2}" 
            height="${randomPolygonPoint1}" fill="url(#Gradient2)" />
            <circle
            cx="${randomPolygonPoint2}"
            cy="${randomPolygonPoint1}"
            r="${randomPolygonPoint2}"
            fill="url(#Gradient1)"
            fill-opacity="0" />
         </pattern>
      </defs>
   
      <polygon points=" ${currentPolygonString}" fill="url(#Gradient2)"/>
   </svg>
    `;
}
