export const requestToAuthorizationServer = () => {
  const clientId = process.env.VUE_APP_QIITA_CLIENT_ID;
  location.href = `http://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scope=read_qiita`;
};
