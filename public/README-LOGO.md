# 如何替换Logo

## 步骤:

1. 将你的飞碟社OPC Logo图片保存到这个目录(`public/`)
2. 文件名可以是:
   - `logo.png` (PNG格式)
   - `logo.svg` (SVG格式,推荐)
   - `logo.jpg` (JPG格式)

3. 如果使用PNG或JPG格式,需要修改 `components/navbar.tsx` 中的图片路径:
   ```tsx
   src="/logo.png"  // 或 "/logo.jpg"
   ```

## 推荐尺寸:
- 宽度: 200-400px
- 高度: 200-400px
- 格式: SVG(矢量图,最佳) 或 PNG(透明背景)

## 当前状态:
- 已创建临时SVG占位符 (`logo.svg`)
- 请用你的真实Logo替换它
