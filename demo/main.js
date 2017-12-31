import Vue from './vue.js';
import SlideShow from './test.vue';

new Vue({
  el: '.app',
  components: {SlideShow},
  data: {
    animationSpeed: 1000,
    autoplay: false,
    displayCount: 5,
    buttonStyle: {},
    bannerWidth: '100%',
    space: 400,
    slides: [
      {background: '#f66'},
      {background: '#6f6'},
      {background: '#66f'},
      {background: '#e99'},
      {background: '#dd6'},
      {background: '#ccc'},
      {background: 'orange'}
    ]
    /*slides: [
      {
        src: require('./images/1.jpg'),
        title: 'xxx1',
        href: 'detail/analysis',
        id: 0
      },
      {
        src: require('./images/2.jpg'),
        title: 'xxx2',
        href: 'detail/count',
        id: 1
      },
      {
        src: require('./images/3.jpg'),
        title: 'xxx3',
        href: 'http://xxx.xxx.com',
        id: 2
      },
      {
        src: require('./images/4.jpg'),
        title: 'xxx4',
        href: 'detail/forecast',
        id: 3
      },
      {
        src: require('./images/5.jpg'),
        title: 'xxx4',
        href: 'detail/forecast',
        id: 4
      }
    ]*/
  }

})
