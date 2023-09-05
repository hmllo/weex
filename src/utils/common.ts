// 生成订阅请求json体
export function getSubscribeJsonBody(channel: string) {
    return JSON.stringify({
        "op": "subscribe",
        "args": [{
            "channel": channel,
        }]
    });
}

// 生成取消订阅请求json体
export function getUnsubscribeJsonBody(tid: any) {
    return JSON.stringify({
        "op": "unsubscribe",
        "args": [{
            "tid": tid,
        }]
    });
}