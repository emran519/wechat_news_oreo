//app.js
const urlList  = require('config.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

//改变状态栏颜色
wx.request({
  url: urlList.navInfoUrl, 
  method: "POST",
  header: {
    'content-type': 'application/x-www-form-urlencoded' 
  },
  success: function (res) {
    console.log(res)
    if (res.data.code==200) {
      //改变颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff', //字体颜色一般为白色
      backgroundColor: res.data.data.applet_navigation_bar_color
     }),
     wx.setNavigationBarTitle({
      title: res.data.data.applet_navigation_bar_title
    }),
      //写入缓存
      wx.setStorageSync('indexNavColor', res.data.data.applet_navigation_bar_color) //全局导航条颜色
      wx.setStorageSync('navTitle', res.data.data.applet_navigation_bar_title)//导航条标题
      wx.setStorageSync('userNavColor', res.data.data.applet_user_navigation_bar_color)//用户页面颜色
    } else {   
      wx.setNavigationBarColor({
        frontColor: '#ffffff', //字体颜色一般为白色
        backgroundColor:'#05b0ff'
       }),
       wx.setNavigationBarTitle({
        title:  '课设:高校新闻'
      }),
      wx.setStorageSync('indexNavColor', '#05b0ff') //全局导航条颜色
      wx.setStorageSync('navTitle', '课设:高校新闻')//导航条标题
      wx.setStorageSync('userNavColor', '#05b0ff')//用户页面颜色
    } 
  }
})
    // 登录
wx.login({ //wx.login 会返回code 
  success: res => {
    if (res.code) {//如果res.code包含参数则为true 执行下一步
      wx.request({//发送 res.code 到后台换取 openId, sessionKey, unionId
        url: urlList.loginUrl, //仅为示例，并非真实的接口地址
        method: "POST",//方法get / post
        data: {
          "code": res.code
        },
        header: {//设置请求头
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        // 小程序包含多种接收方式 sueccess（成功） / fail（失败）/ complent(成功/失败) 
        success: function (res) {//请求成功接收res
          if (res.data.code==200) {
            wx.setStorage({
              key: "openId",
              data: res.data.data,
            })
          }
        }
      })
    }
  }
})
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //读取缓存
              // console.log( wx.setStorageSync('openId'));
              //发送给后端
              wx.request({//发送 res.code 到后台换取 openId, sessionKey, unionId
                url: urlList.userInfoUrl, //仅为示例，并非真实的接口地址
                method: "POST",//方法get / post
                data: {
                  "openId":  wx.getStorageSync('openId'),
                  "avatarUrl":  res.userInfo.avatarUrl,
                  "nickName":  res.userInfo.nickName,
                  "gender":  res.userInfo.gender,
                  "city":  res.userInfo.city,
                  "country":  res.userInfo.country,
                  "province":  res.userInfo.province
                },
                header: {//设置请求头
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                // 小程序包含多种接收方式 sueccess（成功） / fail（失败）/ complent(成功/失败) 
                success: function (res) {//请求成功接收res
                  if (res.data.code==200) {
              
                  }else{   
                 
                  } 
                }
              })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
 /**
  * 封装wx.request请求
  * method： 请求方式
  * url: 请求地址
  * data： 要传递的参数
  * callback： 请求成功回调函数
  * errFun： 请求失败回调函数
  **/
 wxRequest(method, url, data='', callback, errFun) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    dataType: 'json',
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      errFun(res);
    }
  })
},
  globalData: {
    userInfo: null,
    indexPhotoUrl : urlList.indexPhotoUrl,
    articleUrl : urlList.articleUrl,
    articleInfoUrl : urlList.articleInfoUrl,
    collectionUrl : urlList.collectionUrl,
    collectionNewsInfoUrl : urlList.collectionNewsInfoUrl,
    articleInfoUserUrl : urlList.articleInfoUserUrl,
    collectionCloneUrl : urlList.collectionCloneUrl,
    navInfoUrl : urlList.navInfoUrl,
  }
})