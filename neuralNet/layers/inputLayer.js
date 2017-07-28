class InputLayer {

  constructor() {

    /* These do nothing more than assign numbers of nodes per layer */
    this.neurons = [];

  }

  generateNeurons(layerSize){

    for(var i = 0; i < layerSize; i++){
      var newNeuron = new InputNeuron();
      this.neurons.push(newNeuron);
    }
  }

  generateConnections(){
    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].generateForwardSynapses(i);
    }
  }

  dispatchInputsForward(){

    this.clearAllInputsHiddenLayer();
  //  console.log('Hidden layer inputs after clearing by input layer');
//    console.log(neuralNet.layers[1].neurons);
  //  console.log(neuralNet.layers[1].neurons);

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchInput();
    }
  }

  clearAllInputsHiddenLayer(){
    for(var i = 0; i < neuralNet.layers[1].neurons.length; i++){
      neuralNet.layers[1].neurons[i].receivedInputs = [];
      neuralNet.layers[1].neurons[i].receivedWeights = [];
    }
  }

  processErrorsAndReset(){
    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].processErrors();
    }
  }

}
