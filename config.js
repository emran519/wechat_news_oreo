/**
 作者：饼干(Oreo)
 创建时间：2020/11/23
 QQ:609451870
 描述：本程序是作者的课程设计作品，程序中可能还存在很多不足，但是作者相信本程序也是初学者的很好的学习案例
 basePath 为接口地址，oreo将提供两种语言(PHP,Python(Django))开发的后端程序
 如果您是搭建PHP接口地址则是：您的域名/api.php?api_uri=
 如果您是搭建Python(Django)接口地址则是：您的域名/api/?api_uri=
 您完全可以通过本程序(包括小程序，PHP后端，Python后端，web端)来参考和学习或者用于您的项目
 */
const basePath = 'http://php.applet.2free.cn/api.php?api_uri='; //统一接口URL地址
const urlList = {
  loginUrl: basePath + 'user_login',//登录接口,
  userInfoUrl: basePath + 'user_info',//接受用户信息接口
  indexPhotoUrl: basePath + 'rotation_chart',//首页轮播图接口
  articleUrl: basePath + 'news_info',//获取新闻接口
  articleInfoUrl: basePath + 'article_info',//新闻详细接口
  collectionNewsInfoUrl: basePath + 'collection_news_info',//收藏查询接口
  collectionUrl: basePath + 'collection_news_add',//用户收藏接口
  collectionCloneUrl: basePath + 'collection_news_del',//取消收藏接口
  articleInfoUserUrl: basePath + 'user_article',//获取收藏的新闻详细接口
  navInfoUrl: basePath + 'navigation_Bar',//导航条参数接口
}
module.exports = urlList;