
/*
This processes a file from the local directory into a data URL
and sends it to image processsing for conversion into a pixel density array as a training sample.
*/

processFiles = (sendToProcessing) => {
  var fileInput = document.getElementById('imageUpload');

  for (var i = 0; i < fileInput.files.length; i++) {
     var reader = new FileReader();
     reader.onloadend = function(output){
       console.log(output);
         console.log('output', output.target.result)
         sendToProcessing(output.target.result, imagingTrainer.sendToNeuralNetTraining);
     }.bind(this);
     reader.readAsDataURL(fileInput.files[i])

 }
}

/*
This processes a file from the local directory into a data URL
and sends it to image processsing for conversion into a pixel density array as a test sample.
*/

processFiles2 = (sendToProcessing) => {
  var fileInput = document.getElementById('imageUpload2');

  for (var i = 0; i < fileInput.files.length; i++) {
     var reader = new FileReader();
     reader.onloadend = function(output){
       console.log(output);
         console.log('output', output.target.result)
         sendToProcessing(output.target.result, imagingTrainer.sendToNeuralNet);
     }.bind(this);
     reader.readAsDataURL(fileInput.files[i])

 }
}
