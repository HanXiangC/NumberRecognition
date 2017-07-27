class InputNeuron {

  constructor() {

    this.input = 0;

    this.forwardSynapses = [];

    this.receivedErrors = [];
    this.receivedWeightsError = [];

    this.learningRate = 0.05;
  }

  /* This function generates forward synapses connecting to all of the neurons in the next layer,
      and then pushes them into this neurons forward synapses array, as well as into the other neurons'
      back synapses array */

  generateForwardSynapses(neuronKey){

    for(var i = 0; i < neuralNet.layers[1].neurons.length; i++){
      var newForwardSynapse = new Synapse();
      newForwardSynapse.originAddress = {
        originLayer: 0,
        originNeuron: parseInt(neuronKey)
      }
      newForwardSynapse.destinationAddress = {
        destinationLayer: 1,
        destinationNeuron: i
      }
      this.forwardSynapses.push(newForwardSynapse);
      neuralNet.layers[1].neurons[i].backwardSynapses.push(newForwardSynapse);
    }
  }

  /* This function dispatches the input to all neurons in the next layer through the forward
     synapses */

  dispatchInput(){
  //  console.log('Input before dispatch');
  //  console.log(this.input);
    for(var i = 0; i < this.forwardSynapses.length; i++){
      neuralNet.layers[1].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedInputs.push(this.input);
      neuralNet.layers[1].neurons[this.forwardSynapses[i].destinationAddress.destinationNeuron].receivedWeights.push(this.forwardSynapses[i].weighting);
    }
  }

  adjustWeighting(){

    for(var i = 0; i < this.forwardSynapses.length; i++){
      this.forwardSynapses[i].weighting -= this.learningRate*(this.receivedErrors[i] * this.input);
    }

  }


}
