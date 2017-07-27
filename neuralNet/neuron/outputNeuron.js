class OutputNeuron {

  constructor() {

    this.finalOutput = 0;
    this.targetOutput = 0;

    this.bias = Math.random() * .2 - .1;

    this.backwardSynapses = [];

    this.receivedInputs = [];
    this.receivedWeights = [];

    this.learningRate = 0.05;

  }

  /* This sums all received inputs and weights and adds a bias. */

  calculateZ(){
    var sum = sumWeightsAndInputs(this.receivedInputs, this.receivedWeights);
    sum = addBias(sum, this.bias);
    return sum;
  }

/* This runs Z through the sigmoid function */

  processFinalOutput(){
    var A = sigmoidFunction(this.calculateZ());
    return A;
  }

  /* This sets this.finalOutput  */

  produceOutput(){

    this.finalOutput = this.processFinalOutput();
    //console.log(this.finalOutput);
  }

  /* This runs Z through the sigmoid prime function and then multiplies it by the
     difference between target and actual output */
  calculateDifferenceTA(){
    return this.finalOutput - this.targetOutput;
  }

  calculateError(){
    var inverse = sigmoidPrime(this.calculateZ());
    var difference = this.calculateDifferenceTA();

    return inverse * difference;
  }

  /* This sends the error back to all neurons in the previous layer and adjusts the bias */

  dispatchErrorBackward(){
    var error = this.calculateError();
    this.adjustBias();
    for(var i = 0; i < this.backwardSynapses.length; i++){
      neuralNet.layers[1].neurons[this.backwardSynapses[i].originAddress.originNeuron].receivedErrors.push(error);
      neuralNet.layers[1].neurons[this.backwardSynapses[i].originAddress.originNeuron].receivedWeightsError.push(this.backwardSynapses[i].weighting);
    }
  }

  adjustBias(){
    var error = this.calculateError();
    this.bias -= this.learningRate * error;
  }



}
