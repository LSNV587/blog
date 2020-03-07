const getters = {
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  name: state => state.user.name
}
export default getters