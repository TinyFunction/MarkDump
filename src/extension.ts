import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';
import * as crypto from 'crypto';

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

		const configuration = vscode.workspace.getConfiguration('markdump');
		let defaultDir = configuration.get<string>('download.defaultDir');
		if (!defaultDir) {
			defaultDir = 'img';
		}
		const fileDir = path.dirname(uri.fsPath);

		let imgDir = defaultDir;

		if (!configuration.get<boolean>("download.silent")) {
			const imgDir = await vscode.window.showInputBox({
				placeHolder: `Input the custom directory path or press 'Enter' to use default`,
			}).then((input) => {
				return input ? input : defaultDir;
			});
		}

		const renameRule = configuration.get<string>('image.rename');

		const finalImgDir = path.isAbsolute(imgDir) ? imgDir : path.join(fileDir, imgDir);
		await fs.ensureDir(finalImgDir); // Ensure the directory exists

		let text = document.getText();
		const regex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g;
		const matches = [...text.matchAll(regex)];
		let counter = 1;

		for (const match of matches) {
			const imageUrl = match[1];
			const ext = path.extname(imageUrl) || '.png'; // Default to .png if no extension
			const newFileName = `${generateFilename(renameRule, counter, imageUrl)}${ext}`;
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

function generateFilename(renameRule: string | undefined, num: number, imageUrl: string): string {
	if (renameRule === "hash") {
		return hashFilename(imageUrl);
	}
	return padZero(num, 2);
}

function hashFilename(imageUrl: string): string {
	return crypto.createHash('md5').update(imageUrl).digest('hex');
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
