<template>
  <div class="banner" :style="{width: bannerWidth}">
      <div 
        class="wrapper" 
        :style="{width: `${width}px`, height: `${height}px`}"
        @mouseover="stopPlay"
        @mouseout="startAutoplay">
        <div 
          v-for="(item, index) in slides" 
          :key="index" 
          :style="setSlideStyle(index)"
          @click="goto(index)">
        </div>
      </div>
    <ul class="button" :style="buttonStyle">
      <li 
        v-for="(item, index) in slides" 
        @click="goto(index)"
        :style="{background: nowIndex === index? lightBackground: buttonBackground}">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    displayCount: {
      type: Number,
      default: 5
    },
    animationSpeed: {
      type: Number,
      default: 1000
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 270
    },
    bannerWidth: {
      type: String,
      default: '100%'
    },
    disable3d: {
      type: Boolean,
      default: false
    },
    inverseScaling: {
      type: Number,
      default: 300
    },
    autoplayTimeout: {
      type: Number,
      default: 2000
    },
    space: {
      type: [Number, String],
      default: 'auto'
    },
    buttonStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    buttonBackground: {
      type: String,
      default: 'rgba(255, 255, 255, .3)'
    },
    lightBackground: {
      type: String,
      default: '#01BDFF'
    }
  },
  data () {
    return {
      nowIndex: Math.floor(this.displayCount / 2),
      constolStyleArr: [],
      constolDisplayArr: []
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    },
    hasHiddenSlides () {
      return this.slides.length > this.displayCount
    },
    
  },
  methods: {
    goto (index) {
      let move = index - this.nowIndex;
      this.hasHiddenSlides
      ? this.constolDisplayArr = this.shiftCircle(this.constolDisplayArr, move)
      : this.constolStyleArr = this.shiftCircle(this.constolStyleArr, -move)

      this.nowIndex = index;
    },
    shiftCircle (arr, move) {
      return arr.slice(move).concat(arr.slice(0, move))
    },
    startAutoplay () {
      if (this.autoplay) {
        this.autoplayId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.autoplayTimeout)
      }
    },
    stopPlay () {
      if (this.autoplayId) {
        clearInterval(this.autoplayId)
      }
    },
    setSlideStyle (i) {
      let styles = {}
      if (this.hasHiddenSlides) {
        let displayArr = this.constolDisplayArr.slice(0, this.displayCount)
        displayArr.forEach((item, index) => {
          if (item === i) {
            styles = this.calculatePosition(this.constolStyleArr[index])
            styles.visibility = 'visible'
            styles.opacity = 1
          }
        })
        if (!displayArr.includes(i)) {
          styles = this.calculatePosition(this.constolStyleArr[this.displayCount - 1])
          styles.visibility = 'hidden'
          styles.opacity = 0
        }
      }
      else {
        styles = this.calculatePosition(this.constolStyleArr[i])
      }

      return Object.assign(styles, {
          width: `${this.width}px`,
          height: `${this.height}px`,
          background: this.slides[i].background,
          transition: `all ${this.animationSpeed}ms`
      })
    },
    calculatePosition (i) {
      const x = this.space === 'auto' 
        ? i * (this.width / 1.5)
        : i * parseInt(this.space, 10) / 1.5
      const y = -(i * 23)
      const z = -Math.abs(i) * this.inverseScaling

      if (this.disable3d) {
        let count = 1 / (Math.abs(i) + 1)
        const scale = count === 1? 1: count + 0.3

        return {
          'transform': `translateX(${x}px) scale(${scale})`,
          'z-index': (this.displayCount + 1) * 2 / (Math.abs(i) + 1)
        }
      }
      else {
        return {
          transform: `translateX(${x}px) translateZ(${z}px) rotateY(${y}deg)`
        }
      }
    },
  },
  created () {
    let count = Math.floor(this.displayCount / 2)
    for (let i = 0, len = this.displayCount; i < len; i++) {
      this.constolStyleArr.push(i - count)
    }

    for (let i = 0, len = this.slides.length; i < len; i++) {
      this.constolDisplayArr.push(i)
    }
  },
  mounted () {
    if (this.autoplay) {
      this.startAutoplay()
    }
  }
}
</script>

<style scoped>
  .banner {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }

  .banner .wrapper {
    position: relative;
    margin: 0 auto;
    transform-style: preserve-3d;
    perspective: 1000px;
    backface-visibility:hidden;
  }

  .banner .wrapper div {
    position: absolute;
  }

  .banner .button {
    padding: 0;
    text-align: center;
  }

  .banner .button li {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid rgba(0, 0, 0, .2);
    cursor: pointer;
  }
</style>
