import RNFS from 'react-native-fs';

const downloadPDF = () => {
  RNFS.readDir(RNFS.MainBundlePath)
  .then(result =>
   // console.table(result);

    // stat the first file
     Promise.all([RNFS.stat(result[0].path), result[0].path]))
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }

    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.table(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });
};

export { downloadPDF };
