import { render, screen, fireEvent } from '@testing-library/react'

import Button, { ButtonSize, ButtonType } from '.'

// 不使用 jest-dom的测试用例
// test('Button测试用例', () => {
//   render(<Button>Nice</Button>)
//   // 在组件上 找到 我们的 nice 文字 表示我们的 Button 已经被成功挂载了
//   expect(screen.getByText('Nice')).toBeInTheDocument()
// })

const defaultProps = {
  onClick: jest.fn() // mockFunction
}
const moreTypeProps = {
  onClick: jest.fn(),
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}
const linkTypeProps = {
  onClick: jest.fn(),
  btnType: ButtonType.Link,
  href: 'https://www.baidu.com',
  size: ButtonSize.Small
}
const disabledTypeProps = {
  onClick: jest.fn(),
  disabled: true
}

describe('测试button组件', () => {
  it('针对什么都不加的一些测试用例', () => {
    render(<Button {...defaultProps}>button元素</Button>)
    const view = screen.getByText('button元素')
    expect(view).toBeInTheDocument()
    expect(view.tagName).toEqual('BUTTON') // 测试我们挂载的元素是不是button
    expect(view).toHaveClass('btn btn-default') // 测试我们的class是否包含在其中
    fireEvent.click(view) // 我们调用click事件 在我们的view组件上面
    expect(defaultProps.onClick).toHaveBeenCalled() // 表示这个方法已经被调用到了
  })
  it('针对不同的属性测试用例', () => {
    render(<Button {...moreTypeProps}>属性的测试</Button>)
    const view = screen.getByText('属性的测试')
    fireEvent.click(view)
    expect(moreTypeProps.onClick).toHaveBeenCalled()
    expect(view).toHaveClass('btn btn-primary btn-lg klass')
  })
  it('针对link 且 href 提供的时候的测试用例', () => {
    render(<Button {...linkTypeProps}>属性的测试</Button>)
    const view = screen.getByText('属性的测试')
    fireEvent.click(view)
    expect(linkTypeProps.onClick).toHaveBeenCalled()
    expect(view).toHaveClass('btn btn-link btn-sm')
    expect(view.tagName).toEqual('A')
  })
  it('针对我们是disabled的测试用例', () => {
    render(<Button {...disabledTypeProps}>属性的测试</Button>)
    const view = screen.getByText('属性的测试') as HTMLButtonElement
    expect(view.disabled).toBeTruthy()
    fireEvent.click(view)
    expect(linkTypeProps.onClick).not.toHaveBeenCalled() // 是否不能点击
  })
})
