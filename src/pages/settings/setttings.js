import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Picker, Switch, Button } from '@tarojs/components'
import { getSettings, saveSettings } from '../../utils/api'
import './settings.less'

export default function Settings() {
  const [settings, setSettings] = useState({
    responseStyle: 'normal',
    autoAnalyze: true,
    responseLength: 'medium'
  })
  const [hasChanges, setHasChanges] = useState(false)
  
  // 响应风格选项
  const styleOptions = [
    { label: '正常', value: 'normal' },
    { label: '幽默', value: 'humorous' },
    { label: '正式', value: 'formal' },
    { label: '简洁', value: 'concise' },
    { label: '热情', value: 'enthusiastic' }
  ]
  
  // 回复长度选项
  const lengthOptions = [
    { label: '简短', value: 'short' },
    { label: '中等', value: 'medium' },
    { label: '详细', value: 'long' }
  ]

  useEffect(() => {
    // 加载保存的设置
    const savedSettings = getSettings()
    if (savedSettings) {
      setSettings(savedSettings)
    }
  }, [])

  // 处理设置更改
  const handleSettingChange = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value }
      setHasChanges(true)
      return newSettings
    })
  }

  // 保存设置
  const handleSaveSettings = () => {
    if (saveSettings(settings)) {
      Taro.showToast({
        title: '设置已保存',
        icon: 'success'
      })
      setHasChanges(false)
    } else {
      Taro.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  }

  // 恢复默认设置
  const handleResetSettings = () => {
    Taro.showModal({
      title: '恢复默认设置',
      content: '确定要恢复所有设置为默认值吗？',
      success: (res) => {
        if (res.confirm) {
          const defaultSettings = {
            responseStyle: 'normal',
            autoAnalyze: true,
            responseLength: 'medium'
          }
          setSettings(defaultSettings)
          saveSettings(defaultSettings)
          Taro.showToast({
            title: '已恢复默认设置',
            icon: 'success'
          })
          setHasChanges(false)
        }
      }
    })
  }

  return (
    <View className='settings-container'>
      <Text className='page-title'>设置</Text>
      
      <View className='settings-group'>
        <Text className='group-title'>AI回复设置</Text>
        
        <View className='settings-item'>
          <View className='settings-label'>
            <Text className='label-text'>回复风格</Text>
            <Text className='label-desc'>设置AI生成回复的语气和风格</Text>
          </View>
          <Picker
            mode='selector'
            range={styleOptions.map(option => option.label)}
            onChange={e => {
              const selectedValue = styleOptions[e.detail.value].value
              handleSettingChange('responseStyle', selectedValue)
            }}
            value={styleOptions.findIndex(option => option.value === settings.responseStyle)}
          >
            <View className='picker-value'>
              {styleOptions.find(option => option.value === settings.responseStyle)?.label}
            </View>
          </Picker>
        </View>
        
        <View className='settings-item'>
          <View className='settings-label'>
            <Text className='label-text'>回复长度</Text>
            <Text className='label-desc'>设置生成回复的详细程度</Text>
          </View>
          <Picker
            mode='selector'
            range={lengthOptions.map(option => option.label)}
            onChange={e => {
              const selectedValue = lengthOptions[e.detail.value].value
              handleSettingChange('responseLength', selectedValue)
            }}
            value={lengthOptions.findIndex(option => option.value === settings.responseLength)}
          >
            <View className='picker-value'>
              {lengthOptions.find(option => option.value === settings.responseLength)?.label}
            </View>
          </Picker>
        </View>
      </View>
      
      <View className='settings-group'>
        <Text className='group-title'>应用设置</Text>
        
        <View className='settings-item'>
          <View className='settings-label'>
            <Text className='label-text'>自动分析</Text>
            <Text className='label-desc'>上传截图后自动开始分析</Text>
          </View>
          <Switch 
            checked={settings.autoAnalyze}
            onChange={e => handleSettingChange('autoAnalyze', e.detail.value)}
            color='#007bff'
          />
        </View>
      </View>
      
      <View className='settings-group'>
        <Text className='group-title'>关于</Text>
        
        <View className='settings-item'>
          <View className='settings-label'>
            <Text className='label-text'>版本</Text>
          </View>
          <Text className='settings-value'>v1.0.0</Text>
        </View>
      </View>
      
      <View className='button-container'>
        {hasChanges && (
          <Button 
            className='primary-button' 
            onClick={handleSaveSettings}
          >
            保存设置
          </Button>
        )}
        <Button 
          className='secondary-button' 
          onClick={handleResetSettings}
        >
          恢复默认设置
        </Button>
      </View>
    </View>
  )
}
