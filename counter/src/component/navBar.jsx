import React from "react"

const NavBar = ({ totalItems }) => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                    Active
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    Link
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    Link
                </a>
            </li>
            <li className="nav-item position-relative">
                <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">
                    Корзина{" "}
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </a>
            </li>
        </ul>
    )
}

export default NavBar
