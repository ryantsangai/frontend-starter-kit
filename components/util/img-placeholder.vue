<template lang="pug">
.relative.is-clipped
  .img-placeholder(ref="placeholder", :style="{'padding-top': `calc(${placeHolderRatio} * 100%)`}")
    transition(name="fade")
      img.absolute(v-show="imgRatio", :src="src", ref="img", :style="imgStyle")
</template>

<script>

export default {
  data() {
    return {
      placeholder: {
        width: 0,
        height: 0,
      },
      original: {
        width: 0,
        height: 0,
      },
    }
  },
  props: {
    src: {
      required: true,
      type: String,
    },
    size: {
      type: Object,
      validator(val) {
        return val.width && val.height && typeof(val.width) == 'number' && typeof(val.height) == 'number'
      },
      default() {
        return {
          width: 4,
          height: 3,
        }
      },
    },
  },
  computed: {
    browserWidth() { return this.$store.getters['browser/width'] },
    placeHolderRatio() { return this.size.height / this.size.width },
    imgRatio() { return this.original.height / this.original.width },
    overflow() { return this.imgRatio > this.placeHolderRatio? 'height': 'width' },
    rendered() {
      if (this.overflow == 'width') {
        return {
          width: this.placeholder.height / this.imgRatio,
          height: this.placeholder.height,
        }
      } else {
        return {
          width: this.placeholder.width,
          height: this.placeholder.width * this.imgRatio,
        }
      }
    },

    offset() { return (this.rendered[this.overflow] - this.placeholder[this.overflow]) / 2 },

    imgStyle() {
      if (this.overflow == 'width') {
        return {
          height: '100%',
          width: 'auto',
          left: `-${this.offset}px`,
          top: 0,
        }
      } else {
        return {
          width: '100%',
          height: 'auto',
          top: `-${this.offset}px`,
          left: 0,
        }
      }
    },
  },
  watch: {
    browserWidth() {
      this.setPlaceHolderSize()
    },
  },
  methods: {
    setPlaceHolderSize() {
      this.placeholder.width = this.$refs.placeholder.clientWidth
      this.placeholder.height = this.$refs.placeholder.clientHeight
    },

    loadedListener(e) {
      let target = e.target
      this.original.width = target.naturalWidth
      this.original.height = target.naturalHeight
    },

  },
  mounted() {
    this.setPlaceHolderSize()

    this.$refs.img.addEventListener('load', this.loadedListener)
  },
  beforeDestroy() {
    this.$refs.img.removeEventListener('load', this.loadedListener)
  },
}
</script>

<style lang="scss" scoped>
.img-placeholder {
  background-color: $grey-light;
}
img {
  max-width: none;
  min-height: 100%;
  min-width: 100%;
}
</style>