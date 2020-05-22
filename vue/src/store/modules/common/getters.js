export default {
  getGoogleApiKey: state => state.GOOGLE_API_KEY,
  getGoogleClientId: state => state.GOOGLE_CLIENT_ID,
  getGoogleClientSecretId: state => state.GOOGLE_CLIENT_SECRET_ID,

  getNaverClientId: state => state.NAVER_CLIENT_ID,
  getNaverClientSecretId: state => state.GOOGLE_CLIENT_SECRET_ID,

  getContentLoading: state => state.contentLoading,

  getHost: state => state.host,
  getLoginCheck: state => state.login_check,
  getExcludePath: state => state.exclude_path,
  getUserInfo: state => state.user_info
}
