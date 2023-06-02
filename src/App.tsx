import React, { memo } from 'react'
import type { ReactNode } from 'react'

// import Button from './components/Button'
// import Alert from './components/Alert'
// import Title from './components/Title'
// import Divider from './components/Divider'
import Menu from './components/Menu'
import SubMenu from './components/SubMenu'
import MenuItem from './components/MenuItem'
// import Tabs from './components/Tabs'
// import TabsItem from './components/TabsItem'
// import Icon from './components/Icon'
import Input from './components/Input'

interface AppType {
  children?: ReactNode
}

const App: React.FC<AppType> = memo(() => {
  return (
    <div style={{ padding: '100px' }}>
      <Menu defaultKeyId={'123'}>
        <MenuItem keyId={321}>啊哈哈</MenuItem>
        <MenuItem keyId={'asd'}>呵呵</MenuItem>
        <SubMenu keyId={'asdhjjf'} title={<span>张三</span>}>
          <MenuItem keyId={'xxz'}>尼玛</MenuItem>
        </SubMenu>
        <MenuItem keyId={'axaxxx'}>嘻嘻</MenuItem>
      </Menu>
      <Menu defaultKeyId={'123'} mode="vertical">
        <MenuItem keyId={321}>啊哈哈</MenuItem>
        <MenuItem keyId={'asd'}>呵呵</MenuItem>
        <SubMenu keyId={'asdhjjf'} title={<span>张三</span>}>
          <MenuItem keyId={'xxz'}>尼玛</MenuItem>
        </SubMenu>
        <SubMenu keyId={'asdhjjf2'} title={<span>张三</span>}>
          <MenuItem keyId={'xxz2'}>尼玛</MenuItem>
        </SubMenu>
        <MenuItem keyId={'axaxxx'}>嘻嘻</MenuItem>
      </Menu>
    </div>
  )
})

App.displayName = 'App'

export default App
