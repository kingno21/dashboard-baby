<template>
  <section
    :class="className"
    :style="section">
    <div 
      :style="block"
      class="viewport">
      <slot />
    </div>
    <div
      class="dragger"
      @mousedown="_onMouseDown" />
  </section>
</template>

<script>
export default {
  name: 'Block',
  props: {
    gridSize: {
      type: Object,
      reqired: true,
      default: function() {
        return {
          x: 1,
          y: 1
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
  data: ({ gridSize, blockSize }) => {
    return {
      dragging: false,
      size: gridSize,
      viewport: {
        width: blockSize.width * gridSize.x,
        height: blockSize.height * gridSize.y
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
        backgroundColor: this.dragging ? 'lightpink' : 'transparent'
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
    blockSize(newValue) {
      this.viewport = {
        width: newValue.width * this.size.x,
        height: newValue.height * this.size.y
      }
    }
  },
  methods: {
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
          height: currentSize.vHeight + delta.y
        }
      }).bind(this)

      const _up = (event => {
        this.dragging = false
        this.viewport = {
          width: this.size.x * this.blockSize.width,
          height: this.size.y * this.blockSize.height
        }
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
  position: relative;
  z-index: 100;
  display: flex;
}
.viewport {
  z-index: 99;
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
</style>
