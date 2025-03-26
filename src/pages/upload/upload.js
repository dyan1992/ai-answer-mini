import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { analyzeImage } from '../../utils/api'
import './upload.less'

export default function Upload() {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        setImageUrl(tempFilePath)
        
        // 模拟上传进度
        simulateUploadProgress()
      },
      fail: (err) => {
        console.error('选择图片失败', err)
        Taro.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    })
  }

  const simulateUploadProgress = () => {
    let progress = 0
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 200)
  }

  const handleAnalyze = async () => {
    if (!imageUrl) {
      Taro.showToast({
        title: '请先上传截图',
        icon: 'none'
      })
      return
    }

    try {
      setIsLoading(true)
      Taro.showLoading({
        title: '正在分析...'
      })
      
      // 调用AI分析接口
      const result = await analyzeImage(imageUrl)
      
      // 分析完成，跳转到分析结果页面
      Taro.hideLoading()
      Taro.navigateTo({
        url: `/pages/analysis/analysis?imageUrl=${encodeURIComponent(imageUrl)}`,
        success: (res) => {
          // 传递分析结果给下一个页面
          res.eventChannel.emit('acceptAnalysisData', result)
        }
      })
    } catch (error) {
      console.error('分析失败', error)
      Taro.hideLoading()
      Taro.showToast({
        title: '分析失败，请重试',
        icon: 'none'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className='upload-container'>
      <Text className='page-title'>上传对话截图</Text>
      
      <View className='upload-area' onClick={handleChooseImage}>
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            mode='aspectFit' 
            className='preview-image'
          />
        ) : (
          <View className='upload-placeholder'>
            <View className='upload-icon'>📷</View>
            <Text className='upload-text'>点击上传对话截图</Text>
            <Text className='upload-hint'>支持微信、QQ、短信等平台截图</Text>
          </View>
        )}
      </View>
      
      {imageUrl && uploadProgress < 100 && (
        <View className='progress-container'>
          <View className='progress-bar'>
            <View 
              className='progress-fill' 
              style={{ width: `${uploadProgress}%` }}
            />
          </View>
          <Text className='progress-text'>{uploadProgress}%</Text>
        </View>
      )}
      
      <View className='button-group'>
        <Button 
          className='primary-button' 
          onClick={handleAnalyze}
          loading={isLoading}
          disabled={!imageUrl || isLoading}
        >
          开始分析
        </Button>
        
        <Button 
          className='secondary-button'
          onClick={() => setImageUrl(null)}
          disabled={!imageUrl || isLoading}
        >
          重新选择
        </Button>
      </View>
      
      <View className='tip-section'>
        <Text className='tip-title'>使用小提示：</Text>
        <View className='tip-item'>
          <Text className='tip-bullet'>•</Text>
          <Text className='tip-content'>请确保截图清晰可读</Text>
        </View>
        <View className='tip-item'>
          <Text className='tip-bullet'>•</Text>
          <Text className='tip-content'>截图中包含完整的对话信息效果更佳</Text>
        </View>
        <View className='tip-item'>
          <Text className='tip-bullet'>•</Text>
          <Text className='tip-content'>支持微信、QQ、短信等主流聊天工具的截图</Text>
        </View>
      </View>
    </View>
  )
}
