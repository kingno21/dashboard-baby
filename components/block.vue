<template>
  <section
    :class="className"
    :style="section">
    <div
      class="__header"
      draggable="true"
      @dragstart="_dragstart"/>
    <div 
      :style="[block, bgColor]"
      class="viewport">
      <slot />
    </div>
    <div
      class="dragger"
      @mousedown="_onMouseDown" />
  </section>
</template>

<script>
import { debounce, merge } from 'lodash'

export default {
  name: 'Block',
  props: {
    grid: {
      type: Object,
      reqired: true,
      default: function() {
        return {
          size: {
            x: 1,
            y: 1,
            left: 0
          }
        }
      }
    },
    blockSize: {
      type: Object,
      reqired: true,
      default: function() {
        return {
          height: 20,
          width: 20
        }
      }
    },
    className: {
      type: String,
      default: 'block'
    }
  },
  data: ({ grid, blockSize }) => {
    const gridSize = grid.size
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return {
      dragging: false,
      size: gridSize,
      bgColor: {
        'background-color': color
      },
      uid: grid.index,
      viewport: {
        width: blockSize.width * gridSize.x,
        height: blockSize.height * gridSize.y - 20,
        top: blockSize.height * gridSize.top,
        left: blockSize.width * gridSize.left
      },
      delta: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    section() {
      return {
        width: this.blockSize.width * this.size.x + 'px',
        height: this.blockSize.height * this.size.y + 'px',
        transform: `translate(
          ${this.viewport.left}px,
          ${this.viewport.top}px
        )`,
        backgroundColor: this.dragging ? 'red' : 'transparent'
      }
    },
    block() {
      return {
        width: this.viewport.width + 'px',
        height: this.viewport.height + 'px'
      }
    }
  },
  watch: {
    grid(newValue) {
      const blockSize = this.blockSize
      const size = newValue.size
      this.size = size
      merge(this.viewport, {
        top: blockSize.height * size.top,
        left: blockSize.width * size.left
      })
    },
    blockSize(newValue) {
      debounce(
        (async () => {
          merge(this.viewport, {
            top: newValue.height * this.size.top,
            left: newValue.width * this.size.left,
            width: newValue.width * this.size.x,
            height: newValue.height * this.size.y - 20
          })
        }).bind(this),
        100
      )()
    }
  },
  methods: {
    _dragstart(event) {
      console.log(event)
    },
    _onMouseDown(event) {
      this.dragging = true
      const currentSize = {
        x: this.size.x,
        y: this.size.y,
        vWidth: this.viewport.width,
        vHeight: this.viewport.height
      }
      const startPosition = {
        x: event.pageX,
        y: event.pageY
      }

      const _move = (event => {
        const delta = {
          x: event.pageX - startPosition.x,
          y: event.pageY - startPosition.y
        }
        const sizeX =
          currentSize.x + Math.floor(delta.x / this.blockSize.width) + 1
        const sizeY =
          currentSize.y + Math.floor(delta.y / this.blockSize.height) + 1
        if (sizeX >= 1 && sizeX <= 21) {
          this.size.x = sizeX
        }
        if (sizeY >= 1) {
          this.size.y = sizeY
        }
        this.viewport = {
          width: currentSize.vWidth + delta.x,
          height: currentSize.vHeight + delta.y - 20
        }
        this.$emit('resizeGrid', {
          index: this.uid,
          size: this.size
        })
      }).bind(this)

      const _up = (event => {
        this.dragging = false
        this.viewport = {
          width: this.size.x * this.blockSize.width,
          height: this.size.y * this.blockSize.height - 20
        }
        this.$emit('resizeGrid', {
          index: this.uid,
          size: this.size
        })
        window.removeEventListener('mousemove', _move)
        window.removeEventListener('mouseup', _up)
      }).bind(this)
      window.addEventListener('mousemove', _move)
      window.addEventListener('mouseup', _up)
    }
  }
}
</script>
<style>
.block {
  position: absolute;
  z-index: 100;
  flex-direction: row;
  transition: 300ms ease-in-out;
}
.viewport {
  z-index: 99;
  overflow: scroll;
}
.dragger {
  z-index: 101;
}
.dragger {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 10px;
  width: 10px;
  background-color: black;
  cursor: se-resize;
}
.__header {
  height: 20px;
  width: 100%;
  background-color: #e0e0e0;
  cursor: all-scroll;
}
</style>
