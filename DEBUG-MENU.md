# 用户菜单调试指南

## 问题现象
- 用户头像显示正常(紫色圆形,中间有字母U)
- 点击头像没有反应,下拉菜单不出现

## 调试步骤

### 1. 打开浏览器开发者工具
- Chrome/Edge: 按 `F12` 或 `Cmd+Option+I` (Mac)
- 查看 Console 标签页

### 2. 点击用户头像
应该看到以下日志:
```
UserMenu render, isOpen: false
Toggle menu clicked, current state: false
Setting isOpen to: true
UserMenu render, isOpen: true
```

### 3. 检查元素
- 在开发者工具中,点击 Elements/元素 标签
- 找到用户头像按钮
- 查看是否有下拉菜单的 div 元素

### 4. 可能的问题

#### 问题A: 没有任何日志
**原因**: 点击事件没有触发
**解决**: 
- 检查是否有其他元素覆盖在头像上
- 检查CSS的 `pointer-events` 属性

#### 问题B: 有日志但没有菜单
**原因**: 菜单被隐藏或z-index问题
**解决**:
- 检查菜单的 `display` 属性
- 检查 `z-index` 是否足够高
- 检查是否被父元素的 `overflow: hidden` 裁剪

#### 问题C: 菜单一闪而过
**原因**: 点击外部事件立即触发
**解决**:
- 检查 `handleClickOutside` 函数
- 确保 `menuRef` 正确绑定

## 临时测试页面
访问: http://localhost:3000/test-menu

这个页面只包含用户菜单组件,更容易调试。

## 手动测试
在浏览器控制台输入:
```javascript
// 检查组件是否存在
document.querySelector('[aria-label="用户菜单"]')

// 手动触发点击
document.querySelector('[aria-label="用户菜单"]').click()
```

## 联系信息
如果以上步骤都无法解决,请提供:
1. 浏览器控制台的完整日志
2. Elements标签中用户菜单部分的HTML结构截图
3. 使用的浏览器和版本
