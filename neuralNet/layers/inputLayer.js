class InputLayer {

  constructor() {

    /* This array holds all the nodes */
    this.neurons = [];

  }

  /* This populates the neurons array with specialized neurons */

  generateNeurons(layerSize){

    for(var i = 0; i < layerSize; i++){
      var newNeuron = new InputNeuron();
      this.neurons.push(newNeuron);
    }
  }

  /* This generates forward connections */

  generateConnections(){
    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].generateForwardSynapses(i);
    }
  }

/* This sends received inputs to the hidden layer after clearing all existing inputs */

  dispatchInputsForward(){

    this.clearAllInputsHiddenLayer();
  //  console.log('Hidden layer inputs after clearing by input layer');
//    console.log(neuralNet.layers[1].neurons);
  //  console.log(neuralNet.layers[1].neurons);

    for(var i = 0; i < this.neurons.length; i++){
      this.neurons[i].dispatchInput();
    }
  }

/* This clears all existing inputs in the hidden layer*/

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
