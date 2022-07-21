import React from "react";
import { Tabs } from 'antd';
import SectionFetchInfo from "../components/ContentFetchInfo";
import ContentDataTool from "../components/ContentDataTool";

function InfoSettings() {
  const { TabPane } = Tabs;
  const onChange = (key: string) => {
    console.log(key);
  };

  return (<>
    <div className="infoSettings p-2">
      <ContentDataTool />
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="ファイル エスクポート" key="1">
        </TabPane>
        <TabPane tab="ファイル インポート(json)" key="2">
          <ContentDataTool />
        </TabPane>
      </Tabs>
    </div>
  </>)
}

export default InfoSettings