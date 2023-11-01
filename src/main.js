import { createApp } from 'vue'
import App from './App.vue'
import {
    create,
    NCard,
    NButton,
    NInput,
    NTag,
    NSpace,
    NPageHeader
} from 'naive-ui'

const naive = create({
    components: [NButton, NCard, NInput, NTag, NSpace, NPageHeader]
})
createApp(App).use(naive).mount('#app')
