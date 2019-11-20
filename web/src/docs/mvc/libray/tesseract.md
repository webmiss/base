## 安装
```bash
# Archlinux
yaourt -S tesseract
# 英文、中文
yaourt -S tesseract-data-eng tesseract-data-chi_sim
```

## 识别
```bash
# 默认英文
tesseract test.png file
# 多语言
tesseract -l chi_sim+eng test.png file
```

## 训练
```bash
# Java软件
jTessBoxEditor
```