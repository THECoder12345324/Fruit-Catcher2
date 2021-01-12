var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers, allGames;

var fruitapalooza = [];

var playerscorecount, gamemanager;

var gameCount;
var indexofgame = -1;

var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;


function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  fruitGroup = new Group();
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  gamemanager = new GameManager();
  gamemanager.start();
}

function draw() {
  background(back_img);
  
  if (game) {
    game.update();
  }

   if (playerCount === 2) {
     game.update();
   }
   if (gameState === 1) {
     clear(); 
     game.play();
   }
   if (gameState === 2) {
    
     game.end();
   }
}