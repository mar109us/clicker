addEventListener("click", (event) => {
   if (event.target.parentNode.id === "left-content") {
      console.log(event.target.id);
      let section = "left";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "middle-content") {
      console.log(event.target.id);
      let section = "middle";
      actionContent(section, event);
   }
   if (event.target.parentNode.id === "right-content") {
      console.log(event.target.id);
      let section = "right";
      actionContent(section, event);
   }
});

function actionContent(section, event) {
   if (section === "left") {
      console.log("mew");
   }
   if (section === "middle") {
      console.log("mew1");
   }
   if (section === "right") {
      console.log("mew2");
   }
}
