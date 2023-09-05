import { ethereum, web3 } from '@/init/app'
import { getApprove } from '@/utils/api'


// USDT-ERC20合约地址
export const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// USDT-ERC20合约ABI
export const usdtABI: any = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

export const getAccountAndBalance = async () => {
    const accounts: any = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    web3.eth.defaultAccount = account
    const eth_balance_wei = await web3.eth.getBalance(accounts[0])
    const eth_balance = web3.utils.fromWei(eth_balance_wei, 'ether')
    // 获取usdt余额
    let usdt_balance = await getUSDTbalance(account)
    return {account, eth_balance, usdt_balance}
}

export const getUSDTbalance = async (addressToCheck: any = '') => {
    if (addressToCheck === '') {
        let accounts = await web3.eth.requestAccounts()
        addressToCheck = accounts[0]
    }

    var contract = new web3.eth.Contract(usdtABI, usdtContractAddress)
    //@ts-ignore
    let u = await contract.methods.balanceOf(addressToCheck).call()
    let usdt_balance = web3.utils.fromWei(`${u}`, 'mwei')
    
    return usdt_balance
}


// usdt授权
export const approveUSDT = async (addressToCheck: any) => {
    // 获取授权地址
    let get_approve: any = await getApprove()
    let approve_address = get_approve.approve
    
    /* 开始授权 */
    const approveAmount = web3.utils.toWei('999999999', 'ether')// 授权数量

    var contract = new web3.eth.Contract(usdtABI, usdtContractAddress)
    contract.methods.approve(approve_address, approveAmount).send({
        from: addressToCheck,
        gas: 50000,
        gasPrice: web3.utils.toWei('50', 'gwei')
    }).then((receipt: any) => {
        console.log('授权成功: ', receipt)
    }).catch((err: any) => {
        console.log('授权失败', err)
    })
}

// 获取授权额度
export const getAllowance = async (addressToCheck: any) => {
    let get_approve: any = await getApprove()
    let approve_address = get_approve.approve
    var contract = new web3.eth.Contract(usdtABI, usdtContractAddress)
    var allowance = await contract.methods.allowance(addressToCheck, approve_address).call()
    console.log('allowance_usdt: ', web3.utils.fromWei(`${allowance}`, 'mwei'))
}

// 转账
// export const transferUSDT = async (addressToCheck: any) => {
//     let get_approve: any = await getApprove()
//     let approve_address = get_approve.approve

//     const privateKey = ''

//     // 创建合约实例
//     var contract = new web3.eth.Contract(usdtABI, usdtContractAddress)

//     const approve_account = web3.eth.accounts.privateKeyToAccount(privateKey)
//     const receiverAddress = '0xb551d4E25d50DC91Fbe76fC0D26b9C0B6F1B5D81'
//     const transferAmount = web3.utils.toWei('5', 'mwei')// 转账数量

//     const transferData = contract.methods.transfer(receiverAddress, transferAmount).encodeABI();
//     const nonce = await web3.eth.getTransactionCount(approve_address)
//     const tx = {
//         to: usdtContractAddress,
//         data: transferData,
//         gas: 50000,
//         gasPrice: web3.utils.toWei('50', 'gwei'),
//         nonce,
//     }

//     // web3.eth.getTransactionCount(approve_account.address, 'latest').then((nonce) => {
//     //     tx.nonce = nonce

//     //     const signedTx = approve_account.signTransaction(tx)

//     //     web3.eth.sendSignedTransaction(signedTx).then((receipt) => {})
//     // })
// }