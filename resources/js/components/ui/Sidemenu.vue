<template>
  <div class="sidemenu" v-scroll="onScroll" :style="styles">
    <v-list class="pt-0 pb-0 elevation-1" dense>
      <template v-for="(item, index) in items">
        <v-divider v-show="!!index" :key="index"></v-divider>
        <v-list-tile :key="item.title" v-on:click="item.action ? item.action(item) : null" :to="item.to" ripple exact>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon :color="item.color" v-show="!item.progress">{{ item.icon }}</v-icon>
            <v-progress-circular indeterminate color="primary" v-if="item.action" v-show="item.progress"></v-progress-circular>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: {
      threshold: {
        type: [Number, String],
        required: true
      },
      offset: {
        type: [Number, String],
        required: true
      },
      items: {
        required: true
      },
    },

    data: () => ({
      currentOffset: 0,
      position: 'relative',
      top: 0
    }),

    computed: {
      styles () {
        return {
          position: this.position,
          top: `${parseInt(this.top)}px`
        }
      }
    },

    methods: {
      onScroll () {
        this.currentOffset = window.pageYOffset || document.documentElement.offsetTop
        const shouldFloat = this.currentOffset >= this.threshold
        this.position = shouldFloat ? 'fixed' : 'relative'
        this.top = shouldFloat ? this.offset : 0
      }
    }
  }
</script>
