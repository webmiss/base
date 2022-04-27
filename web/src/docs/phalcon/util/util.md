## 引入
```php
use Util\Util;
```

## 执行Linux命令
```php
Util::Exec(string $cmd);
```

## 格式化时间
```php
Util::Date(string $format='Y-m-d H:i:s', int $timestamp=0)
Util::DateFormat(
  string $format='Y-m-d H:i:s', //格式
  string $duration='0s'         //年(y)、月(m)、周(w)、日(d)、时(h)、分(i)、秒(s)
)
```

## 字符串长度
```php
Util::Len(string $val);
```

## 日期转时间戳
```php
Util::Strtotime(string $day);
```

## URL参数
```php
Util::UrlToArray(string $url);
```