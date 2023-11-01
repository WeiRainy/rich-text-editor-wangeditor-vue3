<template>
  <div>
    Eagle Rich-Text Editor (with exporting HTML)
  </div>
  <hr>

  <BasicEditor></BasicEditor>
</template>

<script>
import BasicEditor from '@/components/BasicEditor.vue'

export default {
  name: 'App',
  components: {
    BasicEditor,
  },
  data() {
    // return {
    //   show: true
    // }
  },
  methods: {
    // toggle() {
    //   this.show = !this.show
    // }
  }
}
</script>

<style>
</style>
