
function generateXORTraining(size) {

  var trainingSet = generateInput(size);
  return trainingSet;
}

function generateInput(setSize){

  var trainingSet = [];

  for(var i = 0; i < setSize; i++){

    var newSample = [];
    var newInput = [];

    newInput[0] = coinToss();
    newInput[1] = coinToss();

    newSample.push(newInput);
    newSample.push(setOutput(newInput));

    trainingSet.push(newSample);
  }

  return trainingSet;
}

function setOutput(rawTrainingSet){

    if(rawTrainingSet[0] == 0 && rawTrainingSet[1] == 0){
      return [0];
    }else if(rawTrainingSet[0] == 1 && rawTrainingSet[1] == 1){
      return [0];
    }else{
      return [1];
    }
  }

function coinToss() {

  if(Math.random() > 0.5){
    return 1;
  }else{
    return 0;
  }

}
