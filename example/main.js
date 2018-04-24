import Vue from 'vue'
import SlideShow from '../src/vue-slide-show.vue'

new Vue({
  el: '#root',
  components: {SlideShow},
  data: {
    slidesNumber: 5,
    displayCount: 5,
    isImage: false,
    width: 700,
    height: 180,
    autoplay: false,
    space: 300,
    inverseScaling: 200,
    disable3d: false,
    autoplayTimeout: 1500
  },
  computed: {
    slides() {
      let slidesArr = []
      let len = this.slidesNumber

      if (this.isImage) {
        for (let i = 1; i <= len; i++) {
          slidesArr.push({
            background: `url(${require(`./images/${i}.jpg`)}) no-repeat`
          })
        }
      } 
      else {
        for (let i = 0; i < len; i++) {
          slidesArr.push({
            // 生成随机颜色，4095的十六进制是#fff
            background: `#${('00' 
              + (Math.floor(Math.random() * 4096)).toString(16)).slice(-3)}`
          })
        }
      }

      return slidesArr
    }
  },
  watch: {
    slidesNumber(newVal, oldVal) {
      if (newVal < this.displayCount) {
        this.displayCount = newVal
      }
    }
  },
  methods: {
    setDim() {
      this.disable3d = !this.disable3d
    },
    setImageSlide() {
      if (this.slidesNumber <= 5) {
        this.isImage = true
      }
      else {
        alert('抱歉，图片只有5张')
      }
    },
    setColorSlide() {
      this.isImage = false
    },
    setPlay() {
      this.autoplay = !this.autoplay
    }
  }
})
