import fs from 'fs'
import moment from 'moment'
// var fs = require('fs')
// var moment = require('moment')

// function buildData () {
//   const now = moment()
//   return new Promise((resolve, reject) => {
//     var data = {
//       category: "arm",
//       disc: "情報のレベライズ01",
//       goal: "サーブの向上",
//       id: 1,
//       part: "打つ時の幅",
//       useTime: "22",
//       createAt: '',
//     }
//     let reData = []
//     for (let index = 0; index < 30; index++) {
//      data.disc = '情報のレベライズ0'+ index
//      data.id = index
//      data.createAt = moment(now.format()).subtract(index,'d')
//      reData = [...reData,data]
//     }
//      console.log(reData)
//      resolve(reData)
//   })
// }

function createFile(pathName) {
  const now = moment()

  var rePostData = []
  var reObData = []
  for (let index = 1; index <= 400; index++) {
    rePostData.push({
      category: 'arm',
      disc: '情報のレベライズ0' + index,
      goal: 'サーブの向上',
      id: index,
      part: '打つ時の幅',
      useTime: '22',
      inspection: false,
      createAt: moment(now.format()).subtract(index, 'd'),
    })
    reObData.push({
      id: index,
      title: '方法利用後の結果0' + index,
      href: 'http://',
      disc: 'サーブの向上',
      differenceInfo: '',
      result: '',
      methodId: '',
      goalRate: '0',
      goalScore: 0,
      playScore: 0,
    })
  }

  fs.writeFile(
    pathName,
    JSON.stringify({ post: rePostData, observer: reObData }, null, 2),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('_______________________完了_______________________')
      }
    }
  )
}

createFile('data.json')
