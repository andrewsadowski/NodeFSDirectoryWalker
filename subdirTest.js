const fs = require('fs');
const parser = require('subtitles-parser');

const dirPath = 'srtTest/';
const dataAdd = 'ADDING ENGLISH';

//Directory Reader
const directoryReader = () => {
  let fileArr = [];
  let dirPathArr = [];

  fs.readdir(dirPath, (err, filesPath) => {
    console.log('Reading directory...');
    if (err) throw err;

    filesPath = filesPath.map(filePath => {
      // fileArr.push(filePath);
      // dirPathArr.push(dirPath);
      console.log(fileArr, dirPathArr);
      return dirPath + filePath;
      console.log({ dirPath, filePath });
    });

    console.log(filesPath);

    filesPath.map(filePath => {
      // console.log(filePath);
      let subData = getSubData(filePath);
      // console.log(subData);
      generateSub2TSV(subData, filePath);
      // generateSub2TSV(filePath);

      // fs.appendFile(filePath, dataAdd, err => {
      //   if (err) throw err;
      //   console.log(`${filePath} has been appended`);
      // });
    });
  });
};

directoryReader();

const getSubData = filePath => {
  let srt = fs.readFileSync(filePath, 'utf8');
  //Stores contents of subtitle file to array//
  let data = parser.fromSrt(srt);

  return data;
};

//subtitle => TSV
const generateSub2TSV = (data, filePath) => {
  //Parse subtitle

  data.forEach(sub => {
    let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${sub.text}\n`;
    // console.log(output);
    // let newPath = filepath.replace(//, /g)
    fs.appendFile(`./${filePath}.tsv`, output, err => {
      if (err) return;
    });
  });
};
