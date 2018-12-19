// ====导出为zip
export function zip_down(header,value,list){
  require.ensure([], () => {
    const { export_txt_to_zip } = require('@/vendor/Export2Zip')
    const tHeader = header
    const filterVal = value
    const list = list
    const data =function formatJson(filterVal, list){
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
    return  export_txt_to_zip(tHeader, data, '列表文本', '压缩文本')
  })
}
// 导出为表格
export function excel_down(header,value,list){
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/vendor/Export2Excel')
    const tHeader = header
    const filterVal = value
    const list = list
    const data =function formatJson(filterVal, list){
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
    // const data = this.formatJson(filterVal, list)
    return export_json_to_excel(tHeader, data, '列表文本', '压缩文本')
  })
}
// formatJson(filterVal, jsonData){
//   return jsonData.map(v => filterVal.map(j => v[j]))
// }
