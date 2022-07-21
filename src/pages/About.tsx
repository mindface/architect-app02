import React from "react";
import { Card } from 'antd';
import ContentSlide from "../components/ContentSlide";

function About() {
  return (<>
    <div className="about pt-4">
      <Card style={{ maxWidth: 960, margin: 'auto' }}>
        <ContentSlide />
      </Card>
    </div>
  </>)
}

export default About