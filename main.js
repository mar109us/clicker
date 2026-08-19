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


let polygon = ""

function addPoint() {
   pointAmount += pointIncreaseAmount;
   document.getElementById("data-1").innerText = pointAmount;

   let randomPolygonPoint = Math.random() * (10 + 600) + 10;
   polygon += "," + randomPolygonPoint + randomPolygonPoint
   document.getElementById("svg").innerHTML = `
      <polygon points="100 100, 400 100, 250 400 ${polygon}"/>`;

      console.log(polygon)
}
