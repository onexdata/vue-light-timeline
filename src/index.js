import Timeline from './core/Timeline.vue'

export default {
  install (Vue, options) {
    Vue.component('simple-timeline', Timeline)
  }
}

export {
  Timeline
}
