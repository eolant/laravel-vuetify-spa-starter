<template>
  <div class="sidemenu" v-scroll="onScroll" :style="styles">
    <v-card>
      <v-list class="py-0" dense>
        <template v-for="(item, index) in items">
          <v-divider v-if="index" :key="index"></v-divider>
          <v-list-item :key="item.title" @click="item.action ? item.action(item) : null" :to="item.to" ripple exact>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon small :color="item.color" v-show="!item.progress">{{ item.icon }}</v-icon>
              <v-progress-circular indeterminate color="primary" v-if="item.action" v-show="item.progress"></v-progress-circular>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
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
