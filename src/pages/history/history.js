import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, ScrollView, Image, Button } from '@tarojs/components'
import { getHistory, deleteHistory } from '../../utils/api'
import './history.less'

export default function History() {
  const [history, setHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(history)
    } else {
      const filtered = history.filter(item => 
        (item.conversation && item.conversation.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.response && item.response.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredHistory(filtered)
    }
  }, [searchQuery, history])

  const loadHistory = () => {
    setIsLoading(true)
    const historyData = getHistory()
    setHistory(historyData)
    setFilteredHistory(historyData)
    setIsLoading(false)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.detail.value)
  }

  const handleCopyResponse = (response) => {
    Taro.setClipboardData({
      data: response,
      success: () => {
        Taro.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  }

  const handleDelete = (id) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          if (deleteHistory(id)) {
            setHistory(prevHistory => prevHistory.filter(item => item.id !== id))
            Taro.showToast({
              title: '删除成功',
              icon: 'success'
            })
          } else {
            Taro.showToast({
              title: '删除失败',
              icon: 'error'
            })
          }
        }
      }
    })
  }

  return (
    <View className='history-container'>
      <View className='search-box'>
        <View className='search-icon'>🔍</View>
        <Input
          className='search-input'
          value={searchQuery}
          onInput={handleSearch}
          placeholder='搜索历史记录'
          confirmType='search'
        />
        {searchQuery && (
          <View className='search-clear' onClick={() => setSearchQuery('')}>✕</View>
        )}
      </View>

      {isLoading ? (
        <View className='loading-view'>加载中...</View>
      ) : (
        <ScrollView scrollY className='history-list'>
          {filteredHistory.length > 0 ? (
            filteredHistory.map(item => (
              <View key={item.id} className='history-item'>
                <View className='history-header'>
                  <Text className='history-date'>{item.date}</Text>
                  <Button 
                    className='history-delete' 
                    onClick={() => handleDelete(item.id)}
                  >
                    删除
                  </Button>
                </View>
                
                {item.imageUrl && (
                  <Image 
                    src={item.imageUrl} 
                    mode='widthFix' 
                    className='history-image'
                    onClick={() => Taro.previewImage({
                      current: item.imageUrl,
                      urls: [item.imageUrl]
                    })}
                  />
                )}
                
                {item.conversation && (
                  <View className='history-conversation'>
                    <Text className='history-section-title'>对话内容：</Text>
                    <Text className='history-conversation-text'>{item.conversation}</Text>
                  </View>
                )}
                
                {item.response && (
                  <View className='history-response'>
                    <View className='history-response-header'>
                      <Text className='history-section-title'>回复内容：</Text>
                      <Button 
                        className='history-copy' 
                        onClick={() => handleCopyResponse(item.response)}
                      >
                        复制
                      </Button>
                    </View>
                    <Text className='history-response-text'>{item.response}</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View className='empty-state'>
              <View className='empty-icon'>📝</View>
              <Text className='empty-text'>
                {searchQuery ? '没有找到匹配的记录' : '暂无历史记录'}
              </Text>
              {searchQuery && (
                <Button 
                  className='secondary-button empty-button'
                  onClick={() => setSearchQuery('')}
                >
                  清除搜索
                </Button>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  )
}
