### 创建模型
**model/demo.py**
```python
from model.model import Model

# 测试表
class Demo(Model) :

  # 构造函数
  def __init__(self):
    super().__init__()
    self.Table('test')
```

### 使用
```python
from model.demo import Demo
# 对象
demo = Demo()
```
