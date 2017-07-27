sumWeightsAndInputs = (weightArray, inputArray) => {

  var sum = 0;

  for(var i = 0; i < weightArray.length; i++){
    var weightAndSignal = 0;

    weightAndSignal += (weightArray[i] * inputArray[i]);

    sum += weightAndSignal;
  }

  return sum;
}

divideWeightsAndInputs = (weightArray, inputArray) => {

  var sum = 0;

  for(var i = 0; i < weightArray.length; i++){
    var weightAndSignal = 0;

    weightAndSignal += (weightArray[i] / inputArray[i]);

    sum += weightAndSignal;
  }

  return sum;
}

addBias = (sum, bias) => {

  return sum + bias;

}


sigmoidFunction = (Z) => {

  var A = 1 / (1 + Math.exp(-Z));
  return A;

}


sigmoidPrime = (Z) => {
  return sigmoidFunction(Z) * (1 - sigmoidFunction(Z))
}

calculateErrorOutputLayer = (target, inverseSigmoid, A) => {

}
