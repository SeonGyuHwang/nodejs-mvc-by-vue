import Vue from 'vue'

window.axiosInstance = () => {
  let loading, container
  const instance = axios.create({
    baseURL: `/api`,
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  instance.interceptors.request.use(config => {
    if( Vue.$cookie.get("user_info") )
      config.headers['Access-Token'] = Vue.$cookie.get("user_info")
    container = window._loading_container || config.container

    if( config.noLoading !== true ) {
      loading = Vue.$loading.show({
        container: container || null,
        canCancel: true,
        color: '#ffffff',
        backgroundColor: '#000000'
      })
    }

    return config;
  }, err => {
    console.log("axios req:err", err)
    alert("Error! ("+err.message+")")
    window._loading_container = null

    if( loading )
      loading.hide()

  });

  instance.interceptors.response.use(response => {
    window._loading_container = null

    if( loading )
      loading.hide()

    return response;
  }, err => {
    console.log("axios res:err", err)
    alert("Error! ("+err.message+")")
    window._loading_container = null

    if( loading )
      loading.hide()

  });

  return instance
}

export function userLoginCheckAPI () {
  return new Promise((resolve, reject) => {
    return axiosInstance().get(`/auth/loginCheck`)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
export function userLoginAPI (payload) {
  return new Promise((resolve, reject) => {
    return axiosInstance().post(`/auth/loginProc`, payload)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
export function userLogoutAPI () {
  return new Promise((resolve, reject) => {
    return axiosInstance().post(`/auth/logoutProc`)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
