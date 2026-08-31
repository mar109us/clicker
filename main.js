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
      vertex: 1000000,
   },
   vertex: {
      bar: {
         step: 0,
         width: 0,
         timerInterval: 1000,
         timerId: undefined,
         widthFraction: null,
         widthFractionAmount: 100,
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
   svg: {
      array: [],
      currentPoints: null,
      randomPoint1: 0,
      randomPoint2: 0,
      randomColor1: 0,
      randomColor2: 0,
      randomColor3: 0,
   },
};

updateView();
function updateView() {
   updateData();
   checkPrice();
}

function intervalTask() {
   data.vertex.bar.widthFraction = data.vertex.bar.widthFractionAmount / data.vertex.bar.timerInterval;
   if (data.vertex.bar.step < data.vertex.bar.timerInterval) {
      increaseBarWidth();
   } else {
      resetBarWidth();
      updateData();
   }
   data.vertex.bar.timerId = setTimeout(intervalTask, 0);
}

function increaseBarWidth() {
   data.vertex.bar.width += data.vertex.bar.widthFraction;
   data.vertex.bar.step += 1;
   view.vertex.bar.display.style.width = `${data.vertex.bar.width}%`;
}

function resetBarWidth() {
   data.vertex.bar.step = 0;
   data.vertex.bar.width = 0;
   view.vertex.bar.display.style.width = `${data.vertex.bar.width}%`;
   data.bank.vertex += data.vertex.toBank.auto;
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
   return data.svg.array.length / 2;
}

function calculatePolygonAmount() {
   return Math.floor(data.svg.array.length / 2 / 3);
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
         data.vertex.bar.timerId = setTimeout(intervalTask, 10);
      } else if (data.vertex.bar.timerInterval === 100) {
         data.vertex.toBank.auto += data.vertex.stepValue.increment;
      } else {
         data.vertex.bar.timerInterval = data.vertex.bar.timerInterval - 10;
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
   data.svg.array.push(random100());
   data.svg.array.push(random100());

   data.svg.randomPoint1 = random100();
   data.svg.randomPoint2 = random100();

   data.svg.randomColor1 = random1();
   data.svg.randomColor2 = random2();
   data.svg.randomColor3 = random3();

   updateView();
}

function updateSVG() {
   modifyArrayToPolygonPoints();
   view.svg.innerHTML = componentSVG();
}

function modifyArrayToPolygonPoints() {
   let svgArrayAsString = "";
   let count = 0;
   data.svg.array.forEach((polygon) => {
      if (count === 0) {
         svgArrayAsString += `${polygon} `;
         count++;
      } else {
         svgArrayAsString += `${polygon}`;
         svgArrayAsString += `, `;
         count = 0;
      }
      data.svg.currentPoints = svgArrayAsString;
   });
}

function componentSVG() {
   return `
   <svg id="svg" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
         <linearGradient id="Gradient1">
            <stop offset="5%" stop-color="rgb(${data.svg.randomColor3}, ${data.svg.randomColor2}, ${data.svg.randomColor1})" />
            <stop offset="95%" stop-color="rgb(${data.svg.randomColor1}, ${data.svg.randomColor1}, ${data.svg.randomColor3})" />
         </linearGradient>
         <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stop-color="rgb(${data.svg.randomColor1}, ${data.svg.randomColor2}, ${data.svg.randomColor3})" />
            <stop offset="95%" stop-color="rgb(${data.svg.randomColor3}, ${data.svg.randomColor3}, ${data.svg.randomColor1})" />
         </linearGradient>
         <pattern id="Pattern" x="0" y="0" width="${data.svg.randomPoint1}" height="${data.svg.randomPoint1}">
            <rect x="0" y="0" 
            width="${data.svg.randomPoint1}" 
            height="${data.svg.randomPoint2}" 
            fill="rgb(${data.svg.randomColor3}, ${data.svg.randomColor1}, ${data.svg.randomColor3})" />
            <rect x="0" y="0" 
            width="${data.svg.randomPoint2}" 
            height="${data.svg.randomPoint1}" fill="url(#Gradient2)" />
            <circle
            cx="${data.svg.randomPoint2}"
            cy="${data.svg.randomPoint1}"
            r="${data.svg.randomPoint2}"
            fill="url(#Gradient1)"
            fill-opacity="0" />
         </pattern>
      </defs>
      <polygon points="${data.svg.currentPoints}" fill="url(#Gradient2)"/>
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
