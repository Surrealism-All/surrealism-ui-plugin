/**
 * 
 * [
  {
    "url": "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/releases/137883870",
    "assets_url": "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/releases/137883870/assets",
    "upload_url": "https://uploads.github.com/repos/Surrealism-All/surrealism-ui-template/releases/137883870/assets{?name,label}",
    "html_url": "https://github.com/Surrealism-All/surrealism-ui-template/releases/tag/v0.3.4",
    "id": 137883870,
    "node_id": "RE_kwDOKu61f84IN_De",
    "tag_name": "v0.3.4",
    "target_commitish": "main",
    "name": "SurrealismUI-template V0.3.4",
    "draft": false,
    "prerelease": false,
    "created_at": "2024-01-17T16:16:51Z",
    "published_at": "2024-01-21T13:04:08Z",
    "assets": [
      {
        "url": "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/releases/assets/146881316",
        "id": 146881316,
        "node_id": "RA_kwDOKu61f84IwTsk",
        "name": "v0.3.4.zip",
        "label": null,
        "uploader": {
          "login": "syf20020816",
          "id": 92167095,
          "node_id": "U_kgDOBX5btw",
          "avatar_url": "https://avatars.githubusercontent.com/u/92167095?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/syf20020816",
          "html_url": "https://github.com/syf20020816",
          "followers_url": "https://api.github.com/users/syf20020816/followers",
          "following_url": "https://api.github.com/users/syf20020816/following{/other_user}",
          "gists_url": "https://api.github.com/users/syf20020816/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/syf20020816/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/syf20020816/subscriptions",
          "organizations_url": "https://api.github.com/users/syf20020816/orgs",
          "repos_url": "https://api.github.com/users/syf20020816/repos",
          "events_url": "https://api.github.com/users/syf20020816/events{/privacy}",
          "received_events_url": "https://api.github.com/users/syf20020816/received_events",
          "type": "User",
          "site_admin": false
        },
        "content_type": "application/x-zip-compressed",
        "state": "uploaded",
        "size": 177225,
        "download_count": 4,
        "created_at": "2024-01-21T13:03:29Z",
        "updated_at": "2024-01-21T13:03:33Z",
        "browser_download_url": "https://github.com/Surrealism-All/surrealism-ui-template/releases/download/v0.3.4/v0.3.4.zip"
      }
    ],
    "tarball_url": "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/tarball/v0.3.4",
    "zipball_url": "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/zipball/v0.3.4",
    "body": "## V0.3.4\r\n\r\n- 中文\r\n  - 修复`SSelect`组件icon、文字使用主题色变化\r\n  - 增加`STab`组件提供选项卡功能，以便用户可以在不同的内容板块之间切换\r\n- English\r\n  - Fix changes in the theme color of the 'SSelect' component icon and text usage\r\n  - Add the 'STab' component to provide tab functionality, so that users can switch between different content sections"
  },
]
 * Github release data type
 */
type ReleaseData = {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false;
  };
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: [
    {
      url: string;
      id: number;
      node_id: string;
      name: string;
      label: null | string;
      uploader: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
      };
      content_type: string;
      state: string;
      size: number;
      download_count: number;
      created_at: string;
      updated_at: string;
      browser_download_url: string;
    }
  ];
  tarball_url: string;
  zipball_url: string;
  body: string;
};


/**
 * Dict for All
 */
enum Dict {
    // UI template
    GITHUB_TEMPLATE_URL = "https://api.github.com/repos/Surrealism-All/surrealism-ui-template/releases",
    // UI
    GITHUB_UI_URL = "https://api.github.com/repos/Surrealism-All/SurrealismUI/releases",
    GET_RELEASES_ERROR = "Can not get releases from Github (https://api.github.com/repos/Surrealism-All/surrealism-ui-template/releases)",
    UNDEFINED_RESPONSE = "get releases error, please check your network.",
}

/**
 * Recommend tags for SurrealismUI
 */
const RECOMMENDS:string[] = [
    "v0.4.0",
];


type ShowInfo = {
    latest :ReleaseData,
    recommends : string[],
    tagList:string[],
    choose:string,
};

export type {ReleaseData,ShowInfo};



export {
    Dict,RECOMMENDS
};