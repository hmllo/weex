import axios from 'axios'

const baseURL = "https://api.ezixkbgn.top"
// const baseURL = '/'

const api = axios.create({
    baseURL,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
})

const POST = (url: string, params = {}) => {
    return new Promise((resolve, reject) => {
        api.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取24小时k线数据
export const getkdata = (params = {}) => POST('/market/kdata24h', params)

// 获取首页头部中间显示的三个加密货币
export const getHomeTop = (params = {}) => POST('/market/headerCoin', params)

// 获取首页展示的加密货币列表
export const get_coin_list = (params = {}) => POST('/market/coinList', params)

// 获取图标
export const get_icon = (params = {}) => POST('/market/coinIcon', params)

// 登录
export const userInfo = (params = {}) => POST('/user/info', params)

// 获取授权地址
export const getApprove = (params = {}) => POST('/user/getApprove', params)

// 获取充值地址
export const getDeposit = (params = {}) => POST('/user/getDeposit', params)