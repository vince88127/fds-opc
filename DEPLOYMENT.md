# 飞碟社OPC 部署指南

## 🚀 方法一: Vercel部署(推荐,最简单免费)

### 步骤1: 上传代码到GitHub

1. **创建GitHub账号**
   - 访问 https://github.com
   - 点击"Sign up"注册账号(如果已有账号可跳过)

2. **创建新仓库**
   - 登录GitHub后,点击右上角"+"号
   - 选择"New repository"
   - 仓库名称填写: `fds-opc`
   - 选择"Public"(公开)或"Private"(私有)
   - 点击"Create repository"

3. **上传代码到GitHub**
   
   在终端(Terminal)中运行以下命令:
   
   ```bash
   # 已经完成了 git init 和 git commit
   
   # 添加远程仓库(替换YOUR_USERNAME为你的GitHub用户名)
   git remote add origin https://github.com/YOUR_USERNAME/fds-opc.git
   
   # 推送代码
   git branch -M main
   git push -u origin main
   ```

### 步骤2: 部署到Vercel

1. **访问Vercel**
   - 打开 https://vercel.com
   - 点击"Sign Up"注册(建议用GitHub账号登录)

2. **导入项目**
   - 登录后,点击"Add New..." → "Project"
   - 选择"Import Git Repository"
   - 找到你的`fds-opc`仓库,点击"Import"

3. **配置项目**
   - Framework Preset: 自动检测为"Next.js"
   - Root Directory: 保持默认
   - Build Command: 保持默认 `npm run build`
   - Output Directory: 保持默认 `.next`
   - 点击"Deploy"

4. **等待部署完成**
   - 大约1-2分钟后部署完成
   - 会自动生成一个网址,如: `https://fds-opc.vercel.app`

5. **访问你的网站**
   - 点击生成的网址即可访问!
   - 每次推送代码到GitHub,Vercel会自动重新部署

---

## 🌐 方法二: Netlify部署(免费)

### 步骤1: 上传代码到GitHub(同上)

### 步骤2: 部署到Netlify

1. **访问Netlify**
   - 打开 https://netlify.com
   - 点击"Sign up"注册(建议用GitHub账号登录)

2. **导入项目**
   - 点击"Add new site" → "Import an existing project"
   - 选择"GitHub"
   - 授权Netlify访问你的GitHub
   - 选择`fds-opc`仓库

3. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - 点击"Deploy site"

4. **访问网站**
   - 部署完成后会生成网址
   - 可以在设置中自定义域名

---

## 🖥️ 方法三: 自己的服务器部署

### 前提条件
- 一台Linux服务器(Ubuntu/CentOS等)
- 已安装Node.js 18+和npm

### 步骤1: 上传代码到服务器

```bash
# 方式1: 通过Git
ssh user@your-server-ip
git clone https://github.com/YOUR_USERNAME/fds-opc.git
cd fds-opc

# 方式2: 通过FTP/SFTP上传整个项目文件夹
```

### 步骤2: 安装依赖

```bash
npm install
```

### 步骤3: 构建项目

```bash
npm run build
```

### 步骤4: 启动服务

```bash
# 开发模式(不推荐生产环境)
npm run dev

# 生产模式
npm start
```

### 步骤5: 使用PM2保持运行(推荐)

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "fds-opc" -- start

# 设置开机自启
pm2 startup
pm2 save
```

### 步骤6: 配置Nginx反向代理(可选)

创建Nginx配置文件 `/etc/nginx/sites-available/fds-opc`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置:
```bash
sudo ln -s /etc/nginx/sites-available/fds-opc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📝 部署后的配置

### 1. 环境变量(如果需要)

在Vercel/Netlify的项目设置中添加环境变量:
- 数据库连接
- API密钥
- 其他敏感信息

### 2. 自定义域名

**Vercel:**
1. 进入项目设置
2. 点击"Domains"
3. 添加你的域名
4. 按照提示配置DNS

**Netlify:**
1. 进入Site settings
2. 点击"Domain management"
3. 添加自定义域名

### 3. HTTPS配置

Vercel和Netlify会自动配置HTTPS证书,无需手动操作!

---

## ✅ 部署检查清单

- [ ] 代码已上传到GitHub
- [ ] 在Vercel/Netlify创建了项目
- [ ] 部署成功,可以访问网址
- [ ] 首页正常显示
- [ ] 导航栏功能正常
- [ ] 后台管理可以访问(`/admin`)
- [ ] 所有页面都能正常打开

---

## 🆘 常见问题

### Q: 部署后页面显示404
A: 检查构建日志,确保没有错误。Next.js需要正确的路由配置。

### Q: 图片不显示
A: 确保图片文件在`public`目录下,并且路径正确。

### Q: 部署很慢
A: 第一次部署会比较慢,后续更新会快很多。

### Q: 如何更新网站内容?
A: 修改代码后,推送到GitHub,Vercel/Netlify会自动重新部署。

```bash
git add .
git commit -m "更新内容"
git push
```

---

## 📞 技术支持

如有问题,请联系飞碟社OPC管理员。

---

## 🎉 推荐部署方案

**新手推荐**: Vercel
- ✅ 完全免费
- ✅ 自动部署
- ✅ 免费HTTPS
- ✅ 全球CDN加速
- ✅ 无需服务器知识

**进阶用户**: 自己的服务器
- ✅ 完全控制
- ✅ 可以自定义配置
- ✅ 适合大流量网站
