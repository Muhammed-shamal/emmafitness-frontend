'use client'

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

function ScrollButton({ Ref }) {

    const scroller = (right) => {
        const scrollAmount = 600; // Adjust the scrolling distance as needed

        // Calculate the new scroll position
        const newPosition = right ? Ref.current.scrollLeft - scrollAmount : Ref.current.scrollLeft + scrollAmount;


        Ref.current.scrollTo({
            left: newPosition,
            behavior: "smooth",
        })

    }
    return (
        <div className="hidden md:block">
            <Button onClick={() => scroller(true)} className="rounded-none border-red-600 z-10 absolute left-2 top-[38%]  text-red-500 " icon={<ArrowLeftOutlined />} />
            <Button onClick={() => scroller(false)} className="rounded-none border-red-600 z-10 absolute right-2 top-[38%]  text-red-600 " icon={<ArrowRightOutlined />} />
        </div>
    )
}

export default ScrollButton