const s3 = require("s3");
const path = require("path");
const AWS = require("aws-sdk");
const deployUtils = require("./deployUtils");

const deployStage = process.env.DEPLOY_STAGE;
if (deployUtils.isAllowedDeployStage(deployStage) === false) {
  return Promise.reject(
    new Error(
      "有効なステージではありません。local, dev, stg, prod が利用出来ます。"
    )
  );
}

const credentials = new AWS.SharedIniFileCredentials({
  profile: deployUtils.findAwsProfile(deployStage)
});

const client = s3.createClient({
  s3Options: {
    region: "ap-northeast-1",
    credentials: credentials
  }
});

const params = {
  localDir: path.join(__dirname, "/dist"),
  deleteRemoved: true,
  s3Params: {
    Bucket: `${deployStage}-qiita-stocker-frontend`
  }
};

const uploader = client.uploadDir(params);

uploader.on("error", function(error) {
  console.error("unable to sync:", error.stack);
});

uploader.on("progress", function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});

uploader.on("end", function() {
  console.log("done uploading");
});
