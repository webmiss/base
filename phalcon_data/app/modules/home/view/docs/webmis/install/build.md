## 打包
```bash
# 进入目录
cd admin_data
# 打包
yarn build
```

## Nginx-静态页面
```bash
server {
    listen       80;
    server_name  admin.webmis.vip;
    set $root_path /home/www/base/admin_data/dist;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

## Nginx-动态页面
```bash
server {
    listen       80;
    server_name  api.webmis.vip;
    set $root_path /home/webmis/works/www/base/phalcon/public;
    root $root_path;
    index index.php;

    charset utf-8;

    try_files $uri $uri/ @rewrite;
    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }
    location ~* ^/(webmis|upload|themes|favicon.png)/(.+)$ {
        root $root_path;
    }

    location ~ \.php$ {
        fastcgi_pass   unix:/var/opt/remi/php74/run/php-fpm/www.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```
