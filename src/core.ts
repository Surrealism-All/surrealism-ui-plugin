import axios from "axios";
import { TreeItem, window } from "vscode";
import { Dict, RECOMMENDS } from "./dict";
import type { ReleaseData, ShowInfo } from "./dict";
// import {InfoView} from './views';

/**
 * get releases from github
 */
const getReleases = async () :Promise<ShowInfo|undefined> => {
  // get from github
  try {
    const response = await axios.get(Dict.GITHUB_UI_URL);
    console.log(response);
    let { status, data }: { status: number; data: ReleaseData[] } = response;
    if (status === 200) {
      //return data
      return getInfos(data);
    }
  } catch (error) {
    window.showErrorMessage(`${Dict.GET_RELEASES_ERROR} : ${error}!!!`);
  }
};

const getInfos = (datas: ReleaseData[]): ShowInfo => {
  // get Tag list
  const tagList = (): string[] => {
    return datas.map((data) => data.tag_name);
  };
  // get latest release
  const latest = (): ReleaseData => {
    return datas[0];
  };
  const recommends = () => {
    return RECOMMENDS;
  };
  const latestRelease = latest();
  return {
    latest: latestRelease,
    recommends: recommends(),
    tagList: tagList(),
    choose: latestRelease.tag_name,
  };
};


// if (selected === '下载') {
//     vscode.env.openExternal(vscode.Uri.parse(downloadUrl)); // 打开浏览器下载
// }


class ViewProvider{
    getTreeItem(element:any){
        return element;
    }
    getChildren(){
        // return [new TreeItem("Get SurrealismUI Infos")];
        // return [new InfoView("SurrealismUI Info")];
        return [new TreeItem('Click')];
    }
}

export { getReleases,ViewProvider };
