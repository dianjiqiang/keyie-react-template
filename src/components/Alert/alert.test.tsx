import { render, screen } from '@testing-library/react'
import Alert from '.'

const defaultAlertProps = {
  onClose: jest.fn()
}

describe('测试alert组件', () => {
  it('警告框', () => {
    render(<Alert {...defaultAlertProps}>警告框</Alert>)
    const view = screen.getByText('警告框')

    expect(view).toBeInTheDocument()
  })
})
