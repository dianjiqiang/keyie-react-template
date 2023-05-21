import type { Meta, StoryObj } from '@storybook/react'
import '../../styles/index.scss'
import Alert from '.'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'keyie-template/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'clicked' }
  }
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>
export const Danger: Story = {
  args: {
    type: 'danger',
    children: '危险警告框'
  }
}
export const Closable: Story = {
  args: {
    closable: false,
    children: '无关闭按钮'
  }
}
export const TitleValue: Story = {
  args: {
    title: 'title方式传值'
  }
}
export const CloseCallback: Story = {
  args: {
    description: '可以在这里添加任意的描述性文本哦, 当返回false的时候不关闭警告框.',
    children: '关闭回调'
  }
}
