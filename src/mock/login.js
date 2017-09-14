import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '나는 최고 관리자이다.',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '나는 편집인이다.',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '나는 개발 중이다.',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '왕 엔지니어'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return Promise.reject('error')
    }
  },
  logout: () => 'success'
}
