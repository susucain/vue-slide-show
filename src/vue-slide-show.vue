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
        :style="{background: nowIndex === index? lightBackground: buttonBackground}"
        :key="index">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true
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
      // 当前正在显示滑块的index
      nowIndex: Math.floor(this.displayCount / 2),
      // 控制滑块样式的数组
      constolStyleArr: [],
      // 控制指定index的滑块显示的数组，只在有隐藏滑块时使用
      constolDisplayArr: []
    }
  },
  watch: {
    /**
     * 监控autoplay的变化，如果改变了autoplay的值，
     * 则根据新值来启用或关闭轮播
     *
     * @param {boolean} autoplay的新值
     */
    autoplay(newValue) {
      if (newValue) {
        this.startAutoplay()
      }
      else {
        this.stopPlay()
      }
    },
    /**
     * 监控autoplayTimeout(播放速度)，如果改变则应用设置
     */
    autoplayTimeout() {
      if (this.autoplay) {
        // 清除上一个的计时器
        this.stopPlay()
        this.startAutoplay()
      }
    },
    /**
     * 监控显示的滑块数，如果改变则重新填充控制数组
     * 并重新计算nowIndex
     */
    displayCount(newValue) {
      this.getContolArr()
      this.nowIndex = Math.floor(this.displayCount / 2)
    },
    /**
     * 监控传入的滑块对象（主要监控数目），如果改变则重新填充控制数组
     * 由于控制数组重置，故nowIndex也要重新计算
     */
    slides() {
      this.getContolArr()
      this.nowIndex = Math.floor(this.displayCount / 2)
    }
  },
  computed: {
    /**
     * 计算上一个滑块的index
     * 
     * @return {number} 上一个滑块的index
     */
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    /**
     * 计算下一个滑块的index
     * 
     * @return {number} 下一个滑块的index
     */
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    },
    /**
     * 判断是否有隐藏滑块，即滑块总数是否大于要显示的滑块数
     * 
     * @return {Boolean} 是否有隐藏滑块 
     */
    hasHiddenSlides () {
      return this.slides.length > this.displayCount
    }
  },
  methods: {
    /**
     * 显示指定index的滑块
     * 
     * @param {number} index 要显示滑块的index
     */
    goto (index) {
      let move = index - this.nowIndex;
      // 根据是否有隐藏滑块，采取不同的控制方式
      // 通过控制数组中数字的循环移动，来控制显示指定index滑块时，各个滑块的样式
      this.hasHiddenSlides
      ? this.constolDisplayArr = this.shiftCircle(this.constolDisplayArr, move)
      : this.constolStyleArr = this.shiftCircle(this.constolStyleArr, -move)

      this.nowIndex = index
      this.$emit('change-slide', index)
    },
    /**
     * 循环移动数组move位
     * 
     * @param {Array} arr 要循环移动的数组
     * @param {Array} move 要循环移动的位数
     * @return {Array} 循环移动move位后的数组
     */
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
    /**
     * 设置各滑块的样式
     * 
     * @param {number} 每个滑块的index
     * @return {Object} 每个滑块的样式对象
     */
    setSlideStyle (i) {
      let styles = {}
      if (this.hasHiddenSlides) {
        // 通过constolDisplayArr数组，控制指定index的滑块显示
        let displayArr = this.constolDisplayArr.slice(0, this.displayCount)
        displayArr.forEach((item, index) => {
          if (item === i) {
            styles = this.calculatePosition(this.constolStyleArr[index])
            styles.visibility = 'visible'
            styles.opacity = 1
          }
        })
        // index不在displayArr数组中的滑块隐藏
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
    /**
     * 计算每个滑块位置相关的样式
     * 
     * @param {number} 控制样式数组的元素，用于计算每个滑块
         相应属性的样式值
     * @return {Object} 与位置相关的样式对象
     */
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
    /**
     * 填充两个控制数组的值
     */
    getContolArr() {
      // 填充前清空数组
      this.constolStyleArr.length = 0
      let count = Math.floor(this.displayCount / 2)
      for (let i = 0, len = this.displayCount; i < len; i++) {
        this.constolStyleArr.push(i - count)
      }

      this.constolDisplayArr.length = 0
      for (let i = 0, len = this.slides.length; i < len; i++) {
        this.constolDisplayArr.push(i)
      }
    }
  },
  created () {
    // 实例创建完成后填充两个控制数组的值
    this.getContolArr()
  },
  mounted () {
    console.log(this.nowIndex)
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
