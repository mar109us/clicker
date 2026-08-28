const view = {
   bank: {
      vertex: document.getElementById("display-bank-vertex"),
      edge: document.getElementById("display-bank-edge"),
      polygon: document.getElementById("display-bank-polygon"),
      mesh: document.getElementById("display-bank-mesh"),
   },
   vertex: {
      increment: {
         button: document.getElementById("increment-vertex"),
         price: document.getElementById("price-increment-vertex"),
      },
      auto: {
         button: document.getElementById("auto-increment-vertex"),
         price: document.getElementById("price-auto-increment-vertex"),
      },
      bar: {
         display: document.getElementById("display-bank-vertex-timer"),
      },
   },
   edge: {
      increment: {
         button: document.getElementById("increment-edge"),
         price: document.getElementById("price-increment-edge"),
      },
   },
   polygon: {},
   mesh: {},
   svg: document.getElementById("svg-container"),
};

const data = {
   bank: {
      vertex: 10246464640,
   },
   vertex: {
      bar: {
         step: 0,
         width: 0,
      },
      price: {
         increment: 1,
         auto: 1000,
      },
      toBank: {
         increment: 0,
         auto: 0,
      },
      stepValue: {
         increment: 15,
         auto: 1000,
      },
   },
   edge: {
      price: 25,
   },
   polygon: {},
   mesh: {},
};

let timerInterval = 1000;
let timerId;

let svgPointArray = [];
let svgEdge = "";
let svgCurrentPoints;

let randomPolygonPoint1 = 0;
let randomPolygonPoint2 = 0;

let randomColor1;
let randomColor2;
let randomColor3;

updateView();
function updateView() {
   updateData();
   checkPrice();
}

function intervalTask() {
   let widthFraction = 100 / timerInterval;
   if (data.vertex.bar.step < timerInterval) {
      data.vertex.bar.width += widthFraction;
      data.vertex.bar.step += 1;
      view.vertex.bar.display.style.width = `${data.vertex.bar.width}%`;
   } else {
      data.vertex.bar.step = 0;
      data.vertex.bar.width = 0;
      view.vertex.bar.display.style.width = `${data.vertex.bar.width}%`;
      data.bank.vertex += data.vertex.toBank.auto;
      updateView();
   }
   timerId = setTimeout(intervalTask, 0);
}

function updateData() {
   view.bank.vertex.innerText = data.bank.vertex;
   view.bank.edge.innerText = calculateEdgeAmount();
   view.bank.polygon.innerText = calculatePolygonAmount();
   view.vertex.increment.price.innerText = data.vertex.price.increment;
   view.edge.increment.price.innerText = data.edge.price;
   view.vertex.auto.price.innerText = data.vertex.price.auto;
}

function calculateEdgeAmount() {
   return svgPointArray.length / 2;
}

function calculatePolygonAmount() {
   return Math.floor(svgPointArray.length / 2 / 3);
}

function checkPrice() {
   if (data.bank.vertex < data.edge.price) {
      view.edge.increment.button.disabled = true;
   } else {
      view.edge.increment.button.disabled = false;
   }
   if (data.bank.vertex < data.vertex.price.auto) {
      view.vertex.auto.button.disabled = true;
   } else {
      view.vertex.auto.button.disabled = false;
   }
}

function buyUpgrade(id) {
   if (id === "increment-edge") {
      data.bank.vertex -= data.edge.price;
      data.vertex.price.increment = data.vertex.price.increment + 2;
      data.edge.price = data.edge.price + 25;

      updateSVG();
      updateSVGData();
   }
   if (id === "auto-increment-vertex") {
      if (data.vertex.toBank.auto === 0) {
         data.vertex.toBank.auto = 1;
         timerId = setTimeout(intervalTask, 10);
      } else if (timerInterval === 100) {
         data.vertex.toBank.auto += data.vertex.stepValue.increment;
      } else {
         timerInterval = timerInterval - 10;
      }
      data.bank.vertex -= data.vertex.price.auto;
      data.vertex.price.auto += data.vertex.stepValue.auto;
   }
   updateView();
}

function addPoint() {
   data.bank.vertex += data.vertex.price.increment;
   updateView();
}

function random100() {
   return Math.floor(Math.random() * 100);
}

function random1() {
   return Math.floor(Math.random() * 85) + 170;
}

function random2() {
   return Math.floor(Math.random() * 55) + 200;
}

function random3() {
   return Math.floor(Math.random() * 45) + 210;
}

function updateSVGData() {
   svgPointArray.push(random100());
   svgPointArray.push(random100());

   randomPolygonPoint1 = random100();
   randomPolygonPoint2 = random100();

   randomColor1 = random1();
   randomColor2 = random2();
   randomColor3 = random3();

   updateView();
}

function updateSVG() {
   modifyArrayToPolygonPoints();
   view.svg.innerHTML = componentSVG();
}

function modifyArrayToPolygonPoints() {
   let svgArrayAsString = "";
   let count = 0;
   svgPointArray.forEach((polygon) => {
      if (count === 0) {
         svgArrayAsString += `${polygon} `;
         count++;
      } else {
         svgArrayAsString += `${polygon}`;
         svgArrayAsString += `, `;
         count = 0;
      }
      svgCurrentPoints = svgArrayAsString;
   });
}

function componentSVG() {
   return `
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
      <polygon points="${svgCurrentPoints}" fill="url(#Gradient2)"/>
   </svg>`;
}

addEventListener("click", (event) => {
   if (event.target.id === "increment-vertex") {
      addPoint();
   }
   if (event.target.id === "auto-increment-vertex" || event.target.id === "increment-edge") {
      buyUpgrade(event.target.id);
   }
});
