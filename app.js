
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) +min;
}



const app = Vue.createApp({
data(){
  return {
      playerHP: 100,
      monsterHP: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
  }
},
    computed:{
    monsterBarStyles(){
        if(this.monsterHP < 0){
            return {width: '0%'}
        }
        return {width: this.monsterHP+'%'}
    },
        playerBarStyles(){
        if(this.playerHP < 0){
            return {width: '0%'}
        }
        return {width: this.playerHP+'%'}
        },
        mayUseSpecialAttack(){
            return     this.currentRound % 3 !== 0
        }

    },
    watch:{
    playerHP(value){
        if (value <= 0 && this.monsterHP <=0){
            this.winner = 'draw'
        }else if (value <= 0){
            this.winner = 'monster'
        }
    },
        monsterHP(value){
            if (value <= 0 && this.playerHP <=0 ) {
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    },

    methods: {
    attackMonster(){
       const attackValue = getRandomValue(5, 12)
        this.monsterHP -= attackValue;
        this.currentRound++;
       this.attackPlayer();
       this.battleLog.unshift('Player Attacked for ' + attackValue)
    },
        attackPlayer(){
            const attackValue =  getRandomValue(8,15)
            this.playerHP -= attackValue;
            this.battleLog.unshift('Monster Attacked for ' +  attackValue)
        },

        specialAttack(){

        const attackValue = getRandomValue(10,25);
        this.monsterHP -= attackValue;
        this.attackPlayer();
        this.currentRound++;
        this.battleLog.unshift('PLAYER USED A SPECIAL ATTACK FOR ' + attackValue)
        },

        healPlayer(){
        const healValue = getRandomValue(8,20);
        if(this.playerHP + healValue > 100){
            this.playerHP =100;
        }else{
            this.playerHP += healValue;
            this.attackPlayer();
            this.battleLog.unshift('player healed for ' + healValue)
        }

        },

        startGame(){
        this.playerHP = 100;
        this.monsterHP = 100;
        this.winner = null;
        this.currentRound = 0;
        },

        surrender(){
        this.winner = 'monster';
        }
    }


});


app.mount('#game')
