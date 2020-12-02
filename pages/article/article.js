var app = getApp();
Page({
  data: {
    pageBackgroundText : '收藏',
    buttonId : 'collection'//设置收藏事件
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //改变颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff', //字体颜色一般为白色
      backgroundColor: wx.getStorageSync('indexNavColor')
     }),
     wx.setNavigationBarTitle({
      title:  wx.getStorageSync('navTitle')
    }),
    wx.showLoading({
      title: '加载中',
    })
    var newIs = options.id;
    this.newsInfo(newIs);
    this.newsscInfo(newIs);
  },

  //取消收藏
  cancelCollection: function(event){ 
    var that=this
    let value= event.currentTarget.dataset.value //新闻ID
    wx.showLoading({
      title: '加载中',
    })
    //提交至后端
    let url = app.globalData.collectionCloneUrl;
    let data = {"newsId":value,"openId":wx.getStorageSync('openId')};
    app.wxRequest('POST', url, data, (res) => {
      if (res.code==200) {
        that.setData( {
          pageBackgroundColor:  '#05b0ff',
          pageBackgroundText : '收藏',
          buttonId : 'collection'//设置收藏事件
        });  
        //提示
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000
         });
      }else{
        wx.showToast({
          title: res.data,
          icon: 'waiting',
          duration: 2000
         })
      }
      wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  //提交收藏
  collection: function(event){  // 通过collection点击事件触发后面的函数
    var that=this
    let value= event.currentTarget.dataset.value //新闻ID
    wx.showLoading({
      title: '加载中',
    })
    //提交至后端
    var that = this;
    let url = app.globalData.collectionUrl;
    let data = {"newsId":value,"openId":wx.getStorageSync('openId')};
    app.wxRequest('POST', url, data, (res) => {
      if (res.code==200) {
         //改变样式
         that.setData( {
          pageBackgroundColor:  '#ff0000',
          pageBackgroundText : '已收藏',
          buttonId : 'cancelCollection'//设置取消事件
        });  
        //提示
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000
         });
      }else{
        wx.showToast({
          title: res.data,
          icon: 'waiting',
          duration: 2000
         })
      }
      wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  //收藏检测
  newsscInfo: function(newIs) {
    var that = this;
    let url = app.globalData.collectionNewsInfoUrl;
    let data = {"newsId":newIs,"openId":wx.getStorageSync('openId')};
    app.wxRequest('POST', url, data, (res) => {
      if (res.code==-1) {
        that.setData( {
          pageBackgroundColor:  '#ff0000',
          pageBackgroundText : '已收藏',
          buttonId : 'cancelCollection' //设置取消事件
        });  
      }
      wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  //新闻内容
  newsInfo: function(newIs) {
    var that = this;
    let url = app.globalData.articleInfoUrl;
    let data = {"newsId" : newIs};
    app.wxRequest('POST', url, data, (res) => {
        that.setData({
          item : res.data
        })
      wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
    },
    //转发按钮
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
      }
      return {
        title: '转发',
        path: '/pages/article/article?id=' + this.data.list.id,
        success: function (res) {
          console.log('成功', res)
        }
      }
    }
});
