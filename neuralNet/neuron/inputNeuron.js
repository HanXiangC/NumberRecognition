class InputNeuron {

  constructor() {

    this.input = 0;

    this.forwardSynapses = [];

    this.receivedErrors = [];
    this.receivedWeightsError = [];


    this.learningRate = 0.03;
  }

  generateForwardSynapses(neuronKey){

    for(var i = 0; i < neuralNet.layers[1].neurons.length; i++){
      var newForwardSynapse = new Synapse();
      newForwardSynapse.originAddress = {
        originLayer: 0,
        originNeuron: neuronKey
      }
      newForwardSynapse.destinationAddress = {
        destinationLayer: 1,
        destinationNeuron: i
      }

      var originAddress = {
        originLayer: 0,
        originNeuron: neuronKey
      }
      this.forwardSynapses.push(newForwardSynapse);
      neuralNet.layers[1].neurons[i].backwardSynapses.push(originAddress);
    }
  }

  dispatchInput(){
  //  console.log('Input before dispatch');
  //  console.log(this.input);
    for(var i = 0; i < this.forwardSynapses.length; i++){
      neuralNet.layers[1].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedInputs.push(this.input);
      neuralNet.layers[1].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedWeights.push(this.forwardSynapses[i].weighting);
    }
  }


  processErrors(){
    this.adjustWeighting();
  }

  adjustWeighting(){

    for(var i = 0; i < this.forwardSynapses.length; i++){
      this.forwardSynapses[i].weighting -= this.learningRate*(this.receivedErrors[i] * this.input);
    }

  }


  calculateErrorSum(){
    var errorSum = sumWeightsAndInputs(this.receivedErrors, this.receivedWeightsError);
    return errorSum;
  }

  produceError(){
    return this.calculateErrorSum();
  }


}
