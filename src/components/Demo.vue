<script setup lang="ts">
import { Ref, ref } from 'vue'
defineProps<{ msg: string }>()

const size = ref('large')

const CLIENT_TAG_ID = '__VITE_ANTDV_THEME_LINK__'

const theme: Ref<string> = ref('default')
const themes = ref([
  { theme: 'default', name: '默认', color: '#1890ff' },
  { theme: 'dark', name: '暗黑', color: '#000000' },
  { theme: 'purple', name: '紫色', color: '#722ed1' },
  { theme: 'cyan', name: '青色', color: '#13c2c2' },
  { theme: 'green', name: '绿色', color: '#52c41a' },
  { theme: 'magenta', name: '洋红', color: '#eb2f96' },
  { theme: 'red', name: '红色', color: '#f5222d' },
  { theme: 'orange', name: '橙色', color: '#fa8c16' },
  { theme: 'yellow', name: '黄色', color: '#fadb14' },
  { theme: 'volcano', name: '火山', color: '#fa541c' },
  { theme: 'geekblue', name: '蓝色', color: '#2f54eb' },
  { theme: 'lime', name: '石灰', color: '#a0d911' },
  { theme: 'gold', name: '金色', color: '#faad14' }
])


const handleChangeTheme = (n: string) => {
  if (themes.value.findIndex(v => v.theme === n) > 1) {
    let link = document.getElementById(CLIENT_TAG_ID) as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.id = CLIENT_TAG_ID
      document.head.appendChild(link)
    }
    link.href = `/themes/${n}.css`
  }
  document.documentElement.dataset.theme = n
  theme.value = n
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-space>
    <a-button
      :type="theme == n.theme ? 'primary' : 'default'"
      v-for="n in themes"
      :key="n"
      @click="handleChangeTheme(n.theme)"
    >主题({{ n.name }})</a-button>
  </a-space>
  <a-divider />
  <a-radio-group v-model:value="size">
    <a-radio-button value="large">Large</a-radio-button>
    <a-radio-button value="default">Default</a-radio-button>
    <a-radio-button value="small">Small</a-radio-button>
  </a-radio-group>
  <br />
  <br />
  <a-button type="primary" :size="size">Primary</a-button>
  <a-button :size="size">Normal</a-button>
  <a-button type="dashed" :size="size">Dashed</a-button>
  <a-button danger :size="size">Danger</a-button>
  <a-button type="link" :size="size">Link</a-button>
</template>