import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/students">Students</Link></li>
                <li><Link to="/average">Average by student</Link></li>
                <li><Link to="/cites">Average by City</Link></li>
            </ul>
        </nav>
    )
}
