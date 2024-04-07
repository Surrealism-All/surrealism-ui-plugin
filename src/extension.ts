// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Dict, type ShowInfo } from "./dict";
import { ViewProvider, getReleases, downloadRelease } from "./core";
import { InfoView, ReleasesView } from "./views";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "surrealism-ui" is now active!');

  const ttViewProvider = new ReleasesView(context.extensionUri, context);
  const infoViewProvider = new InfoView(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "surrealism-ui-releases",
      ttViewProvider
    )
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "surrealism-ui-readme",
      infoViewProvider
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
