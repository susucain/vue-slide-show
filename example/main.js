import Vue from 'vue'
import SlideShow from './vue-slide-show.vue'

new Vue({
  el: '.app-0',
  components: {SlideShow},
  data: {
    width: 700,
    height: 180,
    autoplay: false,
    displayCount: 5,
    space: 500,
    slides: [
      {background: `url(${require('./images/1.jpg')}) no-repeat`},
      {background: `url(${require('./images/2.jpg')}) no-repeat`},
      {background: `url(${require('./images/3.jpg')}) no-repeat`},
      {background: `url(${require('./images/4.jpg')}) no-repeat`},
      {background: `url(${require('./images/5.jpg')}) no-repeat`}
    ]
  }
})

new Vue({
  el: '.app-1',
  components: {SlideShow},
  data: {
    width: 700,
    height: 180,
    autoplay: true,
    displayCount: 3,
    lightBackground: '#eefe2e',
    space: 300,
    slides: [
      {background: `url(${require('./images/1.jpg')}) no-repeat`},
      {background: `url(${require('./images/2.jpg')}) no-repeat`},
      {background: `url(${require('./images/3.jpg')}) no-repeat`},
      {background: `url(${require('./images/4.jpg')}) no-repeat`},
      {background: `url(${require('./images/5.jpg')}) no-repeat`}
    ]
  }
})

new Vue({
  el: '.app-2',
  components: {SlideShow},
  data: {
    animationSpeed: 500,
    autoplay: false,
    displayCount: 5,
    inverseScaling: 400,
    slides: [
      {background: '#ccc'},
      {background: '#f66'},
      {background: '#6f6'},
      {background: '#66f'},
      {background: '#c69'},
      {background: '#69c'},
      {background: '#96c'}
    ]
  }
})

new Vue({
  el: '.app-3',
  components: {SlideShow},
  data: {
    animationSpeed: 500,
    autoplayTimeout: 500,
    autoplay: true,
    displayCount: 5,
    disable3d: true,
    space: 200,
    slides: [
      {background: '#ccc'},
      {background: '#f66'},
      {background: '#6f6'},
      {background: '#66f'},
      {background: '#c69'},
    ]
  }
})

new Vue({
  el: '.app-4',
  components: {SlideShow},
  data: {
    width: 700,
    height: 180,
    autoplay: false,
    displayCount: 5,
    space: 500,
    bannerWidth: '1100px',
    buttonBackground: '#fff',
    buttonStyle: {
      'position': 'absolute',
      'left': '50%',
      'bottom': '5px',
      'margin': 0,
      'z-index': 999,
      'transform': 'translateX(-50%)'
    },
    slides: [
      {background: `url(${require('./images/1.jpg')}) no-repeat`},
      {background: `url(${require('./images/2.jpg')}) no-repeat`},
      {background: `url(${require('./images/3.jpg')}) no-repeat`},
      {background: `url(${require('./images/4.jpg')}) no-repeat`},
      {background: `url(${require('./images/5.jpg')}) no-repeat`}
    ]
  }
})
