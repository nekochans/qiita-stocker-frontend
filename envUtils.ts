/**
 * 許可されたデプロイステージかどうか判定する
 *
 * @param deployStage
 * @return {boolean}
 */
export const isAllowedDeployStage = (deployStage: string): boolean =>
  deployStage === 'local' ||
  deployStage === 'dev' ||
  deployStage === 'stg' ||
  deployStage === 'prod'

/**
 * AWSのプロファイル名を取得する
 *
 * @return {string}
 */
export const findAwsProfile = (deployStage: string): string => {
  if (deployStage === 'prod') {
    return 'qiita-stocker-prod'
  }

  return 'qiita-stocker-dev'
}
