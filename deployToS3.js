const path = require('path')
const s3 = require('s3')
const AWS = require('aws-sdk')
const deployUtils = require('./deployUtils')

const deployStage = process.env.DEPLOY_STAGE
if (deployUtils.isAllowedDeployStage(deployStage) === false) {
  return Promise.reject(
    new Error(
      '有効なステージではありません。local, dev, stg, prod が利用出来ます。'
    )
  )
}

const credentials = new AWS.SharedIniFileCredentials({
  profile: deployUtils.findAwsProfile(deployStage)
})

const client = s3.createClient({
  s3Options: {
    region: 'ap-northeast-1',
    credentials
  }
})

const deploy = async () => {
  await new Promise((resolve, reject) => {
    const deleteParam = {
      Bucket: deployUtils.findDeployS3Bucket(deployStage)
    }
    const deleteDir = client.deleteDir(deleteParam)

    deleteDir.on('error', function(error) {
      console.error('unable to delete:', error.stack)
      reject(new Error('failed'))
    })

    deleteDir.on('progress', function() {
      console.log(
        'delete progress',
        deleteDir.progressAmount,
        deleteDir.progressTotal
      )
    })

    deleteDir.on('end', function() {
      console.log('done delete')
      resolve()
    })
  })

  const params = [
    {
      localDir: path.join(__dirname, '/.nuxt/dist/client'),
      s3Params: {
        Bucket: deployUtils.findDeployS3Bucket(deployStage),
        Prefix: '_nuxt'
      }
    },
    {
      localDir: path.join(__dirname, '/app/static'),
      s3Params: {
        Bucket: deployUtils.findDeployS3Bucket(deployStage)
      }
    }
  ]

  for (const param of params) {
    const uploader = client.uploadDir(param)

    uploader.on('error', function(error) {
      console.error('unable to sync:', error.stack)
    })

    uploader.on('progress', function() {
      console.log(
        'upload progress',
        uploader.progressAmount,
        uploader.progressTotal
      )
    })

    uploader.on('end', function() {
      console.log('done uploading')
    })
  }
}

deploy()
