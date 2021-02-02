# Vue开发环境

## 一、ArchLinux
```bash
# 安装Git
pacman -S git

# 安装NodeJS
pacman -S nodejs

# 安装Yarn
pacman -S yarn
yarn -v

# 安装Vue3
yarn cache clean
yarn global add @vue/cli
# 查看
vue -V
```

<br/>

## 二、Windows
### 1) 安装Git
- 下载 [Git](https://git-scm.com/download/win)
- 安装: 64位版 > 重启系统
- VsCode: "ctrl+`" > "终端" > "powershell" > "选择默认 shell" > "Git Bash" > 重启
- 终端输入: "cmd" 和 "bash" 可相互切换

### 2) 安装NodeJS
- 下载 [Node.js](https://nodejs.org/en/download/)
- 安装: "node-v14.15.1-x64.msi" 到 "D:\server\nodejs"
- 查看: "node –v"

### 3) 安装Yarn
```bash
npm install -g yarn
# 查看
yarn -v
```

### 4) 安装Vue3
```bash
npm install -g cnpm
cnpm install -g @vue/cli
# 查看
vue -V
```
<br/>

## 三、MacOS
```bash
# 安装Git
git
```

### 1) 安装NodeJS
- 下载 [Node.js](https://nodejs.org/en/download/)
- 查看: "node –v"

### 2) 终端
```bash
# 安装Yarn
sudo npm install -g yarn
# 查看
yarn -v

# 安装Vue3
sudo npm install -g cnpm
sudo cnpm install -g @vue/cli
# 查看
vue -V
```

## 四、Vue3项目
```bash
vue create demo
```
- ◉ Choose Vue version
- ◉ Babel
- ◯ TypeScript
- ◯ Progressive Web App (PWA) Support
- ◉ Router
- ◉ Vuex
- ◯ CSS Pre-processors
- ◉ Linter / Formatter
- ◯ Unit Testing
- ◯ E2E Testing

Use history mode for router? **Yes**<br/>
Pick a linter / formatter config: **Basic**<br/>
Pick additional lint features: **Lint on save**<br/>
Where do you prefer placing config for Babel, ESLint, etc.? **In package.json**<br/>
Save this as a preset for future projects? **Yes**<br/>

<br/><br/><br/>