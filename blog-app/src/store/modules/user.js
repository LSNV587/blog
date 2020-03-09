// import {getToken, setToken, removeToken} from '@/request/token' 
import {LoginByUsername, getUserInfo, logout, register} from '@/api/login'
import { getToken,setToken, removeToken} from '@/utils/auth'
const user = {
  state: {
    id: '',
    account: window.sessionStorage.getItem('account') ? JSON.parse(window.sessionStorage.getItem('account')) : '',
    name: '',
    avatar: '',
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
      window.sessionStorage.setItem('account', JSON.stringify('account'))
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {  
      state.id = id
    }
  },
  actions: {
    LoginByUsername({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        LoginByUsername(userInfo).then(data => {
          commit('SET_TOKEN', data.data['Oauth-Token'])
          setToken(data.data['Oauth-Token'])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this
      return new Promise((resolve, reject) => {
        getUserInfo().then(data => {
          if (data.data) {
            commit('SET_ACCOUNT', data.data.account)
            commit('SET_NAME', data.data.nickname)
            commit('SET_AVATAR', data.data.avatar)
            commit('SET_ID', data.data.id)
          } else {
            commit('SET_ACCOUNT', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
            removeToken()
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {

          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ID', '')
          removeToken()
          resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ACCOUNT', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        register(user.account, user.nickname, user.password).then((data) => {
          commit('SET_TOKEN', data.data['Oauth-Token'])
          setToken(data.data['Oauth-Token'])
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}
export default user
// import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken, getUserName, setUserName, removeUserName } from '@/utils/auth'
// import { refreshAccessToken } from '@/api/qiniu'

// const user = {
//   state: {
//     user: '',
//     userOrg: {},
//     status: '',
//     code: '',
//     token: getToken(),
//     refreshToken: getRefreshToken(),
//     name: getUserName(),
//     avatar: '',
//     introduction: '',
//     roles: [],
//     setting: {
//       articlePlatform: []
//     }
//   },

//   mutations: {
//     SET_CODE: (state, code) => {
//       state.code = code
//     },
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//     SET_REFRESHTOKEN: (state, token) => {
//       state.refreshToken = token
//     },
//     SET_INTRODUCTION: (state, introduction) => {
//       state.introduction = introduction
//     },
//     SET_SETTING: (state, setting) => {
//       state.setting = setting
//     },
//     SET_STATUS: (state, status) => {
//       state.status = status
//     },
//     SET_NAME: (state, name) => {
//       state.name = name
//     },
//     SET_USERORG: (state, userOrg) => {
//       state.userOrg = userOrg
//     },
//     SET_AVATAR: (state, avatar) => {
//       state.avatar = avatar
//     },
//     SET_ROLES: (state, roles) => {
//       state.roles = roles
//     }
//   },

//   actions: {
//     // 登录
//     LoginByUsername({ commit }, loginData) {
//       return new Promise((resolve, reject) => {
//         loginByUsername(loginData).then(response => {
//           if (response.data.success) {
//             let data = response.data.data
//             if (typeof data === 'string') {
//               data = JSON.parse(data)
//             }
//             // const data = JSON.parse(response.data.data)
//             commit('SET_TOKEN', data.access_token)
//             setToken(data.access_token)
//             commit('SET_REFRESHTOKEN', data.refresh_token)
//             setRefreshToken(data.refresh_token)
//             commit('SET_NAME', loginData.username)
//             setUserName(loginData.username)
//             resolve()
//           } else {
//             reject()
//           }
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 刷新access_token
//     RefreshAccessToken({ commit }) {
//       return new Promise((resolve, reject) => {
//         refreshAccessToken().then(response => {
//           // const data = JSON.parse(response.data.data)
//           let data = response.data.data
//           if (typeof data === 'string') {
//             data = JSON.parse(data)
//           }
//           commit('SET_TOKEN', data.access_token)
//           setToken(data.access_token)
//           resolve(data.access_token)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 获取用户信息
//     GetUserInfo({ commit }) {
//       return new Promise((resolve, reject) => {
//         getUserInfo().then(response => {
//           const data = response.data.data
//           if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
//             var roles = []
//             for (const i in data.roles) {
//               if (data.roles.hasOwnProperty(i)) {
//                 roles.push(data.roles[i].name)
//               }
//             }
//             commit('SET_ROLES', roles)
//             commit('SET_NAME', data.user.username)
//             setUserName(data.user.username)
//             commit('SET_USERORG', data.attributes.user_organization)
//           } else {
//             reject('getInfo: roles must be a non-null array !')
//           }
//           resolve(response)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 用户 登出
//     LogOut({ commit, state }) {
//       return new Promise((resolve, reject) => {
//         logout().then(() => {
//           commit('SET_TOKEN', '')
//           commit('SET_REFRESHTOKEN', '')
//           commit('SET_ROLES', [])
//           removeToken()
//           removeRefreshToken()
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 前端 登出
//     FedLogOut({ commit }) {
//       return new Promise(resolve => {
//         commit('SET_TOKEN', '')
//         removeToken()
//         commit('SET_REFRESHTOKEN', '')
//         removeRefreshToken()
//         commit('SET_NAME', '')
//         removeUserName()
//         resolve()
//         window.sessionStorage.clear()
//       })
//     },

//     // 动态修改权限
//     ChangeRoles({ commit }, role) {
//       return new Promise(resolve => {
//         commit('SET_TOKEN', role)
//         setToken(role)
//         getUserInfo(role).then(response => {
//           const data = response.data
//           commit('SET_ROLES', data.roles)
//           commit('SET_NAME', data.name)
//           commit('SET_AVATAR', data.avatar)
//           commit('SET_INTRODUCTION', data.introduction)
//           resolve()
//         })
//       })
//     }
//   }
// }

// export default user
