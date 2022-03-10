const app = getApp();
let timeset = "111"
Page({
  data: {
    title_text: "欢迎进入打卡系统",
    date: {
      "nowTime": "", //当前时间
      "nowDay": "",
      "timeStamp": ""
    },
    listDate: [],
    setInter: "",
    userInfo: {},
    userInfostr: "",
    hasUserInfo: false,
    canIUseGetUserProfile: false,

  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 页面创建时执行
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {

        }
      }
    })
    //加载成功调用函数
    let that = this;
    that.data.setInter = setInterval(function () {
      that.getNowtimes()
      console.log(timeset)
    }, 1000)
    //第一次进页面加载历史打卡时间
    that.onceList()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: "zh_TW",
      success: (res) => {
        console.log("获取成功", res)
        var userStr = JSON.stringify(res)
        this.setData({
          userInfo: res.userInfo,
          userInfostr: userStr,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(e)
  },
  getNowtimes(e) {
    var padaDate = function (value) {
      return value < 10 ? '0' + value : value;
    };
    const date = new Date();
    const timestamp = date.getTime()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()
    const days = date.getDate() //获取日期
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")

    const nowDayto = year + " 年 " + month + " 月 " + days + " 日 " + week[day]
    var timestr=(hour<13)? "上午":"下午"
    const nowTimes = padaDate(hour) + " : " + padaDate(minute) + " :" + padaDate(second)+"  "+timestr
    this.setData({
      date: {
        nowTime: nowTimes,
        nowDay: nowDayto,
        timeStamp: timestamp
      }
    })
  },
  toTime(data){
    return "转换"
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //打卡
  cellDate() {
    var that = this;
    // clearInterval(that.data.setInter)
    var datas = that.data.date;
    var listarr = []
    
    try {
      var value = wx.getStorageSync('celldateList')
      if (value == "") {
        listarr = []
      } else {
        listarr = JSON.parse(value)
      }
      // Do something with return value
      var datas = that.data.date;
      listarr.unshift(datas)
      this.setData({
        listDate: listarr
      })
      //添加存储
      try {
        var setdatas = JSON.stringify(listarr)
        wx.setStorageSync('celldateList', setdatas)
      } catch (e) {}

    } catch (e) {
      try {
        var nowdata = JSON.stringify("[]")
        wx.setStorageSync('celldateList', nowdata)
      } catch (e) {
        console.log("存储空数组失败")
      }
    }

    // console.log("清除定时")
  },
onceList(){
  var that=this;
  var listarr=[];
  try {
    var value = wx.getStorageSync('celldateList')
    if (value == "") {
      listarr = []
    } else {
      listarr = JSON.parse(value)
      that.setData({
        listDate: listarr
      })
    }
  } catch (e) {}
},













  onShow: function () {
    // 页面出现在前台时执行
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
  },
  onHide: function () {
    // 页面从前台变为后台时执行
  },
  onUnload: function () {
    // 页面销毁时执行
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  onPullDownRefresh: function () {
    // 触发下拉刷新时执行
  },
  onReachBottom: function () {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  onResize: function () {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  //获取是否授权
  bindGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
    } else {
      console.log("点击了拒绝授权");
    }
  }
})