import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"


export function AppHeader(props) {

    // const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    // const headerAttrs = { className: 'app-header', id: 'Header' }
    // const { name, balance } = loggedInUser
    return (
        <h1>Here will be the App Header</h1>
        // <header {...headerAttrs}>
        //     <section className="container">
        //         <h1 className="logo">Robots</h1>
        //         <section>
        //             <p>Name: {name}</p>
        //             <p>Balance: {balance}</p>
        //         </section>
        //         <nav>
        //             <NavLink to="/" >Home</NavLink>
        //             <NavLink to="/about">About</NavLink>
        //         </nav>
        //     </section>
        // </header>
    )
}
