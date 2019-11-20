## PHP调用(index.php)
```php
<?php
header("Content-Type:text/html; charset=utf-8");
if(isset($_GET['a']) && isset($_GET['b']) && !empty($_GET['a']) && !empty($_GET['b'])) {
	$command = './test '.$_GET['a'].' '.$_GET['b'];
	$result = passthru($command);
	print_r($result);
}else{
	echo "输入不能为空！";
}

```

## C/C++(test.cpp)
```c++
#include <iostream>
// #include<stdio.h>

int main(int argc, char **argv) {
	int a = atol(argv[1]),b = atol(argv[2]);
	int sum = a + b;
	printf("%d+%d=%d\n",a,b,sum);
	return 0;
}
```