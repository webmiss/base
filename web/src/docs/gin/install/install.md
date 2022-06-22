# Go开发环境

## ArchLinux
#### 1) 安装Git
```bash
pacman -S git
```

#### 2) 安装Go
```bash
pacman -S go
# 查看
go version
```

#### 3) 国内镜像
```bash
export GO111MODULE=on
export GOPROXY=https://goproxy.cn

go env -w GOPROXY=https://goproxy.cn
```

#### 4) 热启动
```bash
# golang.org/x 超时问题
mkdir -p $GOPATH/src/golang.org/x
cd $GOPATH/src/golang.org/x
git clone https://github.com/golang/net.git
git clone https://github.com/golang/sys.git
git clone https://github.com/golang/text.git
git clone https://github.com/golang/tools.git
# 工具
go get github.com/pilu/fresh
# 链接
ln -s $GOPATH/bin/fresh /usr/bin/
# 运行
fresh
```

## Windows
#### 1) 安装Git
- 下载: [Git](https://git-scm.com/download/win)
- 安装: 64位版 > 重启系统
- VsCode: "ctrl+`" > "终端" > "powershell" > "选择默认 shell" > "Git Bash" > 重启
- 终端输入: "cmd" 和 "bash" 可相互切换

#### 2) 安装Go
- 下载: [go.windows-amd64.msi](https://golang.google.cn/dl/)
- 解压: "go1.15.8.windows-amd64.msi" 到 "D:\server\go"
- 搜索: "环境变量" > "新建" > 变量名: "GOROOT" 变量值: "D:\server\go"
- 搜索: "环境变量" > "Path" > "添加" > "%GOROOT%\bin"
- CMD: "go version"

<br/>

## MacOS
#### 1) 安装Git
```bash
git
```

#### 2) 安装Go
- 下载: [go.darwin-amd64.pkg](https://golang.google.cn/dl/)

<br/><br/>