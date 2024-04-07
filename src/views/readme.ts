
import * as vscode from "vscode";

class InfoView implements vscode.WebviewViewProvider {
  public static readonly viewType = "surrealism-ui-readme";

  constructor(private readonly _extensionUrl: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      // And restrict the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUrl, "media")],
    };
    //  const logoSrc = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUrl,'media','logo.png'));
    // this._getHtml(webviewView.webview).then((html) => {
    //   webviewView.webview.html = html;
    // });
    webviewView.webview.html = this._getHtml(webviewView.webview);
  }

  // private async _getHtml(webview: vscode.Webview): Promise<string> {
  //   const logoSrc = webview.asWebviewUri(
  //     vscode.Uri.joinPath(this._extensionUrl, "media", "logo.png")
  //   );
  //   let infoHtmlUrl = webview.asWebviewUri(
  //     vscode.Uri.joinPath(this._extensionUrl, "media/html",  "info.html")
  //   );
  //   let infoHtml = await vscode.workspace.fs.readFile(infoHtmlUrl);
  //   let infoHtmlStr = Buffer.from(infoHtml).toString("utf-8");
  //   infoHtmlStr = infoHtmlStr.replace("{{logoSrc}}", logoSrc.toString());
  //   return infoHtmlStr;
  // }
  private _getHtml(webview: vscode.Webview): string {
    const logoSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUrl, "media", "logo.png")
    );
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Info</title>
      </head>
      <style>
        .surrealism-info-wrapper {
          box-sizing: border-box;
          padding: 6px;
        }
        .surrealism_info {
          background: linear-gradient(120deg, #f55fe9 0%, #c961e8 60%, #b962ec 100%);
          color: transparent;
          font-weight: 700;
          background-clip: text;
          -webkit-background-clip: text;
        }
      </style>
      <body>
        <div class="surrealism-info-wrapper">
          <img
            src="https://img.shields.io/badge/SurrealismUI-0.4.1-orange?style=flat-square&logo=rust&logoColor=%23fff&labelColor=%23DEA584&color=%23DEA584"
          />
          <img
            src="https://img.shields.io/badge/License-MIT-orange?style=flat-square&logoColor=%23fff&labelColor=%2323B898&color=%2323B898"
          />
          <h2>
            <span class="surrealism_info">SurrealismUI</span>
          </h2>
          <div>
            <ul>
              <li>
                author: <span class="surrealism_info">syf20020816@outlook.com</span>
              </li>
              <li>createDate: <span class="surrealism_info">20230908</span></li>
              <li>discord: <a class="surrealism_info" href="https://discord.gg/KSQqrSMCnU">Discord</a></li>
              <li>book: <a class="surrealism_info" href="https://surrealism-all.github.io/SurrealismUI.github.io/">SurrealismUI Book</a></li>
              <li>
                email: <span class="surrealism_info">syf20020816@outlook.com</span>
              </li>
            </ul>
          </div>
    
          <img src="${logoSrc}" />
          <div>
            <strong
              >SurrealismUI is a third-party component library built entirely using
              Slint</strong
            >
          </div>
        </div>
      </body>
    </html>
    `;
  }
}

export { InfoView };
