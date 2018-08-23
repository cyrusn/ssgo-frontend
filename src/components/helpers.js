import moment from 'moment'
export function createDownloadFile (data, filename, extname) {
  let blob = new Blob([data], {
    type: 'text/plain;charset=UTF-8'
  })
  let link = document.createElement('a')

  link.href = URL.createObjectURL(blob)

  let today = moment().format('YYYY-MM-DD_hh-mm-ss')

  link.download = `${filename}-${today}.${extname}`
  link.click()
}

export function downloadJSON (json, filename, extname) {
  let jsonData = JSON.stringify(json)
  createDownloadFile(jsonData, filename, extname)
}
