(async () => {
  const deployUtils = require("./deployUtils");

  const deployStage = process.env.DEPLOY_STAGE;
  if (deployUtils.isAllowedDeployStage(deployStage) === false) {
    return Promise.reject(
      new Error(
        "有効なステージではありません。local, dev, stg, prod が利用出来ます。"
      )
    );
  }

  const awsEnvCreator = require("@nekonomokochan/aws-env-creator");

  const params = {
    type: ".env",
    outputDir: "./",
    secretIds: deployUtils.findSecretIds(deployStage),
    profile: deployUtils.findAwsProfile(deployStage),
    region: "ap-northeast-1",
    outputWhitelist: [
      "BACKEND_URL",
      "QIITA_CLIENT_ID",
      "QIITA_CLIENT_SECRET",
      "QIITA_REDIRECT_URI"
    ],
    keyMapping: {
      BACKEND_URL: "VUE_APP_API_URL_BASE",
      QIITA_CLIENT_ID: "VUE_APP_QIITA_CLIENT_ID",
      QIITA_CLIENT_SECRET: "VUE_APP_QIITA_CLIENT_SECRET",
      QIITA_REDIRECT_URI: "VUE_APP_QIITA_REDIRECT_URI"
    },
    addParams: {
      VUE_APP_STAGE: deployStage
    }
  };

  await awsEnvCreator.createEnvFile(params);
})().catch(error => {
  console.error(error);
});
