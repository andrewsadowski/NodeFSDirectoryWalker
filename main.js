const fs = require('fs');

const dirPath = 'test/';
const dataAdd = 'ADDING ENGLISH';

fs.readdir(dirPath, (err, filesPath) => {
  console.log('Reading directory...');
  if (err) throw err;
  filesPath = filesPath.map((filePath) => {
    return dirPath + filePath;
    console.log({dirPath, filePath});
  })
  console.log(filesPath)

  filesPath.map(filePath => {
    fs.appendFile(filePath, dataAdd, (err) => {
      if (err) throw err 
      console.log(`${filePath} has been appended`)
      }
    )
  })

})