import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

export default function Index() {
  const handleUpload = () => {
    Taro.navigateTo({
      url: '/pages/upload/upload'
    })
  }

  const handleHistory = () => {
    Taro.switchTab({
      url: '/pages/history/history'
    })
  }

  const handleSettings = () => {
    Taro.switchTab({
      url: '/pages/settings/settings'
    })
  }

  return (
    <View className='index-container'>
      <View className='logo-container'>
        <Image className='logo-image' src='../../assets/images/logo.png' />
        <Text className='app-title'>AI回复生成助手</Text>
        <Text className='app-subtitle'>让AI帮你回复消息，高效、智能、贴心</Text>
      </View>

      <View className='feature-list'>
        <View className='feature-item'>
          <View className='feature-icon'>📷</View>
          <View className='feature-text'>
            <Text className='feature-title'>上传对话截图</Text>
            <Text className='feature-desc'>支持微信、QQ、短信等多种平台的对话截图</Text>
          </View>
        </View>

        <View className='feature-item'>
          <View className='feature-icon'>🤖</View>
          <View className='feature-text'>
            <Text className='feature-title'>AI智能分析</Text>
            <Text className='feature-desc'>理解对话内容和上下文，捕捉情感和意图</Text>
          </View>
        </View>

        <View className='feature-item'>
          <View className='feature-icon'>💬</View>
          <View className='feature-text'>
            <Text className='feature-title'>多样回复建议</Text>
            <Text className='feature-desc'>生成多个合适的回复选项，一键复制使用</Text>
          </View>
        </View>
      </View>

      <View className='button-container'>
        <View className='primary-button' onClick={handleUpload}>
          开始使用
        </View>
      </View>
    </View>
  )
}
