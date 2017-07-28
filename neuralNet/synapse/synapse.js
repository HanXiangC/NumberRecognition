class Synapse {

  constructor() {
    this.weighting = this.randomizePositivity();
  }

  randomizePositivity(){
    var toss = Math.random();
    if(toss > 0.5){
      return Math.random();
    }else{
      return Math.random() * -1;
    }
  }
}
