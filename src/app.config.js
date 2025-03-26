export default {
  pages: [
    'pages/index/index',
    'pages/upload/upload',
    'pages/analysis/analysis',
    'pages/history/history',
    'pages/settings/settings'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#007bff',
    navigationBarTitleText: 'AI回复生成',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#8a8a8a',
    selectedColor: '#007bff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/history/history',
        text: '历史',
        iconPath: 'assets/icons/history.png',
        selectedIconPath: 'assets/icons/history-active.png'
      },
      {
        pagePath: 'pages/settings/settings',
        text: '设置',
        iconPath: 'assets/icons/settings.png',
        selectedIconPath: 'assets/icons/settings-active.png'
      }
    ]
  }
}
