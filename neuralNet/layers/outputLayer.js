class OutputLayer {

  constructor() {

    /* These do nothing more than assign numbers of nodes per layer */
    this.neurons = [];

  }

  generateNeurons(layerSize){

    for(var i = 0; i < layerSize; i++){
      var newNeuron = new OutputNeuron();
      this.neurons.push(newNeuron);
    }
  }

  produceOutput(){

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].produceOutput();
    }
  }

  dispatchErrorBackward(){

    this.clearAllErrorsHiddenLayer();

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchErrorBackward();
    }
  }

  clearAllErrorsHiddenLayer(){
    for(var i = 0; i < neuralNet.layers[1].neurons.length; i++){
      neuralNet.layers[1].neurons[i].receivedErrors = [];
      neuralNet.layers[1].neurons[i].receivedWeightsError = [];
    }
  }

}
