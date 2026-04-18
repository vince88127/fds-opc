# 自定义域名配置指南

## 🌐 将网站绑定到你的域名

假设你买的域名是: `fdsopc.com`

---

## 方法一: Vercel绑定域名(推荐)

### 步骤1: 在Vercel添加域名

1. **登录Vercel**
   - 访问 https://vercel.com
   - 进入你的项目(fds-opc)

2. **添加域名**
   - 点击项目顶部的 "Settings"(设置)
   - 左侧菜单选择 "Domains"(域名)
   - 在输入框中输入你的域名,如: `fdsopc.com`
   - 点击 "Add"

3. **选择配置方式**
   
   Vercel会显示两种配置方式:
   
   **方式A: 推荐 - 使用Vercel的DNS服务器**
   - 更简单,Vercel自动管理
   - 需要修改域名的DNS服务器
   
   **方式B: 使用你现有的DNS服务器**
   - 需要手动添加DNS记录
   - 更灵活,可以保留其他DNS设置

### 步骤2A: 使用Vercel DNS(推荐)

1. **Vercel会显示DNS服务器地址**,类似:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. **去你的域名注册商修改DNS服务器**

   **如果在阿里云:**
   - 登录 https://dc.aliyun.com
   - 找到你的域名
   - 点击"管理" → "DNS修改"
   - 修改DNS服务器为Vercel提供的地址
   - 保存

   **如果在腾讯云:**
   - 登录 https://console.cloud.tencent.com/domain
   - 找到你的域名
   - 点击"管理" → "修改DNS服务器"
   - 修改为Vercel提供的地址
   - 保存

   **如果在GoDaddy:**
   - 登录 https://www.godaddy.com
   - My Products → Domains
   - 点击域名旁的"DNS"
   - 修改Nameservers为Vercel提供的地址
   - 保存

3. **等待DNS生效**
   - 通常需要几分钟到24小时
   - Vercel会自动配置HTTPS证书

### 步骤2B: 使用现有DNS服务器

1. **Vercel会显示需要添加的DNS记录**:

   **主域名** (fdsopc.com):
   ```
   类型: A
   名称: @
   值: 76.76.21.21
   ```

   **www子域名** (www.fdsopc.com):
   ```
   类型: CNAME
   名称: www
   值: cname.vercel-dns.com
   ```

2. **在域名DNS管理中添加记录**

   **阿里云DNS:**
   - 登录阿里云控制台
   - 云解析DNS → 找到你的域名
   - 点击"解析设置"
   - 点击"添加记录"
   - 按照上面的信息添加A记录和CNAME记录

   **腾讯云DNS:**
   - 登录腾讯云控制台
   - DNSPod → 我的域名
   - 点击域名进入解析设置
   - 添加记录

   **Cloudflare:**
   - 登录Cloudflare
   - 选择你的域名
   - DNS → Add record
   - 添加A记录和CNAME记录

3. **等待DNS生效**
   - 通常5-30分钟
   - 可以用 https://dnschecker.org 检查

### 步骤3: 验证域名

1. **等待Vercel验证**
   - Vercel会自动检测DNS配置
   - 配置正确后会显示绿色✓

2. **自动配置HTTPS**
   - Vercel会自动申请SSL证书
   - 几分钟后你的网站就支持HTTPS了

3. **访问你的域名**
   - 打开浏览器访问: `https://fdsopc.com`
   - 你的网站就上线了!

---

## 方法二: Netlify绑定域名

### 步骤1: 在Netlify添加域名

1. 登录Netlify
2. 进入你的项目
3. 点击 "Domain settings"
4. 点击 "Add custom domain"
5. 输入你的域名: `fdsopc.com`
6. 点击 "Verify"

### 步骤2: 配置DNS

Netlify会显示需要添加的DNS记录:

**主域名:**
```
类型: A
名称: @
值: 75.2.60.5
```

**www子域名:**
```
类型: CNAME
名称: www
值: 你的项目名.netlify.app
```

在你的域名DNS管理中添加这些记录。

### 步骤3: 启用HTTPS

1. 在Netlify的Domain settings中
2. 找到 "HTTPS" 部分
3. 点击 "Verify DNS configuration"
4. 点击 "Provision certificate"
5. 等待几分钟,HTTPS自动配置完成

---

## 🎯 常见域名注册商DNS配置指南

### 阿里云(万网)

1. 登录 https://dc.aliyun.com
2. 找到你的域名,点击"解析"
3. 点击"添加记录"
4. 添加以下记录:

   **A记录(主域名):**
   - 记录类型: A
   - 主机记录: @
   - 记录值: 76.76.21.21 (Vercel的IP)
   - TTL: 10分钟

   **CNAME记录(www):**
   - 记录类型: CNAME
   - 主机记录: www
   - 记录值: cname.vercel-dns.com
   - TTL: 10分钟

### 腾讯云

1. 登录 https://console.cloud.tencent.com/domain
2. 点击域名旁的"解析"
3. 添加记录(同阿里云)

### GoDaddy

1. 登录 https://www.godaddy.com
2. My Products → Domains
3. 点击域名旁的"DNS"
4. 添加记录:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### Cloudflare

1. 登录 https://dash.cloudflare.com
2. 选择你的域名
3. 点击"DNS"
4. 添加记录(同上)
5. **重要**: 确保云朵图标是灰色(DNS only),不是橙色

### Namecheap

1. 登录 https://www.namecheap.com
2. Domain List → Manage
3. Advanced DNS
4. 添加记录(同上)

---

## 🔍 检查DNS是否生效

### 方法1: 在线工具
访问 https://dnschecker.org
- 输入你的域名
- 选择A记录或CNAME记录
- 查看全球各地的DNS解析结果

### 方法2: 命令行

**Mac/Linux:**
```bash
# 检查A记录
dig fdsopc.com

# 检查CNAME记录
dig www.fdsopc.com
```

**Windows:**
```cmd
# 检查A记录
nslookup fdsopc.com

# 检查CNAME记录
nslookup www.fdsopc.com
```

---

## ⚙️ 高级配置

### 1. 同时支持主域名和www

在Vercel中添加两个域名:
- `fdsopc.com`
- `www.fdsopc.com`

然后设置其中一个为主域名,另一个自动重定向。

### 2. 子域名配置

如果想要 `admin.fdsopc.com` 访问后台:

1. 在Vercel添加域名: `admin.fdsopc.com`
2. 在DNS中添加CNAME记录:
   ```
   类型: CNAME
   名称: admin
   值: cname.vercel-dns.com
   ```
3. 在项目中配置路由重定向

### 3. 邮箱配置

域名绑定后,你可以配置企业邮箱:
- 腾讯企业邮箱(免费)
- 阿里企业邮箱
- Google Workspace

---

## ❗ 常见问题

### Q: DNS修改后多久生效?
A: 通常5-30分钟,最长可能需要24-48小时。

### Q: 显示"DNS配置错误"
A: 
1. 检查DNS记录是否正确
2. 等待DNS生效(可能需要几小时)
3. 清除浏览器缓存
4. 使用无痕模式访问

### Q: HTTPS证书配置失败
A: 
1. 确保DNS已经生效
2. 在Vercel中点击"Refresh"重新验证
3. 等待几分钟让Vercel重新申请证书

### Q: 网站可以访问但显示不安全
A: 
1. 等待HTTPS证书配置完成(几分钟)
2. 强制刷新浏览器(Ctrl+F5)
3. 清除浏览器缓存

### Q: 主域名可以访问,www不行(或相反)
A: 
1. 检查是否添加了两条DNS记录
2. 在Vercel中同时添加两个域名
3. 等待DNS生效

---

## ✅ 配置完成检查清单

- [ ] 在Vercel添加了域名
- [ ] 在域名DNS管理中添加了A记录
- [ ] 在域名DNS管理中添加了CNAME记录
- [ ] DNS已经生效(用dnschecker.org检查)
- [ ] Vercel显示域名验证成功(绿色✓)
- [ ] HTTPS证书已配置
- [ ] 可以通过域名访问网站
- [ ] HTTPS正常工作(地址栏显示🔒)

---

## 📞 需要帮助?

如果遇到问题:
1. 检查DNS记录是否正确
2. 等待足够的时间让DNS生效
3. 查看Vercel的错误提示
4. 联系域名注册商客服

---

## 🎉 配置成功!

配置完成后,你的网站就可以通过自己的域名访问了:

- **前台**: https://fdsopc.com
- **后台**: https://fdsopc.com/admin

而且Vercel会自动:
- ✅ 配置HTTPS加密
- ✅ 全球CDN加速
- ✅ 自动续期SSL证书
- ✅ 自动部署更新
