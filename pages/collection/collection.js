/*index.js*/
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
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
    this.articleInfo();//获取新闻
  },
//获取新闻
  articleInfo: function() {
    var that = this;
    let url = app.globalData.articleInfoUserUrl;
    let data = {"openId":wx.getStorageSync('openId')};
    app.wxRequest('POST', url, data, (res) => {
      that.setData({
       list: res.data
      })
     wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  },
  //下拉刷新
  onPullDownRefresh: function(){
    var taht = this;
    taht.setData({
      currenTab:0
    })
    this.onLoad();
  }
  
})