class OutputNeuron {

  constructor() {

    this.finalOutput = 0;
    this.targetOutput = 0;

    this.bias = Math.random() * .2 - .1;

    this.backwardSynapses = [];

    this.receivedInputs = [];
    this.receivedWeights = [];

    this.learningRate = 0.06;

  }

  processFinalOutput(){
    var A = sigmoidFunction(this.calculateZ());
    return A;
  }

  produceOutput(){
    this.finalOutput = this.processFinalOutput();
  }

  calculateError(){
    var inverse = sigmoidPrime(this.calculateZ());
    var difference = this.calculateDifferenceTA();

    return inverse * difference;
  }

  produceError(){
    return this.calculateError();
  }

  dispatchErrorBackward(){
    var error = this.produceError();
    this.adjustBias();
    for(var i = 0; i < this.backwardSynapses.length; i++){
      neuralNet.layers[1].neurons[this.backwardSynapses[i].originNeuron].receivedErrors.push(error);
    }
  }

  adjustBias(){
    var error = this.produceError();
    this.bias -= this.learningRate * error;
  }

  sumInputsAndWeightsWithBias(){
    var sum = sumWeightsAndInputs(this.receivedInputs, this.receivedWeights);
    sum = addBias(sum, this.bias);
    return sum;
  }

  calculateZ(){
    var Z = this.sumInputsAndWeightsWithBias();
    return Z;
  }

  calculateDifferenceTA(){
    return this.finalOutput - this.targetOutput;
  }


}
