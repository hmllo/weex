// 初始化coinbase和web3
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import Web3 from "web3"

const APP_NAME = "Coinbase Wallet SDK Vue.js Example"
const APP_LOGO_URL = "https://www.coinbase.com/img/favicon/favicon-120.png"
const DEFAULT_ETH_JSONRPC_URL = "https://mainnet.infura.io/v3/8087fd38310d4a8781e1d75137ee06ad"
const DEFAULT_CHAIN_ID = 1

const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false
})

// coinbase ethereum
const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
// coinbase web3
const web3 = new Web3(ethereum as any)

export { ethereum, web3 }
