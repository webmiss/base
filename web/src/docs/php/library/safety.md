## 引入
```php
use Library\Safety;
```

## 正则-公共
```php
Safety::isRight(
  string $name='',  //uname,passwd,tel,email,idcard
  string $val=''    //内容
);
```

## 正则-验证
```php
Safety::test(
  string $reg='^1\d{10}$',  //正则
  mixed $val=''             //内容
);
```

## Base64-加密
```php
Safety::encode(
  array $param=[]  //数据
);
```

## Base64-解密
```php
Safety::decode(
  string $token='' //Token
);
```
