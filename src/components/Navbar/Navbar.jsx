import './Navbar.css'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <nav>
            <div className="logo">
                <h1>Kavach 23</h1>
            </div>
            <div className="links">
                <button onClick={logout}>
                    logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
