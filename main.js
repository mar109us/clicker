addEventListener("click", (event) => {
   if (event.target.parentNode.id === "left-content") {
      console.log("[click event]", event.target.parentNode.id);
      let section = "left";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "middle-content") {
      console.log("[click event]", event.target.parentNode.id);
      let section = "middle";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "right-content") {
      console.log("[click event]", event.target.parentNode.id);
      let section = "right";
      actionContent(section, event);
   }
});

function actionContent(section, event) {
   if (section === "left") {
      console.log("[captured event]", event.target.id);
      addPoint();
   }
   if (section === "middle") {
      console.log("[captured event]", event.target.id);
      addPoint();
   }
   if (section === "right") {
      console.log("[captured event]", event.target.id);
      addPoint();
   }
}

let pointAmount = 0;
let pointIncreaseAmount = 10;

let polygon = "";

function addPoint() {
   pointAmount += pointIncreaseAmount;
   document.getElementById("data-1").innerText = pointAmount;

   let randomPolygonPoint1 = Math.floor(Math.random() * 500) + 10;
   let randomPolygonPoint2 = Math.floor(Math.random() * 600);

   let randomColor1 = Math.floor(Math.random() * 85) + 170;
   let randomColor2 = Math.floor(Math.random() * 55) + 200;
   let randomColor3 = Math.floor(Math.random() * 45) + 210;
   polygon += `, ${randomPolygonPoint1} ${randomPolygonPoint2}`;
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
    <polygon points="200 300 ${polygon}" fill="url(#Pattern)"/>
    `;

   console.log(polygon);
}
