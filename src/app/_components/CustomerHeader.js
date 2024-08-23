'use client'
import Link from "next/link";
const CustomerHeader = () => {
    //const userStorage = localStorage.getItem( 'user') && JSON. parse(localStorage.getItem( 'user'));
//const cartStorage = localStorage.getItem('user') && JSON. parse( localStorage.getItem('cart'));

    return (
        <div className="header-wrapper">
            <div className="logo">
            <img style={{ width: 100 }} src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/39-Food-Delivery-Logos-That-Will-Leave-You-Hungry-For-More/food-express-by-gigih-rudya-designcrowd.png" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/">SignUp</Link>
                </li>
                <li>
                    <Link href="/">Cart(0)</Link>
                </li>
            </ul>
          </div>
    )
}
export default CustomerHeader;