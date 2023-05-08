import React, { memo } from 'react'
import type { ReactNode } from 'react'

// import Button from './components/Button'
import Alert from './components/Alert'

interface AppType {
  children?: ReactNode
}

const App: React.FC<AppType> = memo(() => {
  return (
    <div style={{ padding: '100px' }}>
      <Alert>哈哈提示框</Alert>
      <Alert title="嘿嘿嘿,提示框" type="success" />
      <Alert type="danger">哈哈提示框</Alert>
      <Alert type="warning">警告框</Alert>
      <Alert title="嘿嘿嘿,提示框" description="带描述文本的奥" type="success" />
    </div>
  )
})

App.displayName = 'App'

export default App
