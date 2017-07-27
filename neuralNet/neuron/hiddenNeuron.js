class HiddenNeuron {

  constructor() {

    this.bias = Math.random() * .2 - .1;

    this.forwardSynapses = [];
    this.backwardSynapses = [];

    this.receivedInputs = [];
    this.receivedWeights = [];

    this.receivedErrors = [];
    this.receivedWeightsError = [];

    this.learningRate = 0.05;

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
      neuralNet.layers[2].neurons[i].backwardSynapses.push(newForwardSynapse);
    }
  }

  /* This function dispatches the activation signal to all neurons in the next layer through the forward
     synapses */

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

  /* This function calculates the error, adjusts the weights and biases, and then sends the error to the previous
     layer through the backward synapses */

  dispatchErrorBackward(){
    var error = this.calculateError();
    this.adjustBias();
    this.adjustWeighting();
    for(var i = 0; i < this.backwardSynapses.length; i++){
      neuralNet.layers[0].neurons[this.backwardSynapses[i].originAddress.originNeuron].receivedErrors.push(error);
      neuralNet.layers[0].neurons[this.backwardSynapses[i].originAddress.originNeuron].receivedWeightsError.push(this.backwardSynapses[i].weighting);
    }
  }

  adjustBias(){
    var error = this.calculateError();
    this.bias -= this.learningRate * error;
  }

  /* This function divides the received error by the activation signal, then adjusts the weight by which
     that error arrived. */

  adjustWeighting(){

    var error = this.calculateError();
    var signal = this.processSignalForward();

    for(var i = 0; i < this.forwardSynapses.length; i++){
      this.forwardSynapses[i].weighting -= this.learningRate*(this.receivedErrors[i] / signal);
    }
  }

  /* This function divides errors by their weightings and sums them, and then multiplies that sum by the inverse
     sigmoid function */

  calculateError(){

    var errorSum = divideWeightsAndInputs(this.receivedErrors, this.receivedWeightsError);
    var inverse = sigmoidPrime(this.calculateZ());

    return inverse * errorSum;

  }

}
