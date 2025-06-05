'use client'
import MarkDownText from '../global/MarkDownText';
import { Tabs } from "antd"

function DescriptionSection({ fullDescription }) {






  const tabItem = [
    {
      key: 1, label: "Description", children: <MarkDownText text={fullDescription}/>,
      //  {key: 2, label: "Sepecification", children: <ReactMarkdown components={components} className="prose lg:prose-xl">{fullDescription}</ReactMarkdown> ,
    }]
  return (
    <div className="bg-white rounded p-2 shadow">
      <Tabs
        defaultActiveKey="0"
        type="card"
        size="small"
        items={tabItem}
      />

    </div>
  )
}

export default DescriptionSection