
class NeuralNet {

  constructor(type) {

    this.type = type;

    /* This array contains the layers of the neural network */

    this.layers = [];

    /* This array was used for basic tests */

    this.testInput = [];

    /* This array was used for a single image test */

    this.image = [];

    /* This array was used for image training */

    this.trainingImages = [];

  }


  activateNetwork(){
    this.generateNetwork();

  }

  feedForwardCycle(){
    this.layers[0].dispatchInputsForward();
    this.layers[1].dispatchSignalForward();
    this.layers[2].produceOutput();
  }

  backpropagationCycle(){
    this.layers[2].dispatchErrorBackward();
    this.layers[1].dispatchErrorBackward();
    this.layers[0].processErrorsAndReset();
  }

  /* Call all generation functions in order */

  generateNetwork(){

/*
      this.generateInputLayer(4);
      this.generateHiddenLayer(32);
      this.generateOutputLayer(15); */

      this.generateInputLayer(576);
      this.generateHiddenLayer(104);
      this.generateOutputLayer(10);

    this.generateConnections();
  }

  /* Generate Connections */

  generateConnections(){
    this.layers[0].generateConnections();
    this.layers[1].generateConnections();
  }

  /* Generate layers */

  generateInputLayer(size){

    var inputLayer = new InputLayer();
    inputLayer.generateNeurons(size);

    this.layers[0] = inputLayer;

  }

  generateHiddenLayer(size){

    var hiddenLayer = new HiddenLayer();
    hiddenLayer.generateNeurons(size);

    this.layers[1] = hiddenLayer;

  }

  generateOutputLayer(size){

    var outputLayer = new OutputLayer();
    outputLayer.generateNeurons(size);

    this.layers[2] = outputLayer;

  }

}
