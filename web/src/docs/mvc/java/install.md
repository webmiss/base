## 一、安装JAVA环境( jdk )
```bash
pacman -S jdk
```
### 环境变量
```bash
vi /etc/profile
```
- export JAVA_HOME=/usr/lib/jvm/java-11-jdk
- export JRE_HOME=$JAVA_HOME/jre
- export WORKS=/home/kingsoul/works
- export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib:$WORKS/tomcat9/lib/servlet-api.jar:$WORKS/www/java
- export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

### 刷新
```bash
source /etc/profile
```
### 创建链接
```bash
ln -sf /usr/lib/jvm/java-10-jdk /usr/lib/jvm/default
ln -sf /usr/lib/jvm/java-10-jdk/jre /usr/lib/jvm/default-runtime
```
### 查看版本
```bash
javac --version
java --version
```
## 二、下载Tomcat
```bash
# 进入目录
cd tomcat9/bin
# 启动
./startup.sh
# 停止
./shutdown.sh
```
## 三、Servlet服务
```bash
# Java项目
cd $HOME/works/www/java
```
### HelloWorld.java
```java
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloWorld extends HttpServlet {
    private String message;
    // 初始化
    public void init() throws ServletException{
        message = "Hello World";
    }
    // GET请求
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>" + message + "</h1>");
    }
    // 析构函数
    public void destroy(){
    }
}
```
### 编译
```bash
javac HelloWorld.java
```
- 将Servlet包加入CLASSPATH
- 将项目目录加入CLASSPATH

## 四、Servlet 部署
```bash
# Tomcat网站根目录
cd webapps/ROOT
# Java项目类
mkdir WEB-INF/classes
```
### WEB-INF/web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app>

    <servlet>
        <servlet-name>HelloWorld</servlet-name>
        <servlet-class>HelloWorld</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloWorld</servlet-name>
        <url-pattern>/HelloWorld</url-pattern>
    </servlet-mapping>

</web-app>
```

