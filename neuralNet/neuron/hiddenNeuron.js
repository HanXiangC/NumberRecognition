class HiddenNeuron {

  constructor() {

    this.bias = Math.random() * .2 - .1;

    this.forwardSynapses = [];
    this.backwardSynapses = [];

    this.receivedInputs = [];
    this.receivedWeights = [];

    this.receivedErrors = [];
    this.receivedWeightsError = [];


    this.learningRate = 0.03;

  }



  /* This function generates forward synapses connecting to all of the neurons in the next layer,
      and then pushes them into this neurons forward synapses array, as well as into the other neurons'
      back synapses array */


  generateForwardSynapses(neuronKey){

    for(var i = 0; i < neuralNet.layers[2].neurons.length; i++){

      var newForwardSynapse = new Synapse();

      newForwardSynapse.originAddress = {
        originLayer: 1,
        originNeuron: neuronKey
      }

      newForwardSynapse.destinationAddress = {
        destinationLayer: 2,
        destinationNeuron: i
      }
      this.forwardSynapses.push(newForwardSynapse);


      var originAddress = {
        originLayer: 1,
        originNeuron: neuronKey
      }

      neuralNet.layers[2].neurons[i].backwardSynapses.push(originAddress);
    }
  }


  dispatchSignalForward(){
    var forwardSignal = this.processSignalForward();
    for(var i = 0; i < this.forwardSynapses.length; i++){
      neuralNet.layers[2].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedInputs.push(forwardSignal);
      neuralNet.layers[2].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedWeights.push(this.forwardSynapses[i].weighting);
    }
  }


  /* This function sums all weights and inputs, and runs it through the sigmoid, finally returning
     the activation function */


  processSignalForward(){
    var Z = this.calculateZ();
    var A = sigmoidFunction(Z);
  // console.log("A");
  // console.log(A);
    return A;
  }


  /* This function sums all weights and inputs */

  calculateZ(){
    var sum = sumWeightsAndInputs(this.receivedInputs, this.receivedWeights);
    sum = addBias(sum, this.bias);
  //  console.log("sum");
  //  console.log(sum);
    return sum;
  }


  dispatchErrorBackward(){
    var error = this.produceError();
  //  console.log(error);
    this.adjustBias();
    this.adjustWeighting();
    for(var i = 0; i < this.backwardSynapses.length; i++){
      neuralNet.layers[0].neurons[this.backwardSynapses[i].originNeuron].receivedErrors.push(error);

    }
  }

  adjustBias(){
    var error = this.produceError();
    this.bias -= this.learningRate * error;
  }

  adjustWeighting(){

    var error = this.produceError();
    var signal = this.processSignalForward();

    for(var i = 0; i < this.forwardSynapses.length; i++){
      this.forwardSynapses[i].weighting -= this.learningRate*(this.receivedErrors[i] *signal);
    }
  }

  calculateError(){

    var weightings = [];
    for(var i = 0; i < this.forwardSynapses.length; i++){
      weightings.push(this.forwardSynapses[i].weighting);
    }

    var errorSum = sumWeightsAndInputs(this.receivedErrors, weightings);
    var inverse = sigmoidPrime(this.calculateZ());

    return inverse * errorSum;

  }

  produceError(){
    return this.calculateError();
  }

}
