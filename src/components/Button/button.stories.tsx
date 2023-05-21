import type { Meta, StoryObj } from '@storybook/react'
import '../../styles/index.scss'
import Button from '.'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'keyie-template/Button',
  component: Button,
  tags: ['autodocs']
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: '主要按钮'
  }
}
export const Size: Story = {
  args: {
    size: 'lg',
    children: '不同尺寸按钮'
  }
}
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮'
  }
}
export const Link: Story = {
  args: {
    btnType: 'link',
    href: 'https://github.com/dianjiqiang',
    target: '_blank',
    children: '链接按钮'
  }
}
