import RNFS, {writeFile, readFile} from 'react-native-fs';
import XLSX from 'xlsx';

export const SaveExcel = (arr) => {

  console.log('@aditya',arr);
  
  const file = RNFS.ExternalDirectoryPath + '/test.xlsx';
  console.log('@aditya',file);
  
  let worksheet = XLSX.utils.json_to_sheet(arr);
  let new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, worksheet, 'SheetJS');
  const wbout = XLSX.write(new_workbook, {type: 'binary', bookType: 'xlsx'});
  writeFile(file, wbout, 'ascii')
    .then(r => {
      alert('done');
    })
    .catch(e => {
      alert('err',e,'as');
    });
};
