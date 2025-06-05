import Link from "next/link"

function BottomSection() {
  return (
    <div className="bg-primary py-1 text-xs md:text-sm text-white">
        <div className="container flex flex-col md:flex-row text-center md:text-left justify-between">
            <div>© 2023 - 2028 Emma Fitness, All Rights Reserved.</div>
            <div><Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-conditions">Terms & Conditions</Link></div>
        </div>
    </div>
  )
}

export default BottomSection