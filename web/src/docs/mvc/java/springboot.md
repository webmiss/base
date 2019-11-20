## 一、插件( VSCode )
- Java Extension Pack
- Maven for Java
- Spring Boot Extension Pack

### 创建项目 ( ctrl+shift+p )
- Spring Initializr
- Maven项目
- 依赖包：devTools和web

### 创建文件( controller/IndexController.java )
```java
package com.webmis.mvc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController{
    @RequestMapping("/")
    String home(){
        return "首页";
    }
}
```

### F5调试 ( launch.json )
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Debug (Launch)-DemoApplication<mvc>",
            "request": "launch",
            "cwd": "${workspaceFolder}",
            "console": "internalConsole",
            "stopOnEntry": false,
            "mainClass": "com.webmis.mvc.DemoApplication",
            "args": "",
            "projectName": "mvc"
        },
        {
            "type": "java",
            "name": "Debug (Attach)",
            "request": "attach",
            "hostName": "localhost",
            "port": 0
        }
    ]
}
```

### 浏览器 ( localhost:8080 )

## 二、maven自动部署
### conf/tomcat-users.xml
```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<user username="admin" password="" roles="manager-script,manager-gui"/>
```
### conf/Catalina/localhost/manager.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context privileged="true" antiResourceLocking="false"
    docBase="${catalina.home}/webapps/manager">
    <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />
</Context>
```
### pom.xml
```xml
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>
    <version>2.2</version>
    <configuration>
        <url>http://localhost:8080/manager/text</url>
        <username>admin</username>
        <password></password>
        <update>true</update>
        <path>/admin</path>
    </configuration>
</plugin>
```
### 
```bash
# 安装工具
pacman -S maven
# 第一次部署
mvn tomcat7:deploy
# 更新
mvn tomcat7:redeploy
```

## 三、Servlet 部署
pom.xml
```xml
    <packaging>war</packaging>
    <name>demo</name>
    <build>
        <finalName>demo</finalName>
    </build>
```
DemoApplication.java
```java
package com.webmis.mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class DemoApplication extends SpringBootServletInitializer{
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DemoApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```