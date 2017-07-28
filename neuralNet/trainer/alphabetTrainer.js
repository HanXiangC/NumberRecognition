convertBinary = (binaryArray) => {
  var sum = 0;
  if(binaryArray[3] == 1){
    sum = sum + 1;
  }
    if(binaryArray[2] == 1){
    sum = sum + 2;
  }
    if(binaryArray[1] == 1){
    sum = sum + 4;
  }
    if(binaryArray[0] == 1){
    sum = sum + 8;
  }
  return sum;
}

function coinToss() {

  if(Math.random() > 0.5){
    return 1;
  }else{
    return 0;
  }

}

function generateInputSample(){
  var newSample = [];
  for(var i = 0; i < 4; i++){
    newSample.push(coinToss());
  }
  return newSample;
}

function assignOutput(inputSample){
  var outputArray = [];
  for(var i = 0; i < 15; i++){
    outputArray.push(0);
  }
  var answer = convertBinary(inputSample);
  if(answer != 0){
    outputArray[answer - 1] = 1;
  }

  return [inputSample, outputArray];
}

function generateTrainingSet(size){
  var trainingSet = [];
  for(var i = 0; i < size; i++){
    var newInput = [];
    newInput = generateInputSample();
    var newSample = assignOutput(newInput);
    trainingSet.push(newSample);
  }
  return trainingSet;
}
