import React, { useState, useEffect } from 'react'
import Taro, { useRouter, getCurrentInstance } from '@tarojs/taro'
import { View, Text, ScrollView, Button, Textarea, Image } from '@tarojs/components'
import { saveHistory } from '../../utils/api'
import './analysis.less'

export default function Analysis() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [conversation, setConversation] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedResponse, setSelectedResponse] = useState('')
  const [customResponse, setCustomResponse] = useState('')

  useEffect(() => {
    const eventChannel = getCurrentInstance().getOpenerEventChannel()
    eventChannel.on('acceptAnalysisData', (data) => {
      setConversation(data.conversationContent)
      setSuggestions(data.suggestions)
    })
    
    if (router.params.imageUrl) {
      setImageUrl(decodeURIComponent(router.params.imageUrl))
    }
  }, [router.params])

  const handleSelectResponse = (response) => {
    setSelectedResponse(response)
    setCustomResponse(response)
  }

  const handleCustomResponseChange = (e) => {
    setCustomResponse(e.detail.value)
  }

  const handleCopy = () => {
    if (!customResponse.trim()) {
      Taro.showToast({
        title: '请先选择或输入回复内容',
        icon: 'none'
      })
      return
    }
    
    Taro.setClipboardData({
      data: customResponse,
      success: () => {
        Taro.showToast({
          title: '已复制到剪贴板'
        })
        
        // 保存到历史记录
        saveHistory({
          imageUrl,
          conversation,
          response: customResponse
        })
      }
    })
  }

  const handleGoBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='analysis-container'>
      <ScrollView scrollY className='analysis-scroll'>
        <Text className='page-title'>AI回复建议</Text>
        
        <View className='section conversation-section'>
          <Text className='section-title'>对话内容</Text>
          <View className='conversation-preview'>
            {imageUrl && (
              <Image src={imageUrl} mode='widthFix' className='conversation-image' />
            )}
            <Text className='conversation-text'>{conversation}</Text>
          </View>
        </View>
        
        <View className='section suggestions-section'>
          <Text className='section-title'>AI建议回复</Text>
          {suggestions.map((suggestion, index) => (
            <View 
              key={index} 
              className={`suggestion-item ${selectedResponse === suggestion ? 'selected' : ''}`} 
              onClick={() => handleSelectResponse(suggestion)}
            >
              <Text className='suggestion-text'>{suggestion}</Text>
              <View className='suggestion-select-icon'>
                {selectedResponse === suggestion && '✓'}
              </View>
            </View>
          ))}
        </View>
        
        <View className='section custom-section'>
          <Text className='section-title'>自定义回复</Text>
          <Textarea
            className='custom-textarea'
            value={customResponse}
            onInput={handleCustomResponseChange}
            placeholder='编辑或输入您的回复内容'
          />
        </View>
      </ScrollView>
      
      <View className='action-bar'>
        <Button className='secondary-button action-button' onClick={handleGoBack}>
          返回
        </Button>
        <Button className='primary-button action-button' onClick={handleCopy}>
          复制回复
        </Button>
      </View>
    </View>
  )
}
