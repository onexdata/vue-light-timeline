<template lang="pug">
ul.line-container
  li.line-item(v-for='item in items')
    .item-circle(
      v-if='!item.type || item.type==="circle"'
      :class='getColorClass(item.color)'
      :style='getStyle(item)'
    )
    star.item-star(
      v-if='item.type==="star"'
      :class='getColorClass(item.color)'
      :path-style='getStyle(item)'
    )
    .item-tag {{item.tag}}
    .item-title(
      v-if="item.title"
      v-html="item.title"
    )
    .item-content(:class='item.type' v-html="item.content")
    .item-footer( :class='footerPos'
      v-if="item.footer"
      v-html="item.footer"
    )
</template>
<script>
import Star from '../base/star.vue'
export default {
  name: 'simple-timeline',
  components: { Star },
  props: {
    items: {
      type: Array
    },
    footer: {
      type: String
    }
  },
  data () {
    return {
      presetReg: /blue|grey|dark-grey|purple|orange|yellow/
    }
  },
  computed: {
    footerPos () {
      var footerPos = this.footer || 'left'
      return 'item-footer-' + footerPos
    }
  },
  mounted () {
    console.log('footer pos:', this.footerPos)
  },
  methods: {
    getColorClass (color) {
      return this.presetReg.test(color) ? color : ''
    },
    getStyle (item) {
      const color = item.color
      if (!this.presetReg.test(color)) {
        return item.type === 'star'
          ? this.makeStarColor(color)
          : this.makeCircleColor(color)
      }
      return {}
    },
    makeCircleColor (color) {
      return { border: `2px solid ${color}` }
    },
    makeStarColor (color) {
      return { stroke: color }
    }
  }
}
</script>
<style lang="scss">
$font-family-no-number: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
$font-family: "Helvetica Neue For Number", $font-family-no-number;
$tag-family: Consolas, Menlo, Courier, monospace;

$purple: #8b80f9;
$orange: #ed9153;
$yellow: #fbd157;
$blue: #2196F3;
$grey: #ccc;
$dark-grey: #777;
$font-color: #606c76;
$font-size: 14px;
$left-pad: 5rem;
$item-pad: 1rem;
$icon-size: 16px;
$sm-icon-size: 10px;
$lg-icon-size: 24px;

$colors: (
  purple  : $purple,
  orange  : $orange,
  yellow  : $yellow,
  grey    : $grey,
  blue: $blue,
  dark-grey : $dark-grey
);

@mixin square($val) {
  width: $val;
  height: $val;
}

@mixin circle($diameter, $color) {
  @include square($diameter);
  border-radius: $diameter/2 + 2px;
  background: white;
  border: 2px solid $color;
}

@mixin line-point($val) {
  box-sizing: border-box;
  position: absolute;
  left: -$item-pad;
  margin-left: -($val/2) + 1px;
  z-index: 1;
}

@mixin make-circle($diameter, $color) {
  @include line-point($diameter);
  @include circle($diameter, $color);
}

@mixin make-star($val, $color) {
  @include line-point($val);
  @include square($val);
  margin-top: -($val/6);
  path {
    stroke: $color;
    stroke-width: 4px;
    fill: white;
  }
}

:root {
  --purple: $purple;
  --grey: $grey;
  --dark-grey: $dark-grey;
  --blue: $blue;
  --orange: $orange;
  --yellow: $yellow;
}

.line-container {
  color: $font-color;
  font-size: $font-size;
  font-family: $font-family;
  box-sizing: border-box;  
  position: relative;
  list-style: none;
  margin: .5rem;
  padding-left: $left-pad + 1rem;
  &::after {
    position: absolute;
    content: "";
    left: $left-pad;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: lighten($blue, 20%);
  }

  .line-item {
    padding: $item-pad;
    position: relative;
  }
  .item-circle {
    @include make-circle($icon-size, $grey);
    @each $key, $val in $colors {
      &.#{$key} {
        border: 2px solid $val;
      }
    }
  }
  .item-star {
    @include make-star($lg-icon-size, $grey);
    @each $key, $val in $colors {
      &.#{$key} {
        path {
          stroke: $val;
        }
      }
    }
  }
  .item-tag {
    position: absolute;
    left: -($left-pad + 1rem);
    width: 65px;
    text-align: center;
    color: lighten($font-color, 20%);
    font-size: $font-size/1.2;
  }
  .item-content {
    white-space: pre-line;
    &.star {
      font-weight: bold;
      font-size: $font-size * 1.1;
    }
  }
  .item-title {
    padding-bottom: 10px;
    font-size: 120%;
    font-weight: bold;
  }
  .item-footer {
    padding-top: 10px;
  }
  .item-footer-right {
    text-align: right;
  }
}
</style>

