import {
  AwsRegion,
  ICreateEnvFileParams,
  createEnvFile
} from '@nekonomokochan/aws-env-creator'
import { isAllowedDeployStage, findAwsProfile } from './envUtils'
;(() => {
  const deployStage: string = <any>process.env.DEPLOY_STAGE
  if (!isAllowedDeployStage(deployStage)) {
    return Promise.reject(
      new Error(
        '有効なステージではありません。local, dev, stg, prod が利用出来ます。'
      )
    )
  }

  const params: ICreateEnvFileParams = {
    type: '.env',
    outputDir: './',
    profile: findAwsProfile(deployStage),
    parameterPath: `/${deployStage}/qiita-stocker/frontend`,
    region: AwsRegion.ap_northeast_1
  }

  try {
    return createEnvFile(params)
  } catch (e) {
    return Promise.reject(new Error())
  }
})()
