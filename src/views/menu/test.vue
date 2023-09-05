<template>
    <div>
        <h2>ETH</h2>
        <p>当前账号: {{ account }}</p>
        <p>链id： {{ chainId }}</p>
        <p>eth余额: {{ eth_balance }}</p>
    </div>
    <hr>
    <div>
        <h2>USDT</h2>
        <p>当前账号: {{ usdt_account }}</p>
        <p>链id: {{ chainId }}</p>
        <p>名称: {{ usdt_name }}</p>
        <p>标识: {{ usdt_symbol }}</p>
        <p>发行量: {{ usdt_totalSupply }}</p>
        <p>持有数量: {{ usdt_erc20 }}</p>
    </div>
</template>
    
<script setup lang='ts'>
import { ethereum, web3 } from '@/init/app'
import { useStore } from '@/stores/store'
import { ref } from 'vue'

const store = useStore()

const chainId = ref('')
const account = ref('')
const eth_balance = ref('')
const eth_total = ref('')


const usdt_account = ref('')
const usdt_erc20 = ref('')
const usdt_name = ref('')
const usdt_symbol = ref('')
const usdt_totalSupply = ref('')

const isCoinbaseWallet = store.isCoinbaseWallet



// 获取账号和ETH余额
const getAccount = () => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
        const accounts : string[] = response as string[];
        web3.eth.defaultAccount = accounts[0]
        store.setAccount(accounts[0])
        account.value = accounts[0]

        web3.eth.getBalance(account.value).then((ret: any) => {
            console.log(`eth余额: ${ret} wei`);
            eth_balance.value = web3.utils.fromWei(ret, 'ether')
        })

        web3.eth.getChainId().then((ret: any) => {
            console.log(`chainId: ${ret}`);
            chainId.value = ret
        })
        usdt_erc20_balance(account.value)
    }).catch((err) => {})
}

// 获取gorli测试网余额
const getGorliAccount = () => {
    // gorli_web3.eth.getBalance(account.value).then((ret: any) => {
    //     gorli_balance.value = gorli_web3.utils.fromWei(ret, 'ether')
    // })
}

// 获取USDT ERC20余额
const usdt_erc20_balance = async (addressToCheck: string) => {
    let accounts = await web3.eth.requestAccounts()
    usdt_account.value = accounts[0]

    let tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    const abi: any = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
    // console.log(abi);
    
    var contract = new web3.eth.Contract(abi, tokenAddress)
    console.log(`addressToCheck: ${addressToCheck}`);
    //@ts-ignore
    let u = await contract.methods.balanceOf(addressToCheck).call()
    usdt_erc20.value = web3.utils.fromWei(`${u}`, 'mwei')

    usdt_name.value = await contract.methods.name().call()
    usdt_symbol.value = await contract.methods.symbol().call()
    usdt_totalSupply.value = await contract.methods.totalSupply().call()
    usdt_totalSupply.value = web3.utils.fromWei(`${usdt_totalSupply.value}`, 'mwei')
    
    // contract.methods.balanceOf(addressToCheck).call({from: addressToCheck}).then(console.log)
}

// const usdt_erc20_balance = () => {
    // eth.request({
    //     method: 'wallet_switchEthereumChain',
    //     params: [{ chainId: Web3.utils.toHex(5) }]
    // }).then((res: any) => {
    //     console.log(res)
    // })
// }

if (isCoinbaseWallet) {
    // Use eth_requestAccounts
    getAccount()
    getGorliAccount()
    // chainId.value = ethWeb3.eth.defaultChain
    
    // usdt_erc20_balance()
}


</script>
    
<style>
    
</style>