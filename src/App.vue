<template>
  <div id="whole">
    <n-card>
      <n-page-header @back="handleBack">
        <template #title>
          Eagle Rich-Text Editor<sub style="margin-left: 1em">by Liwei</sub>
        </template>
      </n-page-header>


      <span>with exporting HTML and file protocol link support</span>
    </n-card>
  </div>
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

  },
  methods: {

  }
}
</script>

<style>
#whole {
  width: 80%;
}
</style>
