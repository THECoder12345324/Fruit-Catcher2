class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
    }

    getCount() {
        var playerCountRef = database.ref('games/game' + game.index + '/playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('games/game' + game.index).update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "games/game" + game.index + "/players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('games/game' + game.index + '/players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
