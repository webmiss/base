## 引入
```python
from service.admin_token import AdminToken
```

## 验证
```python
AdminToken.verify(token: str, urlPerm: str)
```

## 权限数组
```python
AdminToken.Perm(token: str)
```

## 生成
```python
AdminToken.Create(data: dict)
```

## 获取
```python
AdminToken.Token(token: str)
```
