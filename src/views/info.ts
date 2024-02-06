import * as vscode from "vscode";
import { getReleases } from "../core";
import { Dict, ShowInfo } from "../dict";

class ReleasesView implements vscode.WebviewViewProvider {
  public static readonly viewType = "surrealism-ui-readme";

  constructor(private readonly _extensionUrl: vscode.Uri) {}

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
            margin: 4px 6px;
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
          }
        </style>
      </head>
      <body>
        <div class="surrealism-releases-wrapper">
          <div>
            <span class="surrealism-releases-title"
              >The Latest Release Version:</span
            >
            <div class="surrealism-releases-details-wrapper">
              <span class="releases-tag">${latestTag}</span>
            </div>
          </div>
          <div>
            <span class="surrealism-releases-title">Recommend releases:</span>
            <div class="surrealism-releases-details-wrapper">${recommendTags}</div>
          </div>
          <div>
            <span class="surrealism-releases-title">All releases:</span>
            <div class="surrealism-releases-details-wrapper">${releasesTags}</div>
          </div>
        </div>
      </body>
    </html>
    `;
  }
}

export { ReleasesView };