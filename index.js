const fs = require('fs')
const Excel = require('exceljs')
const ObjectsToCsv = require('objects-to-csv');

module.exports = class Writer {
  constructor(arr, filename) {
    this.arr = arr
    this.filename = filename
    this.columns = function (key_arr) {
      let excel_columns = []
      key_arr.forEach(function (element) {
        excel_columns.push({
          header: element[0].toUpperCase() + element.slice(1),
          key: element,
          width: 20
        })
      });
      return excel_columns
    }
  }

  write(ext) {
    const path = `./result_data/${this.filename}.${ext}`
    if (ext === 'json') {
      fs.writeFile(path, JSON.stringify(this.arr, null, 4), function (error) {
        if (error) return console.log(error);
        let size = fs.statSync(path).size
        if (size !== 0) {
          console.log(`Data recorded successfully, file size: ${size} bytes`)
        }
      })
    } else if (ext === 'xlsx') {
      let keys_array = Object.keys(this.arr[0])
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet('Sheet 1');
      worksheet.columns = this.columns(keys_array)
      this.arr.forEach(function (obj) {
        worksheet.addRow(obj)
      })
      workbook.xlsx.writeFile(path).then(() => {
        let size = fs.statSync(path).size
        if (size !== 0) {
          console.log(`Data recorded successfully, file size: ${size} bytes`)
        }
      })
        .catch(error => console.log(error))
    } else if (ext === 'csv') {
      (async () => {
        const csv = new ObjectsToCsv(this.arr);
        await csv.toDisk(path, {append: false});
        let size = fs.statSync(path).size
        if (size !== 0) {
          console.log(`Data recorded successfully, file size: ${size} bytes`)
        } else {
          console.log('An error has occurred')
        }
      })()
    } else {
      console.log('Incorrect file extension or it is not supported')
    }
  }
}
