'use client'
import Link from "next/link";
const header = () => {
  return (
        <div className="header-wrapper">
            <div className="logo">
            <img style={{ width: 100 }} src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/39-Food-Delivery-Logos-That-Will-Leave-You-Hungry-For-More/food-express-by-gigih-rudya-designcrowd.png" />
            </div>  
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                </ul>
                </div>
            )
}

export default header;