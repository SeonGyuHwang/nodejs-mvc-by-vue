export function getRowAPI (payload) {
  return new Promise((resolve, reject) => {
    return axiosInstance().get(`/board/getDataRow`, payload)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
export function setRowAPI (payload) {
  return new Promise((resolve, reject) => {
    return axiosInstance().post(`/board/saveData`, payload)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
export function delRowAPI (payload) {
  return new Promise((resolve, reject) => {
    return axiosInstance().delete(`/board/deleteData`, payload)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
export function getListAPI (payload) {
  payload.noLoading = true

  return new Promise((resolve, reject) => {
    return axiosInstance().get(`/board/getDataList`, payload)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
