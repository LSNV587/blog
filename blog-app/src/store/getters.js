const getters = {
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  name: state => state.user.name,
  account: state => state.user.account,
  avatar: state => state.user.avatar,
  id: state => state.user.id
}
export default getters