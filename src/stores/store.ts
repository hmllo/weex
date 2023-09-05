import { defineStore } from 'pinia'
import { setItem, getItem, removeItem } from '@/stores/storage'

interface Address {
    [key: string]: string
}

export const useStore = defineStore('main', {
  state: () => {
    return {
        account: '',
        address: {} as Address,
        isCoinbaseWallet: false,
        icons: {},
        coinlist: {},
        cb_eth: '',
        cb_usdt: '',
    }
  },
  actions: {
    setAccount(account: string) {
        this.account = account
        setItem('account', account)
    },
    getAccount() {
        return this.account || getItem('account')
    },
    setAddress(key: string, value: string) {
        this.address[key] = value
        setItem('address', this.address)
    },
    setIsCoinbaseWallet(isCoinbaseWallet: boolean) {
        this.isCoinbaseWallet = isCoinbaseWallet
        setItem('isCoinbaseWallet', isCoinbaseWallet)
    },
    setIcons(icons: any) {
        this.icons = icons
        setItem('icons', icons)
    },
    setCoinList(coinlist: any) {
        this.coinlist = coinlist
        setItem('coinlist', coinlist)
    },
    setEthBalance(cb_eth: any) {
        this.cb_eth = cb_eth
        setItem('cb_eth', cb_eth)
    },
    setUSDTBalance(cb_usdt: any) {
        this.cb_usdt = cb_usdt
        setItem('cb_usdt', cb_usdt)
    },
  }
})
