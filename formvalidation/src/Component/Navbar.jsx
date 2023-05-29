import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();

    let logout = ()=>{
        localStorage.removeItem("userdetails");
        alert("logout successfull");
        navigate("/login");
    }


    return ( 
        <nav>
            <div className="logo">
                <Link to="/home">Alemari</Link> 
                <i class='bx bxs-bus'></i>
            </div>

            <div className="tickets">
                <Link to="/bus">Bus</Link>
                <Link to="/flight">Fligth</Link>
                <Link to="/active">Active</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <div className="profile">
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}
export default Navbar;






