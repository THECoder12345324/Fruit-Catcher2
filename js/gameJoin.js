class GameJoinForm {
    constructor() {
        this.input = createInput("Enter Code");
        this.buttonCode = createButton("Submit");
        this.buttonHost = createButton("Host a game");
        this.greeting = createElement('h2');
    }
    display() {
        this.input.position(400, 300);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.buttonCode.position(620, 300);
        this.buttonCode.style('width', '200px');
        this.buttonCode.style('height', '40px');
        this.buttonCode.style('background', 'lightpink');
        this.buttonHost.position(200, 300);
        this.buttonHost.style('width', '200px');
        this.buttonHost.style('height', '50px');

        this.buttonHost.mousePressed(() => {
            this.input.hide();
            this.buttonCode.hide();
            this.buttonHost.hide();
            gameCount += 1;
            game = new Game();
            game.getState();
            game.index = gameCount;
            game.update();
            gamemanager.updateCount(gameCount);
            game.getState();
            game.generateCode();
            game.updateCode();
            game.start();
            //game.update();
            this.greeting.html("Code: " + game.code);
            this.greeting.position(100, 100);
        })

        this.buttonCode.mousePressed(() => {
            for (var game in allGames) {
                if (allGames[game].code == this.input.value()) {
                    this.input.hide();
                    this.buttonCode.hide();
                    this.buttonHost.hide();
                    game = new Game();
                    game.getState();
                    game.index = allGames[game].index;
                    game.start();
                    game.update();
                    player.update()
                }
            }
        })
    }
}