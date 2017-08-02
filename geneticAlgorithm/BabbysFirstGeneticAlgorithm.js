
/* First, set the target */
/* Then Create the initial generation */
/* Find the best of each generation */
/* Mate them */
/* Create a new generation based on the child */
/* Test that generation's success in meeting the target */
/* */
/* */

mutation = (targetOutput) => {

var generationCounter = 0;
var completed = false;

var target = targetOutput;
var currentGeneration = generateInitialStrings(10, target.length);

console.log(currentGeneration);

while(!completed){

  var matingPair = findBestPair(currentGeneration, determineFitness, target);
  var progenitor = mateStrings(matingPair);
  var nextGen = mutateStrings(progenitor, 5, currentGeneration.length, target);
  completed = testGenerationalViability(nextGen, determineFitness, target);
  currentGeneration = nextGen;
  generationCounter += 1;
  console.log(currentGeneration);
}

var resultConsole = document.getElementById('result');
resultConsole.innerHTML = "";
resultConsole.append("Achieved target in " + generationCounter + " generations");
console.log(currentGeneration);

return generationCounter;

}

/* Create the first generation */
/* */
/* */

generateInitialStrings = (generationSize, stringSize) => {

  var generationArray = [];

  for(var i = 0; i < generationSize; i++){

    var singleString = "";

    for(var j = 0; j < stringSize; j++){
      singleString = singleString + chooseLetter();
    }
    generationArray.push(singleString);
  }

  return generationArray;

}

/* Choose a random letter */
/* */
/* */

chooseLetter = () => {

  var luckyNumber = (Math.random()*100)/4;
  var caseDeterminant = 0;
  if(coinToss(Math.random())){
    luckyNumber += 1;
  }else{
    luckyNumber -= 1;
  }

  if(luckyNumber < 0){
    luckyNumber = 0;
  }else if(luckyNumber >= 25){
    luckyNumber = 25;
  }

  if(coinToss(Math.random())){
    caseDeterminant = 65;
  }else{
    caseDeterminant = 97;
  }

  return String.fromCharCode(luckyNumber + caseDeterminant)

}

/* Toss a two sided coin */
/* */
/* */

coinToss = (coin) => {

  if(coin <= 0.5){
    return true;
  }
  return false;

}

/* Compare the similarity between a sentence and the target */
/* */
/* */

determineFitness = (aspirant, target) => {

  var fitnessScore = 0;

  for(var i = 0; i < target.length; i++){
    if(aspirant.charCodeAt(i) === target.charCodeAt(i)){
      fitnessScore += 1;
    }
  }

  return fitnessScore;

}

/* Find the two closest pairs */
/* */
/* */

findBestPair = (generation, fitnessTest, target) => {

  var first = generation[0];
  var firstScore = 0;
  var second = generation[1];
  var secondScore = 0;
  var matingPair = [];

  for(var i = 0; i < generation.length; i++){
    var currentScore = fitnessTest(generation[i], target);

    if(currentScore > firstScore){
      firstScore = currentScore;
      first = generation[i];
    }else if(currentScore > secondScore){
      secondScore = currentScore;
      second = generation[i];
    }
  }

  matingPair.push(first);
  matingPair.push(second);

  return matingPair;

}

/* Randomly combine the letters of a pair of sentences */
/* */
/* */


mateStrings = (matingPair) => {

  var childString = "";

  for(var i = 0; i < matingPair[0].length; i++){
    if(coinToss(Math.random())){
      childString = childString + matingPair[0][i];
    }else{
      childString = childString + matingPair[1][i];
    }
  }

  return childString;

}

/* Randomly change letters in a generation of strings and return an array */
/* */
/* */

mutateStrings = (progenitor, mutationVariable, generationSize, target) => {

  var nextGeneration = [];
  for(var i = 0; i < generationSize; i++){

    var mutable = [];
    var sentence = "";

    for(var k = 0; k < progenitor.length; k++){
      mutable.push(progenitor[k]);
    }

    for(var j = 0; j < mutationVariable; j++){
      var mutatingPosition = Math.round(Math.random() * progenitor.length);
      var newLetter = chooseLetter();
      if(mutable[mutatingPosition] != target[mutatingPosition]){
        mutable[mutatingPosition] = chooseLetter();
      }
    }

    for(var k = 0; k < progenitor.length; k++){
      sentence = sentence + mutable[k];
    }
    nextGeneration.push(sentence);
  }

  return nextGeneration;

}

/* Test if a sentence in a generation matches */
/* */
/* */

testGenerationalViability = (generation, fitnessTest, target) => {

  for(var i = 0; i < generation.length; i++){
    if(fitnessTest(generation[i], target) == target.length){
      return true;
    }
  }
  return false;
}
