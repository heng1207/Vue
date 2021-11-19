// 使用 rem 单位进行适配 postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 根节点的 font-size 值
      propList: ['*'] // 要处理的属性列表，* 代表所有属性
    }
  }
}
