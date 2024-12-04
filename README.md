# MarkDump

![logo](./images/icon.png)

[English](./README.md) | [中文](./README_CN.md)

**MarkDump** is a handy VS Code extension that automatically detects image links in Markdown documents, downloads them, and stores them in an `img` folder within the document's directory. It also renames the images sequentially (e.g., `01.png`, `02.png`, `03.png`) and replaces the original links in the Markdown file with the local paths.

## Features
- Automatically detects image links in Markdown documents (supports HTTP/HTTPS links).
- Downloads images to an `img` folder in the document's directory.
- Renames the images sequentially (e.g., `01.png`, `02.jpg`).
- Replaces the Markdown document's image links with local paths.

---

## Installation
1. Open VS Code.
2. Go to the Extensions Marketplace, search for **MarkDump**, and click *Install*.
3. Once installed, you can start using the extension in your Markdown files.

---

## How to Use

### Prerequisites
- Ensure you have opened a folder as a workspace in VS Code.
- The Markdown file must be saved on disk.

### Steps
1. Open a Markdown file.
2. Make sure the file contains image links, for example:
   ```markdown
   ![Example Image](https://example.com/image1.png)
   ![Another Image](https://example.com/image2.jpg)
   ```
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS) to open the Command Palette.
4. Type and select `MarkDump: Download Images and Update Links`.
5. The extension will:
   - Download images to an `img` folder in the document's directory.
   - Rename the images sequentially, e.g., `img/01.png`, `img/02.jpg`.
   - Replace the image links in the Markdown document with the local paths, for example:
     ```markdown
     ![Example Image](img/01.png)
     ![Another Image](img/02.jpg)
     ```
6. Save the file to complete the process.

---

## Example Output
### Original Markdown
```markdown
![Example Image](https://example.com/image1.png)
![Another Image](https://example.com/image2.jpg)
```

### After Running the Extension
- File structure:
  ```
  my-folder/
  ├── my-markdown-file.md
  ├── img/
      ├── 01.png
      ├── 02.jpg
  ```
- Updated Markdown:
  ```markdown
  ![Example Image](img/01.png)
  ![Another Image](img/02.jpg)
  ```

---

## Notes
1. The extension only supports image links using HTTP or HTTPS protocols.
2. Ensure you have a stable internet connection when downloading images.
3. If an image link is invalid or fails to download, the extension will skip it and log an error in the console.

---

## Developer Information
If you have any questions or suggestions, feel free to submit an issue or pull request on the [GitHub project page](https://github.com/TinyFunction/MarkDump).

**MarkDump** — making Markdown image management easier and more efficient! 🎉
