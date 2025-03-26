import Taro from '@tarojs/taro'

// 模拟 API 服务
export const analyzeImage = async (imageUrl) => {
  // 在实际项目中，这里应该调用真实的 AI 分析服务
  console.log('分析图片:', imageUrl)
  
  // 模拟网络请求延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 返回模拟的分析结果
      resolve({
        conversationContent: '用户: 你好！我想咨询一下你们的产品\n客服: 您好，很高兴为您服务，请问您想了解哪方面的信息？',
        suggestions: [
          '您好！我们有多种产品系列，包括A系列、B系列和C系列，您对哪一种更感兴趣呢？',
          '您好！非常感谢您的咨询。请问您是想了解我们的产品功能、价格还是使用方法呢？',
          '您好！很高兴收到您的咨询。我们的产品有多种型号可供选择，可以根据您的具体需求为您推荐最合适的选择。'
        ]
      })
    }, 1500)
  })
}

export const saveHistory = (data) => {
  try {
    const history = Taro.getStorageSync('history') || []
    const newHistory = [
      {
        id: new Date().getTime(),
        date: new Date().toLocaleString(),
        ...data
      },
      ...history
    ]
    Taro.setStorageSync('history', newHistory.slice(0, 30)) // 只保留最近30条
    return true
  } catch (e) {
    console.error('保存历史记录失败', e)
    return false
  }
}

export const getHistory = () => {
  try {
    return Taro.getStorageSync('history') || []
  } catch (e) {
    console.error('获取历史记录失败', e)
    return []
  }
}

export const deleteHistory = (id) => {
  try {
    const history = Taro.getStorageSync('history') || []
    const newHistory = history.filter(item => item.id !== id)
    Taro.setStorageSync('history', newHistory)
    return true
  } catch (e) {
    console.error('删除历史记录失败', e)
    return false
  }
}

export const getSettings = () => {
  try {
    return Taro.getStorageSync('settings') || {
      responseStyle: 'normal',
      autoAnalyze: true,
      responseLength: 'medium'
    }
  } catch (e) {
    console.error('获取设置失败', e)
    return {
      responseStyle: 'normal',
      autoAnalyze: true,
      responseLength: 'medium'
    }
  }
}

export const saveSettings = (settings) => {
  try {
    Taro.setStorageSync('settings', settings)
    return true
  } catch (e) {
    console.error('保存设置失败', e)
    return false
  }
}
