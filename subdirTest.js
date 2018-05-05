const fs = require('fs');
const parser = require('subtitles-parser');

const dirPath = 'srtTest/';
const outputPath = 'output/';

//Directory Reader
const directoryReader = () => {
  fs.readdir(dirPath, (err, filesPath) => {
    console.log('Reading directory...');
    if (err) throw err;

    filesPath = filesPath.map(filePath => {
      // fileArr.push(filePath);
      // dirPathArr.push(dirPath);
      return dirPath + filePath;
      console.log(filesPath);
    });
    filesPath.map(filePath => {
      let subData = getSubData(filePath);
      console.log(subData);

      generateSub2TSV(subData, filePath);
    });
  });
};

directoryReader();

//Formats Srt file data into Object for Parsing
const getSubData = filePath => {
  let srt = fs.readFileSync(filePath, 'utf8');
  let data = parser.fromSrt(srt);
  return data;
};

//subtitle => TSV
const generateSub2TSV = (data, filePath) => {
  console.log(filePath);
  //regex to change path from source to output
  filePath = filePath.replace(/srtTest\//, outputPath);

  //Loop through and append each sub to TSV file
  data.forEach(sub => {
    let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${sub.text}\n`;
    let sortedOutput = output.sort((a, b) => {
      return a[0] - b[0];
    });
    fs.appendFile(`./${filePath}.tsv`, sortedOutput, err => {
      if (err) return;
    });
  });
};
