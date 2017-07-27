class OutputLayer {

  constructor() {

    /* This array holds all the nodes */
    this.neurons = [];

  }

  /* This populates the neurons array with specialized neurons */

  generateNeurons(layerSize){

    for(var i = 0; i < layerSize; i++){
      var newNeuron = new OutputNeuron();
      this.neurons.push(newNeuron);
    }
  }

/* This orders all nodes to calculate final outputs */

  produceOutput(){

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].produceOutput();
    }
  }

/* This sends calculated errors to the hidden layer after clearing all existing errors */

  dispatchErrorBackward(){

    this.clearAllErrorsHiddenLayer();

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchErrorBackward();
    }
  }

/* This clears all existing errors in the hidden layer */

  clearAllErrorsHiddenLayer(){
    for(var i = 0; i < neuralNet.layers[1].neurons.length; i++){
      neuralNet.layers[1].neurons[i].receivedErrors = [];
      neuralNet.layers[1].neurons[i].receivedWeightsError = [];
    }
  }

}
