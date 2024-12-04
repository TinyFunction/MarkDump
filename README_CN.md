# MarkDump

![logo](./images/icon.png)

[English](./README.md) | [中文](./README_CN.md)

**MarkDump** 是一款方便实用的 VS Code 插件，用于自动检测 Markdown 文档中的图片链接，下载图片并存储在文档目录下的 `img` 文件夹中，同时按顺序编号重命名，并将文档中的图片链接替换为本地路径。

## 功能特色
- 自动检测 Markdown 文档中的图片链接（支持 HTTP/HTTPS 链接）。
- 下载图片到文档所在目录的 `img` 文件夹中。
- 图片文件按 `01.png`, `02.png`, `03.png` 的顺序编号命名。
- 自动替换 Markdown 文档中的图片链接为本地路径。

---

## 安装
1. 打开 VS Code。
2. 前往扩展市场，搜索 **MarkDump**，点击安装。
3. 安装完成后，即可在 Markdown 文件中使用该插件。

---

## 使用方法

### 前提条件
- 确保你的项目中已经打开了一个文件夹（即工作区）。
- 当前 Markdown 文件已保存到磁盘。

### 操作步骤
1. 打开一个 Markdown 文件。
2. 确保文件中包含图片链接，例如：
   ```markdown
   ![Example Image](https://example.com/image1.png)
   ![Another Image](https://example.com/image2.jpg)
   ```
3. 按下 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS），打开命令面板。
4. 输入并选择 `MarkDump: Download Images and Update Links`。
5. 插件将自动执行以下操作：
   - 下载图片到文件目录下的 `img` 文件夹中。
   - 按顺序重命名图片，例如：`img/01.png`, `img/02.jpg`。
   - 替换 Markdown 文档中的图片链接为本地路径，例如：
     ```markdown
     ![Example Image](img/01.png)
     ![Another Image](img/02.jpg)
     ```
6. 保存文件，完成操作。

---

## 示例效果
### 原始 Markdown 文档
```markdown
![Example Image](https://example.com/image1.png)
![Another Image](https://example.com/image2.jpg)
```

### 操作后
- 文件目录：
  ```
  my-folder/
  ├── my-markdown-file.md
  ├── img/
      ├── 01.png
      ├── 02.jpg
  ```
- 修改后的 Markdown 文档：
  ```markdown
  ![Example Image](img/01.png)
  ![Another Image](img/02.jpg)
  ```

---

## 注意事项
1. 插件仅支持 HTTP 和 HTTPS 协议的图片链接。
2. 图片下载时，请确保网络连接通畅。
3. 如果图片链接无效或下载失败，插件将跳过这些图片并在控制台打印错误信息。

---

## 开发者信息
如果你有任何问题或建议，欢迎在 [GitHub 项目主页](https://github.com/TinyFunction/MarkDump) 提交 Issue 或 Pull Request。

**MarkDump**，让 Markdown 图片处理更高效！🎉