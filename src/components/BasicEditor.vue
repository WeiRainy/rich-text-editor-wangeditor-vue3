<template>
    <div>
        <div>
          <input type="text" v-model="filenameRef"/>
          <span>.html</span>
          <button @click="saveHtml">Save html</button>
        </div>
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
                style="border-bottom: 1px solid #ccc"
            />
            <Editor
                :defaultConfig="editorConfig"
                :mode="mode"
                v-model="valueHtml"
                style="height: 400px; overflow-y: hidden;"
                @onCreated="handleCreated"
                @customPaste="customPaste"/>

        </div>
        <div style="margin-top: 10px;">
            <textarea v-model="valueHtml" readonly style="width: 100%; height: 200px; outline: none;"></textarea>
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import * as FileSaver from 'file-saver'

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef()
    const filenameRef = ref()
    // 内容 HTML
    const valueHtml = ref()

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return

        editor.destroy()
    })

    const customPaste = (editor, event, callback) => {
        // console.log('ClipboardEvent 粘贴事件对象', event)
        const plainTextFromPaste = event.clipboardData.getData('text/plain')
        if (plainTextFromPaste.startsWith("file:///")) {
          editor.insertNode({
            type: 'link',
            url: plainTextFromPaste,
            target: "_blank",
            children: [{'text': plainTextFromPaste}]
          });
          callback(false)
        }
        // 返回值（注意，vue 事件的返回值，不能用 return）
        // callback(false) // 返回 false ，阻止默认粘贴行为
        else callback(true) // 返回 true ，继续默认的粘贴行为
    }
    const handleCreated = (editor) => {
      // 记录 editor 实例，重要！
      editorRef.value = editor;
    };
    const saveHtml = () => {
      const editor = editorRef.value
      if (editor == null) return
      console.log(filenameRef.value)
      const file = new File([editor.getHtml()], `${filenameRef.value}.html`, {type: "html/plain; charset=utf-8"})
      FileSaver.saveAs(file)
    }

    return {
      editorRef,
      mode: 'simple',
      valueHtml,
      toolbarConfig,
      editorConfig,
      filenameRef,
      handleCreated,
      customPaste,
      saveHtml,
    };
  }
}
</script>
