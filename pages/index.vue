<template>
  <div class="container">
    <nav class="navi" />
    <section
      v-if="block.width !== 0"
      class="sections">
      <block
        v-for="(graph, index) in layoutDemo"
        :key="index"
        :grid="graph"
        :block-size="block"
        @resizeGrid="relayoutGrid">
        <ul>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </ul>
      </block>
    </section>
  </div>
</template>

<script>
import Block from '../components/block'
import chart from '../components/chart'
import TestBlock from '../components/test-block'
import Datepicker from 'vuejs-datepicker'
import { range, map, each, debounce, find, merge, indexOf } from 'lodash'

const { basicSizeWidth, basicSizeHeight } = {
  basicSizeWidth: 21,
  basicSizeHeight: 22
}
export default {
  components: {
    Block,
    Datepicker,
    chart,
    TestBlock
  },
  data() {
    return {
      block: {
        width: 0,
        height: 0
      },
      demo: [
        {
          index: 0,
          size: {
            x: 21,
            y: 7,
            left: 0
          }
        },
        {
          index: 1,
          size: {
            x: 7,
            y: 4,
            left: 0
          }
        },
        {
          index: 2,
          size: {
            x: 7,
            y: 8,
            left: 7
          }
        },
        {
          index: 3,
          size: {
            x: 7,
            y: 16,
            left: 14
          }
        },
        {
          index: 4,
          size: {
            x: 7,
            y: 7,
            left: 3
          }
        },
        {
          index: 5,
          size: {
            x: 7,
            y: 7,
            left: 12
          }
        },
        {
          index: 6,
          size: {
            x: 7,
            y: 2,
            left: 3
          }
        },
        {
          index: 7,
          size: {
            x: 7,
            y: 8,
            left: 12
          }
        },
        {
          index: 8,
          size: {
            x: 16,
            y: 7,
            left: 0
          }
        },
        {
          index: 9,
          size: {
            x: 18,
            y: 7,
            left: 3
          }
        },
        {
          index: 10,
          size: {
            x: 21,
            y: 7,
            left: 0
          }
        }
      ]
    }
  },
  computed: {
    layoutDemo() {
      return this.layoutGrid(this.demo)
    }
  },
  mounted() {
    this.block = {
      width: this.$el.offsetWidth / basicSizeWidth,
      height: this.$el.offsetHeight / basicSizeHeight
    }
    window.addEventListener('resize', this.resizeWindow)
  },
  beforeDestory() {
    window.removeEventListener('resize', this.resizeWindow)
  },
  methods: {
    resizeWindow() {
      this.block = {
        width: this.$el.offsetWidth / basicSizeWidth,
        height: this.$el.offsetHeight / basicSizeHeight
      }
    },
    relayoutGrid({ index, size }) {
      debounce(
        (async () => {
          const i = indexOf(this.demo, find(this.demo, { index: index }))
          merge(this.demo[i], {
            size: {
              x: size.x,
              y: size.y,
              left: size.left
            }
          })
        }).bind(this),
        250
      )()
    },
    layoutGrid(girds) {
      let stack = {
        x: 0,
        y: 0,
        maxY: 0
      }
      return map(girds, ({ size, ...props }) => {
        if (size.x + stack.x > basicSizeWidth || stack.x > size.left) {
          stack = {
            x: 0,
            y: stack.y + stack.maxY,
            maxY: 0
          }
        }
        const resize = {
          x: size.x,
          y: size.y,
          top: stack.y,
          left: size.left
        }
        stack.x = size.x + size.left
        stack.maxY = Math.max(stack.maxY, size.y)
        return {
          size: resize,
          ...props
        }
      })
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  background-color: white;
  display: block;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 40px;
  height: 100vh;
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
.sections {
  display: block;
  position: relative;
  height: 100%;
  overflow-y: scroll;
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
.__image {
  max-height: 100%;
  max-width: 100%;
  user-select: none;
}
</style>
