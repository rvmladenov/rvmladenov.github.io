new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        attack: function(){
            var dmg = this.calculateDmg(10, 3);
            this.monsterHealth -= dmg;
            this.log({isPlayer: true, text: 'Player hits Monster with ' + dmg});
            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function(){
            var dmg = this.calculateDmg(10, 20);
            this.monsterHealth -= dmg;

            this.log({isPlayer: true, text: 'Player hits Monster hard with ' + dmg});

            if(this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal: function(){
            var oldHealth = 0 + this.playerHealth;
            this.playerHealth = this.playerHealth <= 90 ? this.playerHealth + 10 : 100;
            
            this.log({isPlayer: true, text: 'Player heals for ' + (this.playerHealth - oldHealth)});

            this.monsterAttacks();
        },
        giveUp: function(){
            this.playerHealth = 0;
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var dmg = this.calculateDmg(12, 5);
            this.playerHealth -= dmg;
            this.log({isPlayer: false, text: 'monster hits Player with ' + dmg});
            this.checkWin();
        },
        log: function(logMsg) {
            this.turns.unshift(logMsg);
        },
        calculateDmg: function(max, min) {
            return Math.max( Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won, new game ?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0) {
                if(confirm('You lost, new game ?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }

            return false;
        }
    }
});