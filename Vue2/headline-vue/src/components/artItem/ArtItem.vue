<template>
  <div @click="$router.push('/article/' + artId)">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img
            alt=""
            class="thumb"
            v-if="article.cover.type === 1"
            v-lazy="article.cover.images[0]"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            alt=""
            class="thumb"
            v-for="(item, index) in article.cover.images"
            :key="index"
            v-lazy="item"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论
            &nbsp;&nbsp; {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="closable" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈的动作面板 -->
    <!-- 默认情况下，我们是在 ArtItem.vue 组件中使用的 <van-action-sheet> 组件，因此动作面板的 DOM 结构会被渲染到 List 列表组件 内部
        导致的问题：动作面板中的内容上下滑动时，会导致 List 列表组件的 下拉刷新
解决方案：把 ActionList 组件，通过 get-container 属性，挂载到 body 元素下： -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      get-container="body"
      @closed="isFirst = true"
    >
      <div v-if="isFirst">
        <van-cell
          v-for="item in actions"
          :key="item.name"
          :title="item.name"
          clickable
          class="center-title"
          @click="onCellClick(item.name)"
        />
      </div>
      <!-- 第二级反馈面板 -->
      <div v-else>
        <van-cell
          title="返回"
          clickable
          title-class="center-title"
          @click="isFirst = true"
        />
        <van-cell
          v-for="item in reports"
          :key="item.type"
          :title="item.label"
          clickable
          title-class="center-title"
          @click="reportArticle(item.type)"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '@/api/reports.js'
import { dislikeArticleAPI, reportArticleAPI } from '@/api/homeAPI.js'
export default {
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true // 必填项
    },
    // 是否展示关闭按钮
    closable: {
      type: Boolean,
      // 默认值为 true，表示展示关闭按钮
      default: true
    }
  },
  computed: {
    // 文章 Id 的计算属性
    artId() {
      // 注意：文章对象的 art_id 是大数对象，需要调用 .toString() 方法转换为字符串形式
      return this.article.art_id.toString()
    }
  },
  data() {
    return {
      // 是否展示反馈面板
      show: false,
      // 第一个面板的可选项列表
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      // 是否展示第一个反馈面板
      isFirst: true,
      // 第二个面板的可选项列表，数组中每一项的格式 { type, label }
      reports
    }
  },
  methods: {
    // 一级选项的点击事件处理函数
    async onCellClick(name) {
      if (name === '不感兴趣') {
        console.log('不感兴趣')
        this.show = false
        const { data: res } = await dislikeArticleAPI(this.artId)
        if (res.message === 'OK') {
          // TODO：炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
          this.$emit('remove-article', this.artId)
        }
      } else if (name === '拉黑作者') {
        console.log('拉黑作者')
        this.show = false
      } else if (name === '反馈垃圾内容') {
        // TODO：展示二级反馈面板
        this.isFirst = false
      }
    },
    // 举报文章（形参 type 是举报的类型值）
    async reportArticle(type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.artId, type)
      if (res.message === 'OK') {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit('remove-article', this.artId)
      }
      // 3. 关闭动作面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
.center-title {
  text-align: center;
}
</style>
