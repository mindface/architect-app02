import React, { useEffect, useState, useRef } from 'react'
import { Card, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { RootStore } from '../store/modules/reducer'

function ElementGraph() {
  const item = useSelector((state: RootStore) => state.proportion.item)
  const dispatch: AppDispatch = useDispatch()
  const graphBoxRef = useRef(null)
  const [graphBoxConfig, graphBoxConfigSet] = useState({
    width: 0,
    height: 0,
  })
  const [doing, doingSet] = useState(0)
  const [level, levelSet] = useState(0)
  const [planing, planingSet] = useState(0)
  const [play, playSet] = useState(0)

  // アルゴリズム
  useEffect(() => {
    doingSet(item.level)
    levelSet(item.doing)
    planingSet(item.planing)
    playSet(item.play)
  }, [item.doing, item.level, item.doing, item.planing, item.play])

  useEffect(() => {
    if (graphBoxRef.current) {
      const element: HTMLDivElement = graphBoxRef.current
      const width = element?.clientWidth
      const height = element?.clientHeight
      graphBoxConfigSet({ width: width, height: height })
    }
  }, [])

  return (
    <div className="pl-1 pr-1">
      <div ref={graphBoxRef} className="graph-box" style={{ height: 500 }}>
        <svg
          version="1.1"
          baseProfile="full"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={graphBoxConfig.width}
          height="320"
        >
          <defs>
            <clipPath id="zinoui-1">
              <rect x="53" y="32" width="477" height="256" fill="none"></rect>
            </clipPath>
          </defs>
          <desc>Created with Zino UI 1.5</desc>
          <rect
            x="0"
            y="0"
            width={graphBoxConfig.width}
            height="320"
            fill="#FFFFFF"
            stroke="none"
            stroke-width="0"
          ></rect>
          <g className="zui-chart-grid">
            <line
              x1="53"
              y1="32"
              x2="53"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="132.5"
              y1="32"
              x2="132.5"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="212"
              y1="32"
              x2="212"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="291.5"
              y1="32"
              x2="291.5"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="371"
              y1="32"
              x2="371"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="450.5"
              y1="32"
              x2="450.5"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="530"
              y1="32"
              x2="530"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="53"
              y1="32"
              x2="530"
              y2="32"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="53"
              y1="288"
              x2="530"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="53"
              y1="202.67"
              x2="530"
              y2="202.67"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="53"
              y1="117.33"
              x2="530"
              y2="117.33"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
            <line
              x1="53"
              y1="32"
              x2="530"
              y2="32"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#ccc"
              stroke-dasharray="5,2"
              stroke-width="1"
            ></line>
          </g>
          <g className="zui-chart-axis-x">
            <line
              x1="53"
              y1="289"
              x2="53"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="132.5"
              y1="289"
              x2="132.5"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="212"
              y1="289"
              x2="212"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="291.5"
              y1="289"
              x2="291.5"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="371"
              y1="289"
              x2="371"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="450.5"
              y1="289"
              x2="450.5"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="530"
              y1="289"
              x2="530"
              y2="293"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
          </g>
          <g className="zui-chart-axis-y">
            <line
              x1="49"
              y1="288"
              x2="53"
              y2="288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="49"
              y1="202.67"
              x2="53"
              y2="202.67"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="49"
              y1="117.33"
              x2="53"
              y2="117.33"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
            <line
              x1="49"
              y1="32"
              x2="53"
              y2="32"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></line>
          </g>
          <g className="zui-chart-labels zui-chart-labels-y">
            <text
              x="43"
              y="288"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="end"
            >
              <tspan alignment-baseline="middle">3</tspan>
            </text>
            <text
              x="43"
              y="202.67"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="end"
            >
              <tspan alignment-baseline="middle">4</tspan>
            </text>
            <text
              x="43"
              y="117.33"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="end"
            >
              <tspan alignment-baseline="middle">5</tspan>
            </text>
            <text
              x="43"
              y="32"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="end"
            >
              <tspan alignment-baseline="middle">6</tspan>
            </text>
          </g>
          <g className="zui-chart-labels zui-chart-labels-x">
            <text
              x="92.75"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2008
            </text>
            <text
              x="172.25"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2009
            </text>
            <text
              x="251.75"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2010
            </text>
            <text
              x="331.25"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2011
            </text>
            <text
              x="410.75"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2012
            </text>
            <text
              x="490.25"
              y="308"
              fill="#444"
              font-family="Arial"
              font-size="12px"
              text-anchor="middle"
            >
              2013
            </text>
          </g>
          <g className="zui-chart-axis">
            <polyline
              points="53,32 53,288 530,288"
              fill="none"
              shape-rendering="crispEdges"
              stroke="#444"
              stroke-width="1"
            ></polyline>
          </g>
          <g className="zui-chart-canvas" clip-path="url(#zinoui-1)">
            <path
              d="M92.75,288.00L172.25,117.33L251.75,202.67L331.25,117.33L410.75,32.00L490.25,117.33"
              fill="none"
              fill-opacity="1"
              stroke="#DC3912"
              stroke-width="2"
              style={{ strokeDasharray: '3000,3000' }}
            ></path>
            <circle
              cx="92.75"
              cy="288.00"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
            <circle
              cx="172.25"
              cy="117.33"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
            <circle
              cx="251.75"
              cy="202.67"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
            <circle
              cx="331.25"
              cy="117.33"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
            <circle
              cx="410.75"
              cy="32.00"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
            <circle
              cx="490.25"
              cy="117.33"
              r="4"
              fill="#FFFFFF"
              stroke="#DC3912"
              stroke-width="2"
            ></circle>
          </g>
        </svg>

        <circle cx="50" cy="50" r="2" />
        <circle cx="150" cy="50" r="2" />
      </div>
    </div>
  )
}

export default ElementGraph
