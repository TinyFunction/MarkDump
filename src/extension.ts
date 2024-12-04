import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('markdump.downloadImages', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const document = editor.document;
		const uri = document.uri;
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
		if (!workspaceFolder) {
			vscode.window.showErrorMessage("Please open a folder in the workspace.");
			return;
		}

		const fileDir = path.dirname(uri.fsPath);
    	const imgDir = await vscode.window.showInputBox({
      	placeHolder: 'Enter the custom directory path or press Enter to use the default "img" folder',
      }).then((input) => {
      	return input ? input : 'img';
      });

    if (!imgDir) {
    	return;
    }

    const finalImgDir = path.isAbsolute(imgDir) ? imgDir : path.join(fileDir, imgDir);
    await fs.ensureDir(finalImgDir); // Ensure the directory exists

		let text = document.getText();
		const regex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g;
		const matches = [...text.matchAll(regex)];
		const downloadTasks: Promise<void>[] = [];
		let counter = 1;

		for (const match of matches) {
			const imageUrl = match[1];
			const ext = path.extname(imageUrl) || '.png'; // Default to .png if no extension
			const newFileName = `${padZero(counter, 2)}${ext}`;
			const filePath = path.join(finalImgDir, newFileName);
			counter++;

			try {
				await downloadImage(imageUrl, filePath);
				// Replace URL in Markdown text
				const relativePath = path.relative(path.dirname(uri.fsPath), filePath).replace(/\\/g, '/');
				text = text.replace(imageUrl, relativePath);
			} catch (err) {
				console.error(`Failed to download ${imageUrl}:`, err);
			}
		}

		await fs.writeFile(uri.fsPath, text, 'utf8');
		vscode.window.showInformationMessage("Images downloaded and Markdown updated successfully!");
	});

	context.subscriptions.push(disposable);
}

function padZero(num: number, size: number): string {
	let s = num + "";
	while (s.length < size) { s = "0" + s; }
	return s;
}

async function downloadImage(url: string, filePath: string): Promise<void> {
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});

	await new Promise((resolve, reject) => {
		const writer = fs.createWriteStream(filePath);
		response.data.pipe(writer);
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
}
