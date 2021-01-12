var gameLoginForm;

class GameManager {
    constructor() {

    }
    getCount() {
        var gameCountRef = database.ref('gameCount');
        gameCountRef.on("value", (data) => {
            gameCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            gameCount: count
        });
    }
    async start() {
        //game = new Game();
        var gameCountRef = await database.ref('gameCount').once("value");
        if (gameCountRef.exists()) {
            gameCount = gameCountRef.val();
            this.getCount();
        }

        gameLoginForm = new GameJoinForm();
        gameLoginForm.display();
    }
}