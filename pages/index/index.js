/*index.js*/
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
    ],
    list: [],
    indicatorDots: true, //小点，根据图的数量自动增加小点
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 1000, //滑动时间
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
    wx.stopPullDownRefresh();
    this.rotationChart();//获取轮被偷拍
    this.articleInfo();//获取新闻
    this.getLocation();
  },

  //获取新闻信息
  articleInfo: function() {
    var that = this;
    let url = app.globalData.articleUrl;
    let data = {};
    app.wxRequest('POST', url, data, (res) => {
      that.setData({
        list: res.data
     })
     wx.hideLoading();//隐藏加载
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  //轮播图片
  rotationChart : function() {
    var that = this;
    let url = app.globalData.indexPhotoUrl;
    let data = {};
    app.wxRequest('POST', url, data, (res) => {
      that.setData({
        imgUrls: res.data
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
  //天气预报相关
   //获取经纬度方法
   getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.getCity(latitude, longitude);
      }
    })
  },
  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/reverse_geocoding/v3/";
    var params = {
      ak: "这里填写您的KEY",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
        })

        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   //获取常规天气信息
   getWeahter: function (city) {
    var that = this
    var url = "https://free-api.heweather.net/s6/weather"
    var params = {
      location: city,
      key: "这里填写您的KEY"    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var icity = res.data.HeWeather6[0].basic.location;
        var tmp = res.data.HeWeather6[0].now.tmp;
        var txt = res.data.HeWeather6[0].now.cond_txt;
        var code = res.data.HeWeather6[0].now.cond_code;
        var vis = res.data.HeWeather6[0].now.vis;
        var dir = res.data.HeWeather6[0].now.wind_dir;
        var sc = res.data.HeWeather6[0].now.wind_sc;
        var hum = res.data.HeWeather6[0].now.hum;
        var fl = res.data.HeWeather6[0].now.fl;
        var notice = res.data.HeWeather6[0].lifestyle[2].txt;
        var daily_forecast = res.data.HeWeather6[0].daily_forecast;
        that.setData({
          icity: icity,
          tmp: tmp,
          txt: txt,
          code: code,
          vis: vis,
          dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
          daily_forecast: daily_forecast,
          notice: notice
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
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