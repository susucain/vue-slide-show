<template>
  <div class="banner" :style="{width: bannerWidth}">
      <div class="wrapper" :style="{width: `${width}px`, height: `${height}px`}">
        <div 
          v-for="(item, index) in slides" 
          :key="index" 
          :style="setSlideStyle(index)"
          @click="goto(index)">
        </div>
      </div>
    <ul class="button" id="lightButton" :style="buttonStyle">
      <li 
        v-for="(item, index) in slides" 
        :class="{light: nowIndex === index}"
        @click="goto(index)">
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
      type: [Number, String],
      default: 300
    },
    height: {
      type: [Number, String],
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
      type: [Number, String],
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
      default: {}
    },
    showNav: {
      type: Boolean,
      default: true
    },
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
  watch: {
    items () {
      
    }
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
      this.autoplayId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.autoplayTimeout)
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
      const y = this.disable3d? 0: -(i * 23)
      const z = -Math.abs(i) * this.inverseScaling
      
      return {
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${y}deg)`
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
    console.log(this.$el.clientWidth)
  }
}
</script>

<style scoped>
  .banner {
    position: relative;
    overflow: hidden;
  }

  .banner .wrapper {
    position: relative;
    margin: 0 auto;
    transform-style: preserve-3d;
    perspective: 1000px;
    backface-visibility:hidden;
  }

  .wrapper div {
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
    background: rgba(255, 255, 255, .3);
    border: 1px solid rgba(0, 0, 0, .2);
    cursor: pointer;
  }

  .banner .button .light {
    background: #01BDFF;
  }
</style>