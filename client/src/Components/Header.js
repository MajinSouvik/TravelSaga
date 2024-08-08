import {Link} from "react-router-dom"

function Header(){
    return (
    <div>
        <Link to='/login'>
            <button>Login</button>
        </Link>
        Header
    </div>)
}

export default Header