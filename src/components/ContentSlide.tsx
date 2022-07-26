import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Button, Carousel, Typography } from 'antd'

const contentStyle: React.CSSProperties = {
  padding: '16px',
  color: '#fff',
  textAlign: 'center',
  background: '#f6f8ff',
}
const { Title, Paragraph } = Typography

function ContentSlide() {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  return (
    <Carousel dots={true} afterChange={onChange}>
      <div>
        <div className="inner" style={contentStyle}>
          <Title level={4}>About service</Title>
          <Paragraph
            ellipsis={
              true ? { rows: 2, expandable: true, symbol: 'more' } : false
            }
          >
            練習プランを記録して、自分で言葉として意識した情報と結果を比較して、結果からの情報量と調整します。
            <br />
            足首の動きでも、身体構造の動きからどのようなプロセスを経ているか、で結果が異なります。また、僅かな初期動作の角度が違うだけでも結果が異なるケースもあります。それを自分で言語化することを目的にしています。
          </Paragraph>
          <img src="/images/slide_01.png" alt="" />
        </div>
      </div>
      <div>
        <div className="inner" style={contentStyle}>
          <h3>計画を立案する。</h3>
          <img src="/images/slide_02.png" alt="" />
        </div>
      </div>
      <div>
        <div className="inner" style={contentStyle}>
          <h3>計画と方法を記録する。</h3>
          <img src="/images/slide_03.png" alt="" />
        </div>
      </div>
      <div>
        <div className="inner" style={contentStyle}>
          <h3>検証と結果を記録する。</h3>
          <img src="/images/slide_04.png" alt="" />
        </div>
      </div>
      <div>
        <div className="inner" style={contentStyle}>
          <h3>計画した、イメージと計画のズレを実行する</h3>
          <img src="/images/slide_05.png" alt="" />
        </div>
      </div>
    </Carousel>
  )
}

export default ContentSlide
