// 每个用例称作 一个 case  每个case 测试独立的功能点
test('逻辑测试', () => {
  // 写入的用例的逻辑
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})
// 这里可以写上第二个case 用来判断 是 true 还是 false 自己命名的
test('判断具体是true还是false', () => {
  expect(1).toBeTruthy() // 判断是否是true
  expect(0).toBeFalsy() // 判断是否是false
})

test('测试数字', () => {
  expect(4).toBeGreaterThan(3) // 测试4比3大
  expect(3).toBeLessThan(4) // 测试3比4小
})
test('测试object', () => {
  expect({ name: '张三' }).toEqual({ name: '张三' }) // toEqual 测试值是否相同
})
