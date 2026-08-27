const bank = {
   vertex: document.getElementById("display-bank-vertex"),
   edge: document.getElementById("display-bank-edge"),
   polygon: document.getElementById("display-bank-polygon"),
   mesh: document.getElementById("display-bank-mesh"),
};

const vertex = {
   increment: {
      button: document.getElementById("increment-vertex"),
      price: document.getElementById("price-increment-vertex"),
   },
   auto: {
      button: document.getElementById("auto-increment-vertex"),
      price: document.getElementById("price-auto-increment-vertex"),
   },
};

const edge = {
   increment: {
      button: document.getElementById("increment-edge"),
      price: document.getElementById("price-increment-edge"),
   },
};

let priceEdgeIncrement = 25;
let priceVertexAuto = 1;

let bankVertex = 100000;
let priceVertexIncrement = 1;
let autoVertexInterval = 0;

let timerInterval = 1000;
let timerId;

let svgEdgeArray = [0, 0];
let svgEdge = "";
let svgCurrentEdge;

let randomPolygonPoint1 = 0;
let randomPolygonPoint2 = 0;

let randomColor1;
let randomColor2;
let randomColor3;

addEventListener("click", (event) => {
   if (event.target.id === "increment-vertex") {
      addPoint();
   }
   if (event.target.id === "auto-increment-vertex" || event.target.id === "increment-edge") {
      buyUpgrade(event.target.id);
   }
});

function updateView() {
   updateData();
   checkPrice();
}
updateView();

let vertexTimer;
let displayVertexTimer = document.getElementById("display-bank-vertex-timer");

let intervalVertexTimer;

let count = 0;
let currentwidth = 0;
function intervalTask() {
   let widthFraction = 100 / timerInterval;
   if (count < timerInterval) {
      currentwidth += widthFraction;
      count += 1;
      displayVertexTimer.style.width = `${currentwidth}%`;
   } else {
      count = 0;
      currentwidth = 0;
      displayVertexTimer.style.width = `${currentwidth}%`;
      bankVertex += autoVertexInterval;
      updateView()
   }
   timerId = setTimeout(intervalTask, 0);
   
}

function updateData() {
   bank.vertex.innerText = bankVertex;
   vertex.increment.price.innerText = priceVertexIncrement;
   edge.increment.price.innerText = priceEdgeIncrement;
   vertex.auto.price.innerText = priceVertexAuto;
   bank.polygon.innerText = Math.floor(svgEdgeArray.length / 2 / 3);
}

function updatePolygonDisplay() {
   bank.edge.innerText = svgEdgeArray.length / 2;
}

function checkPrice() {
   if (bankVertex < priceEdgeIncrement) {
      edge.increment.button.disabled = true;
   }
   if (bankVertex >= priceEdgeIncrement) {
      edge.increment.button.disabled = false;
   }
   if (bankVertex < priceVertexAuto) {
      vertex.auto.button.disabled = true;
   }
   if (bankVertex >= priceVertexAuto) {
      vertex.auto.button.disabled = false;
   }
}

function buyUpgrade(id) {
   if (id === "increment-edge") {
      bankVertex -= priceEdgeIncrement;
      priceVertexIncrement = priceVertexIncrement + 2;
      priceEdgeIncrement = priceEdgeIncrement + 25;

      updateSVG();
      updateSVGData();
      updatePolygonDisplay();
   }
   if (id === "auto-increment-vertex") {
      if (autoVertexInterval === 0) {
         autoVertexInterval = 1;
         timerId = setTimeout(intervalTask, 10);
      } else if (timerInterval === 100) {
         autoVertexInterval++;
      } else {
         timerInterval = timerInterval - 10;
      }
      bankVertex -= priceVertexAuto;
      priceVertexAuto = priceVertexAuto + 1;
   }
   updateView();
}

function addPoint() {
   bankVertex += priceVertexIncrement;
   updateView();
}

function updateSVGData() {
   svgEdgeArray.push(Math.floor(Math.random() * 100));
   svgEdgeArray.push(Math.floor(Math.random() * 100));

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
   svgEdgeArray.forEach((polygon) => {
      if (count === 0) {
         polygonString += `${polygon} `;
         count++;
      } else {
         polygonString += `${polygon}`;
         polygonString += `, `;
         count = 0;
      }
      svgCurrentEdge = polygonString;
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
   
      <polygon points=" ${svgCurrentEdge}" fill="url(#Gradient2)"/>
   </svg>
    `;
}
