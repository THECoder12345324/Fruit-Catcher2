var index2, index3;

var allCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', 
'7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*']

class Game{
    constructor(){
        this.state = 0
        this.index = indexofgame;
        this.playerCount = 0;
        this.code = "";
    }
    getState() {
        var gameStateRef = database.ref('games/game' + this.index + '/gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    /*update(state) {
        database.ref('/').update({
            gameState: state
        });
    }*/
    update() {
        var gameIndex = "games/game" + this.index;
        database.ref(gameIndex).set({
            gameState: this.state,
            playerCount: this.playerCount,
            code: this.code
        })
    }
    generateCode() {
        var a1 = random(allCharacters);
        var b1 = random(allCharacters);
        var c1 = random(allCharacters);
        var d1 = random(allCharacters);
        var e1 = random(allCharacters);
        var f1 = random(allCharacters);
        var g1 = random(allCharacters);
        var h1 = random(allCharacters);

        this.code = a1 + b1 + c1 + d1 + e1 + f1 + g1 + h1;
    }
    updateCode() {
        database.ref('games/game' + this.index).update({
            code: this.code
        })
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            //for(var gme in allGames) {
              //  if (allGames[gme].index == this.index) {
            var playerCountRef = await database.ref('games/game' + this.index + '/playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
                //}
       //     }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];

    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        var displaypos = 0;
        for(var plr in allPlayers){
            index = index+1;
            displaypos += 50;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            if(index === player.index){
                
                fill("red");
                textSize(25);
                text(allPlayers[plr].name ,x-(players[index - 1].width / 2),y+25);

                
            }
            textSize(20);
            fill("white");
            text(allPlayers[plr].name + "'s Score: " + allPlayers[plr].score, 10, displaypos);
        }
        
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }

        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
            fruitapalooza.push(fruits);
            
        }
        
        if (player.index !== null) {
            if (fruits != null) {
                for (var fruitnum in fruitapalooza) {
                    if (fruitapalooza[fruitnum].collide(player1)) {
                        fruitapalooza[fruitnum].destroy();
                        index3 = 0;
                        for (var plr in allPlayers) {
                            index3 += 1;
                            if (index3 === player.index) {
                                player.score += 1;
                                player.update();
                            }
                        }
                    }
                    if (fruitapalooza[fruitnum].collide(player2)) {
                        fruitapalooza[fruitnum].destroy();
                        index2 = 0;
                        for (var plr in allPlayers) {
                            index2 += 1;
                            console.log(index2);
                            console.log(player.index);
                            if (index2 === player.index) {
                                player.score += 1;
                                console.log(player.score);
                                player.update();
                            }
                        }
                    }
                }
            }
        }
    }
    end(){
       console.log("Game Ended");
    }
    static getGameInfo() {
        var gameInfoRef = database.ref('games');
        gameInfoRef.on("value", (data) => {
            allGames = data.val();
        })
    }
}