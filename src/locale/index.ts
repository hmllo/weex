import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import zhTW from './zh-TW'
import enUS from './en-US'

import { setItem, getItem } from '@/stores/storage'

const defaultLocale = getItem('locale') || navigator.language
setItem('locale', defaultLocale)

const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'en-US',
    allowComposition: true,
    messages: {
        'zh-CN': zhCN,
        'zh-TW': zhTW,
        'en-US': enUS
    }
})

export default i18n