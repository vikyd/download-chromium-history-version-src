<template>
  <div class="home">
    <div class="header">
      <h1 style="display: inline">Chromium History Versions Download ↓</h1>
      <div style="margin-left: 15px">
        <a target="_blank" href="https://www.google.com/chrome/">
          <img src="@/assets/chrome-logo.svg" class="logo-img" />
        </a>
        ‿
        <a target="_blank" href="https://www.chromium.org/">
          <img
            src="@/assets/chromium-logo.svg"
            class="logo-img chromium-logo"
          />
        </a>
      </div>
      <h3>Features:</h3>
      <ul>
        <li v-for="(item, index) of Points" :key="index">✓ {{ item }}</li>
      </ul>

      <h3>Explains:</h3>

      <ul class="explains">
        <li v-for="(item, index) of Explains" :key="index">
          {{ item.title }}:

          <span v-if="item.detail">
            <span v-if="!item.href" class="detail">{{ item.detail }}</span>
            <a
              v-if="item.href"
              class="detail detail-link"
              :href="item.href"
              target="_blank"
              >{{ item.detail }}</a
            >
            <ul v-if="item.short">
              <li>Short: {{ item.short }}</li>
            </ul>
          </span>
          <span v-if="Array.isArray(item.steps) && item.steps.length">
            <ol>
              <li v-for="(s, idx) of item.steps" :key="idx">
                <span v-if="!s.href">{{ s.text }}</span>
                <a v-if="s.href" target="_blank" :href="s.href">{{ s.text }}</a>
              </li>
            </ol>
          </span>
        </li>
      </ul>
    </div>

    <div class="content">
      <h3>Versions:</h3>
      <VSelect
        :options="OSList.map((item) => item.val)"
        v-model="os"
        :clearable="false"
        :searchable="false"
        class="os-list"
      />
      <input
        v-model="keyword"
        class="search"
        placeholder="Search Version or Position"
        @input="onSearchInput"
      />
      <div class="ver-pos-tips">
        verseion (chromium_base_position): {{ fileName }}
      </div>
      <div class="vir-list-wrapper">
        <div v-for="(item, index) of verPosList" :key="index" class="ver-pos">
          <a target="_blank" :href="item.href"
            >version: {{ item.ver }}
            <span class="pos">position: {{ item.pos }}</span></a
          >
        </div>
      </div>
    </div>

    <div class="footer">
      <h3>Useful Links:</h3>
      <ul>
        <li v-for="(item, index) of Links" :key="index">
          <a target="_blank" :href="item.href">{{ item.name }}</a>
        </li>
      </ul>
    </div>

    <button @click="onGoTopClick" class="go-top" title="Go to top">
      ↑ Top
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import Fuse from 'fuse.js'
import debounce from 'debounce'
// @ts-ignore
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import { OSList, Links, DownloadUrl, Explains } from '@/constants/chromium'
import { computed, ref, watch } from 'vue'
import { Os, VerPos, VerPosMap } from '@/model/model'

const Points = [
  'Official Download Link, Safe!',
  'Official Download Speed',
  'Most Versions',
]

const os = ref<string>('Mac_Arm')

const keyword = ref<string>('')

const searchFuse = ref<Fuse<VerPos>>()

const onGoTopClick = () => {
  window.document.body.scrollTop = 0
  window.document.documentElement.scrollTop = 0
}

const verPosMap = ref<VerPosMap>({})

const verPosMapCache = ref<Record<string, VerPosMap>>({})

const verPosList = ref<VerPos[]>([])

const verPosListAll = computed(() => {
  // return (this.verPosList = Object.keys(this.verPosMap).map((ver) => {
  return Object.keys(verPosMap.value).map((ver) => {
    const pos = verPosMap.value[ver]
    return {
      ver: ver,
      pos: pos,
      href: `${DownloadUrl.base}${os.value}/${pos}/`,
    }
  })
})

watch(verPosMap, () => {
  verPosList.value = verPosListAll.value
})

watch(os, () => {
  keyword.value = ''
  const m = verPosMapCache.value[os.value]
  if (m) {
    verPosMap.value = m
    return
  }
  fetchData()
})

watch(verPosList, () => {
  searchFuse.value = new Fuse(verPosListAll.value, {
    distance: 1000,
    keys: ['ver', 'pos'],
  })
})

const osMap = computed(() => {
  return OSList.reduce((map, x) => {
    map[x.val] = x
    return map
  }, {} as Record<string, Os>)
})

const fileName = computed(() => {
  return osMap.value[os.value].file
})

const onSearchInput = debounce(function () {
  if (!keyword.value.trim() || !searchFuse.value) {
    verPosList.value = verPosListAll.value
    return
  }
  const result = searchFuse.value.search(keyword.value)
  verPosList.value = result.map((item) => item.item)
}, 300)

const fetchData = async () => {
  const r = await axios.get<VerPosMap>(
    `json/ver-pos-os/version-position-${os.value}.json`
  )
  verPosMap.value = r.data
  verPosMapCache.value[os.value] = r.data
}

fetchData()
</script>
<style lang="less" scoped>
.home {
  display: flex;

  flex-direction: column;

  margin: 10px 30px;
}

.logo-img {
  width: 100px;
  height: 100px;
}

.chromium-logo {
  width: 104px;
  height: 104px;
}

.header-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.footer {
  margin-bottom: 50px;
}

.vir-list-wrapper {
  margin-bottom: 30px;
  padding: 5px;
  border: 1px solid #ddd;
  width: 400px;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.os-list {
  width: 412px;
  margin-bottom: 10px;

  :deep(> div) {
    border: 1px solid #ddd;
    border-radius: 0;
  }
}

.search {
  margin-bottom: 10px;
  padding: 0 5px;
  width: 400px;
  height: 32px;
  // width: 48%;
  border: 1px solid #ddd;
  border-radius: 0;
}

.go-top {
  position: fixed;
  left: 490px;
  bottom: 10px;

  padding: 5px 20px;

  cursor: pointer;
  font-size: 24px;
  border: none;
  background-color: rgb(30, 162, 30);
  color: #fff;
}

.ver-pos {
  position: relative;
  margin: 2px;
  a {
    display: flex;
    text-decoration: none;
  }
}

.pos {
  position: absolute;
  left: 200px;
}

.ver-pos-tips {
  font-style: italic;
  color: #aaa;
}

.explains {
  .detail {
    font-style: italic;
    color: #888;
  }
  .detail-link {
    color: red;
  }
}
</style>
