/**
 * 許可されたデプロイステージかどうか判定する
 *
 * @param deployStage
 * @return {boolean}
 */
exports.isAllowedDeployStage = deployStage => {
  return (
    deployStage === 'local' ||
    deployStage === 'dev' ||
    deployStage === 'stg' ||
    deployStage === 'prod'
  )
}

/**
 * SecretIdsを取得する
 *
 * @param deployStage
 * @return {string[]}
 */
exports.findSecretIds = deployStage => {
  return [`${deployStage}/qiita-stocker`]
}

/**
 * AWSのプロファイル名を取得する
 *
 * @param deployStage
 * @return {string}
 */
exports.findAwsProfile = deployStage => {
  if (deployStage === 'prod') {
    return 'qiita-stocker-prod'
  }

  return 'qiita-stocker-dev'
}

/**
 * デプロイ先のS3Bucket名を取得する
 *
 * @param deployStage
 * @return {string}
 */
exports.findDeployS3Bucket = deployStage => {
  return `${deployStage}-qiita-stocker-nuxt`
}
