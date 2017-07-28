class HiddenLayer {

  constructor() {


    /* These do nothing more than assign numbers of nodes per layer */
    this.neurons = [];

  }

  generateNeurons(layerSize){

    for(var i = 0; i < layerSize; i++){
      var newNeuron = new HiddenNeuron();
      this.neurons.push(newNeuron);
    }
  }

  /* This generates forward connections */

  generateConnections(){
    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].generateForwardSynapses(i);
    }
  }

/* This sends activation signals to the output layer after clearing all existing inputs */

  dispatchSignalForward(){

    this.clearAllInputsOutputLayer();

    //console.log('Output layer inputs after clearing by hidden layer');
  //  console.log(neuralNet.layers[2].neurons);
  //  console.log(neuralNet.layers[2].neurons);

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchSignalForward();
    }
  }

/* This clears all existing inputs in the output layer */

  clearAllInputsOutputLayer(){
    for(var i = 0; i < neuralNet.layers[2].neurons.length; i++){
      neuralNet.layers[2].neurons[i].receivedInputs = [];
      neuralNet.layers[2].neurons[i].receivedWeights = [];
    }
  }

/* This dispatches errors to the input layer */

  dispatchErrorBackward(){

    this.clearAllErrorsInputLayer();

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchErrorBackward();
    }
  }

  /* This clears all existing errors in the input layer */

  clearAllErrorsInputLayer(){
    for(var i = 0; i < neuralNet.layers[0].neurons.length; i++){
      neuralNet.layers[0].neurons[i].receivedErrors = [];
      neuralNet.layers[0].neurons[i].receivedWeightsError = [];
    }
  }
}
