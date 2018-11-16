<template>
  <div class="container">
    <nav class="navi">
      <datepicker
        class="data-picker" />
      <datepicker
        class="data-picker" />
    </nav>
    <block
      v-for="(graph, index) in demo"
      :key="index"
      :grid-size="graph.size"
      :block-size="block">
      <chart />
    </block>
  </div>
</template>

<script>
import block from '../components/block'
import chart from '../components/chart'
import testBlock from '../components/test-block'
import { getRandomInt } from '../utils/random'
import Chart from 'chart.js'
import Datepicker from 'vuejs-datepicker'
import { range, map, each } from 'lodash'

export default {
  components: {
    block,
    Datepicker,
    chart,
    testBlock
  },
  data() {
    return {
      block: {
        width: window.innerWidth / 21,
        height: window.innerHeight / 22
      },
      demo: [
        {
          size: {
            x: 21,
            y: 7
          }
        },
        {
          size: {
            x: 7,
            y: 7
          }
        },
        {
          size: {
            x: 21,
            y: 7
          }
        }
      ]
    }
  },
  computed: {
    size() {
      return {
        width: window.innerWidth / 21,
        height: window.innerHeight / 22
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
  },
  beforeDestory() {
    window.removeEventListener('resize', this.resizeWindow)
  },
  methods: {
    resizeWindow() {
      this.block = {
        width: window.innerWidth / 21,
        height: window.innerHeight / 22
      }
    }
  }
}
</script>

<style>
.container {
  width: 100vw;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 40px;
  padding-bottom: 40px;
}
.navi {
  height: 40px;
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.vdp-datepicker__calendar {
  left: -169px;
  top: 30px;
}
.data-picker {
  margin-right: 20px;
}
.vdp-datepicker__calendar {
  z-index: 200;
}

.__calendar {
  left: 0;
}
</style>
