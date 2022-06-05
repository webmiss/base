## 引入
```php
use Library\Curl;
```

## 发送请求
```php
Curl::Request(
  string $url,                //请求地址
  string $data='',            //请求数据
  string $method='GET',       //请求方式
  array $headers=[],          //Headers参数
  string $resType='json'      //返回类型
);
```

## URL参数
```php
// 生成
$param = Curl::UrlEncode(
  ['id'=>1, 'name'=>'测试']
);
self::Print($param);
// 解析
$data = Curl::UrlDecode($param);
self::Print($data);
```
- id=1&name=%E6%B5%8B%E8%AF%95
- {"id":"1","name":"测试"}