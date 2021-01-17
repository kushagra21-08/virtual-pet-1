var dog,dogHap,dogSad;
var foodStock,foodRef;
var database;
var button , input;
var fod;

function preload()
{
  dogSad = loadImage("dogimg.png");
  dogHap = loadImage("dogimg1.png");
}

function setup() {
  createCanvas(700, 700);
  
  dog = createSprite(350,470,50,50);
  dog.addImage(dogSad);
  dog.scale=0.40;

  database = firebase.database();
  
  foodRef = database.ref('food');
  foodRef.on("value",readFood);

  button = createButton('refill');
  input = createInput();

}


function draw() { 

  if(foodStock !== 0){
  button.hide();
  input.hide();
}

  background("green"); 

  if(keyIsDown(UP_ARROW) && foodStock !== 0){
    changeFood();
    dog.addImage(dogHap);
  }

  if(foodStock === 0){
     input.position(205,640)
     button.position(405,640)

     button.show();
     input.show();

     textSize(15);
     fill("black");
     text("stock amount",250,630);

       button.mousePressed(()=>{
         fod = input.value();
          button.hide();
          input.hide();
         foodStock = fod
          database.ref('/').set({
          'food' : fod
        });
    });
  }  



  drawSprites();

  textSize(20);
  fill("black");
  text("food left : " + foodStock,300,300);

}
  function changeFood(){
    database.ref('/').set({
        'food' : foodStock - 1
    });
  }

  function readFood(data){
    foodStock = data.val();
    console.log(foodStock);
    }

