const { Responder } = require('cote');
const jimp = require('jimp');
const path = require('path');

const response = new Responder({ name: 'servicio crear thumbnail' });

response.on('crear-thumbnail', async (req, done) => {
  let { imagePath } = req;
  
  let imagePathToConvert =
  "../nodepop/public" +
  imagePath.split(".")[1] +
  "." +
  imagePath.split(".")[2];

  const result = await jimp
    .read(imagePathToConvert)
    .then(thumbnail => {
      return thumbnail
        .resize(100, 100) 
        .quality(60) 
        .greyscale() 
        .writeAsync(
            `..${imagePathToConvert.split('.')[2]}_thumbnail.${imagePathToConvert.split('.')[3]}`,
        ); // saving the image
       
    })
    .catch(err => {
      console.error(err);
    });
    
  done(`.${imagePath.split('.')[1]}_thumbnail.${imagePath.split('.')[2]}`); // return the path to save in database
});
