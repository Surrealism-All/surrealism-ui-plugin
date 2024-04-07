import axios from "axios";
import { TreeItem, window } from "vscode";
import { Dict, RECOMMENDS } from "./dict";
import type { ReleaseData, ShowInfo } from "./dict";
import path from "path";
import fs from "fs";
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


async function downloadRelease(version: string, src: string) {
  const baseURL =
    "https://github.com/Surrealism-All/surrealism-ui-template/releases/download";
  try {
    const response = await axios({
      method: "get",
      url: `${baseURL}/${version}/${version}.zip`,
      responseType: "stream",
    });
    const savePath = path.join(src, `${version}.zip`);
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (e) {
    console.error(`Download failed: ${e}`);
    throw e;
  }
}


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

export { getReleases,ViewProvider,downloadRelease };
