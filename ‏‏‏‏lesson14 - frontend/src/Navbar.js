import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">בית</Link></li>
                <li><Link to="/users">משתמשים</Link></li>
            </ul>
        </nav>
    )
}
