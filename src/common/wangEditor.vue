<template>
  <div class="home">
    <div id="demo1"></div>
  </div>
</template>
<script>
// 引入 wangEditor
import WangEditor from 'wangeditor'
export default {
  props: ['content'],
  data () {
    return {
      editor: null,
      editorData: '',
      backImageList:[],
      foreImageList:[],
    }
  },
  mounted () {
    var that = this;
    var a = 1
    const editor = new WangEditor('#demo1')
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
      this.foreImageList = this.getImageId(newHtml);
      console.log(this.foreImageList)
      this.handleDeleteImageList()
      console.log(that.foreImageList)
      this.$emit('change', {val:this.editorData, foreImageList:that.foreImageList})
    }
    editor.config.menus =  [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'video',
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
]
    // 上传图片到服务器
    editor.config.uploadFileName = 'file'; //设置文件上传的参数名称
    editor.config.uploadImgServer = '/api/file/uploadImage'; //设置上传图片的服务器路径
    editor.config.uploadVideoServer = 'api/file/uploadVideo' //设置上传视频的服务器路径
    //设置请求头  解决跨域问题
    editor.config.uploadImgHeaders = {'Access-Control-Allow-Origin': '*'}

    editor.config.uploadImgMaxSize = 5 * 1024 * 1024; // 将图片大小限制为 3M
    //自定义上传图片事件
    editor.config.uploadImgHooks = {
      
      before : function(xhr) {
         console.log(xhr)
      },
      success : function(xhr) {
        console.log('success', xhr)
        console.log(that.backImageList)
         
      },
      fail : function(xhr, editor, result) {
        console.log("上传失败,是"+result);
      },
      error : function(xhr, editor, result) {
        console.log("上传出错");
      },
      timeout : function(xhr) {
        console.log("上传超时");
      },
      customInsert: (insertImg, result, editor) => {
        console.log('customInsert', result)
        if(result.errno == 0) {
          if(that.backImageList === undefined) that.backImageList = []

          that.backImageList.push(result.data[0].id);
          console.log(that.backImageList)
          editor.cmd.do(
            'insertHTML',
            `<img src="${result.data[0].url}" id="${result.data[0].id}" style="max-width:100%;"/>`
          )
        }
      }
    }
    if (editor==null){
          editor.create()
        }else {
          editor.destroy();//这里做了一次判断，判断编辑器是否被创建，如果创建了就先销毁。
          editor.create()
        }
    //editor.create()
    // 初始化
    editor.txt.html(this.content)
    this.editor = editor
    //获取所有<img>标签
    this.backImageList = this.getImageId(this.content);
    
  },
  methods: {
    getEditorData () {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    },
    getImageId(html) {
      var imgStrs = html.match(/<img.*?>/g) || [];
      console.log(imgStrs)
      var ids = imgStrs.map(imgStr => {
        console.log(imgStr)
        let reg = new RegExp("(?<=id\=['|\"])(.*?)(?=['|\"])","g");
        return parseInt(imgStr.match(reg)[0])
      })
      console.log(ids)
      return ids
    },
    handleDeleteImageList() {
      console.log(1)
      if(this.backImageList) {
        console.log(2)
        // if(this.foreImageList === undefined) this.foreImageList = []
        var deleteImageList = this.backImageList.filter(id => this.foreImageList.indexOf(id) == -1);
        console.log(this.backImageList)
        console.log(this.foreImageList)
        console.log(deleteImageList)
        if(deleteImageList.length) {
          var formData = new FormData();
          formData.append('ids',deleteImageList)
          console.log(formData)
          console.log(3)
          this.$axios.post('/api/file/deleteImagesByIds',formData).then(res=>{
            console.log(res)       
          })
        }
      }
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },

  // watch: {
  //   content(newVal,oldVal)  {  
  //     this.editor.txt.html(newVal);
  //     // this.editorData = newVal
  //     // console.log(this.editorData);
  //   }
  // }
}
</script>
<style>
  .home {
    width: 40vw;
    margin: auto;
    position: relative;
  }
  .w-e-toolbar{
        z-index: 2 !important;
  }
  .w-e-menu {
      z-index: 2 !important;
  }
  .w-e-text-container {
      z-index: 1 !important;
  }
</style>


