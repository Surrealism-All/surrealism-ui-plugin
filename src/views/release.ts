import * as vscode from "vscode";
import { downloadRelease, getReleases } from "../core";
import { Dict, ShowInfo } from "../dict";

class ReleasesView implements vscode.WebviewViewProvider {
  public static readonly viewType = "surrealism-ui-releases";

  constructor(
    private readonly _extensionUrl: vscode.Uri,
    private readonly _context: vscode.ExtensionContext
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUrl, "media")],
    };
    getReleases().then((res: ShowInfo | undefined) => {
      webviewView.webview.html =
        typeof res !== "undefined"
          ? this._getHtml(res)
          : Dict.UNDEFINED_RESPONSE;
    });
    webviewView.webview.onDidReceiveMessage(
      async (message) => {
        if (message.command === "downloadRelease") {
          const version = message.version;
          const src = message.src;
          // 假设downloadRelease已正确导入
          await downloadRelease(version, src);
          // 可能还需要给Webview发送消息以更新UI
        }
      },
      undefined,
      this._context.subscriptions
    );
  }

  private _getHtml(info: ShowInfo): string {
    const latestTag = info.choose;
    const recommendTags = info.recommends
      .map((item) => `<span class="releases-tag">${item}</span>`)
      .toString()
      .replaceAll(",", "\n");
    const releasesTags = info.tagList
      .map((item) => `<span class="releases-tag">${item}</span>`)
      .toString()
      .replaceAll(",", "\n");
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <style>
          li {
            list-style: none;
            height: 32px;
          }
          .surrealism-releases-wrapper {
            box-sizing: border-box;
            padding: 6px;
          }
          .surrealism-releases-title {
            font-weight: 700;
          }
          .surrealism-releases-details-wrapper {
            display: flex;
            align-items: flex-start;
            box-sizing: border-box;
            justify-content: space-between;
            padding: 6px;
            flex-wrap: wrap;
          }
          .releases-tag {
            margin: 0 6px;
            background: linear-gradient(
              120deg,
              #f55fe9 0%,
              #c961e8 60%,
              #b962ec 100%
            );
            box-sizing: border-box;
            padding: 2px 12px;
            border-radius: 16px;
            font-size: 12px;
            color: #fff;
            font-weight: 700;
            margin:8px 6px;
          }
          
          #downloadUrl{
            width: 100%;
            height: 1.5em;
            font-size: 14px;
            outline: none;
            border-width: 0 0 2px 0;
            border-color: #c961e8;
            color: #b962ec;
            font-weight: 700;
            background-color: transparent;
            margin: 6px 0;
          }
          #downloadBtn{
            border: none;
            background: linear-gradient(
              120deg,
              #f55fe9 0%,
              #c961e8 60%,
              #b962ec 100%
            );
            height: auto;
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            border-radius: 6px;
            padding: 0.25em 0.75em;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="surrealism-releases-wrapper">
          <div>
            <input type="text" name="" id="downloadUrl">
          </div>
          <div>
            <span class="surrealism-releases-title"
              >The Latest Release Version:</span
            >
            <div class="surrealism-releases-details-wrapper latest">
              <span class="releases-tag">${latestTag}</span>
            </div>
          </div>
          <div>
            <span class="surrealism-releases-title">All releases:</span>
            <div class="surrealism-releases-details-wrapper">${releasesTags}</div>
          </div>
        </div>
      </body>
      <script>
      const vscode = acquireVsCodeApi();
    
      document.querySelectorAll('.latest').forEach(div => {
        div.addEventListener('click', function() {
          const version = this.innerText.trim(); 
          // setDownloadUrl(version);
          vscode.postMessage({
            command: 'downloadRelease',
            version: version,
            src: document.getElementById('downloadUrl').value
          })
        });
      });
    </script>
    </html>
    `;
  }
}

export { ReleasesView };
