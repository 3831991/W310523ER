import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">בית</Link></li>
                <li><Link to="/students">סטודנטים</Link></li>
                <li><Link to="/average">ממוצע לפי סטודנט</Link></li>
                <li><Link to="/cites">ממוצע לפי עיר</Link></li>
            </ul>
        </nav>
    )
}
