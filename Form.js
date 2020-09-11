class Form {

   constructor() {
      this.text1 = createElement("h");
      this.text2 = createElement("h3");
      this.input = createInput("");
      this.submit = createButton("SUBMIT");
      this.greetings=createElement("h1")
      this.waiting=createElement("h1")
      this.reset=createButton("Reset")
      
   }
  hide(){
   this.text1.hide();
   this.text2.hide();
   this.input.hide();
   this.submit.hide();
   this.greetings.hide();
   this.waiting.hide();

   
  }
   display() {
      background("orange")
      this.text1.html("MISSION:SHOOTING")
    
      this.text2.html("User Name:")
      this.text1.position(innerWidth / 2 - 330, 50);
      this.text2.position(innerWidth / 2 - 180, innerHeight / 2 - 110);
      this.input.position(innerWidth / 2 - 60, innerHeight / 2 - 90)
      this.submit.position(innerWidth / 2 - 50, innerHeight / 2 + 50)
      this.reset.position(innerWidth-100,50)
    
      this.submit.mousePressed(() => {
         background("#F05488")
         this.text1.hide();
         this.text2.hide();
         this.input.hide();
         this.submit.hide();
         player.name = this.input.value();
         playerCount=playerCount+1;
         player.index = playerCount;
         player.update();
         player.updateCount(player.index);
         var name= this.input.value();
       
         this.greetings.position(innerWidth / 2 - 260, innerHeight / 2 - 150)
         this.waiting.position(innerWidth / 2 - 290, innerHeight / 2 - 100)
        
         this.greetings.html("WELCOME TO THE LOBBY :D "+player.name);
         this.waiting.html("Kindly wait for the other person to join:D")
         bgSound.play();
         bgSound.loop();
      })
      this.reset.mousePressed(()=>{
         player.updateCount(0);
         game.update(0);
       });



   }



}