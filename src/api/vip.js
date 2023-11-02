import { post, get } from '@/utils/request'

// 会员信息服务接口
export const ServeVipInfo = () => {
  return get('/api/v1/vip/info')
}

// 生成密钥服务接口
export const ServeGenerateSecretKey = () => {
  return get('/api/v1/vip/generate_secret_key')
}

// 会员权益服务接口
export const ServeVips = () => {
  return get('/api/v1/vip/vips')
}
