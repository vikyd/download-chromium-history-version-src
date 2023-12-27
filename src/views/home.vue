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
          <span v-if="item.steps">
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
      <v-select
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
        <!-- <virtual-list
          class="vir-list"
          scrollable
          :data-key="'ver'"
          :data-sources="verPosList"
          :estimate-size="26"
          :data-component="VerItem"
        /> -->
        <div v-for="(item, index) of verPosList" :key="index" class="ver-pos">
          <a target="_blank" :href="item.href"
            >version: {{ item.ver }}
            <span class="pos">position: {{ item.pos }}</span></a
          >
          <!-- <span style="margin-left: 15px">
            File:
            <a target="_blank" :href="`${item.href}${fileName}`">{{
              fileName
            }}</a>
          </span> -->
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

<script>
import axios from 'axios'
import Fuse from 'fuse.js'
import debounce from 'debounce'

import VirtualList from 'vue-virtual-scroll-list'
import VerItem from './ver-item'

import { OSList, Links, DownloadUrl, Explains } from '@/constants/chromium'

export default {
  name: 'Home',
  components: {
    VirtualList,
  },
  data() {
    return {
      // const
      VerItem,
      OSList,
      Links,
      Explains,
      Points: [
        'Official Download Link, Safe!',
        'Official Download Speed',
        'Most Versions',
      ],

      // var
      os: 'Mac_Arm',
      verPosMap: {},
      verPosMapCache: {},
      verPosList: [],

      keyword: '',
      searchFuse: '',
    }
  },
  computed: {
    verPosListAll() {
      return (this.verPosList = Object.keys(this.verPosMap).map((ver) => {
        const vm = this
        const pos = vm.verPosMap[ver]
        return {
          ver: ver,
          pos: pos,
          href: `${DownloadUrl.base}${vm.os}/${pos}/`,
        }
      }))
    },
    fileName() {
      return this.osMap[this.os].file
    },
    osMap() {
      let m = {}
      OSList.forEach((item) => {
        m[item.val] = item
      })
      return m
    },
  },
  watch: {
    os() {
      this.keyword = ''
      const m = this.verPosMapCache[this.os]
      if (m) {
        this.verPosMap = m
        return
      }
      this.fetchData()
    },
    verPosMap() {
      this.verPosList = this.verPosListAll
    },
    verPosList() {
      this.searchFuse = new Fuse(this.verPosListAll, {
        distance: 1000,
        keys: ['ver', 'pos'],
      })
    },
  },
  beforeMount() {
    this.fetchData()
  },
  methods: {
    onGoTopClick() {
      window.document.body.scrollTop = 0
      window.document.documentElement.scrollTop = 0
    },
    onSearchInput: debounce(function (e) {
      if (!this.keyword.trim()) {
        this.verPosList = this.verPosListAll
        return
      }
      const result = this.searchFuse.search(this.keyword)
      this.verPosList = result.map((item) => item.item)
    }, 300),
    search() {
      const result = this.searchFuse.search(this.keyword)
      this.verPosList = result.map((item) => item.item)
    },
    async fetchData() {
      const r = await axios.get(
        // `https://raw.githubusercontent.com/vikyd/chromium-history-version-position/master/ver-pos-os/version-position-${this.os}.json`
        `json/ver-pos-os/version-position-${this.os}.json`
      )
      this.verPosMap = r.data
      this.verPosMapCache[this.os] = r.data
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  display: flex;

  flex-direction: column;
  // align-items: stretch;

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

.header {
  // margin-bottom: 10px;
}

.header-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content {
  // height: 100%;
}

.footer {
  margin-bottom: 50px;
}

.vir-list-wrapper {
  // align-self: stretch;
  // flex: 200px 1 0;
  margin-bottom: 30px;
  padding: 5px;
  border: 1px solid #ddd;
  width: 400px;
  // max-height: 800px;
  // overflow: scroll;
}

.vir-list {
  height: 500px;
  // height: 100%;
  overflow-y: auto;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.os-list {
  // display: inline-block;
  width: 412px;
  margin-bottom: 10px;

  ::v-deep > div {
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
  // padding-left: 10px;
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
