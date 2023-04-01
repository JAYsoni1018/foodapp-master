import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screen/Cart';
import { useCart } from './ContextReducer';
const Navbar = () => {
  let data = useCart();

  const navigate = useNavigate();
  const handelerLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  const [cartview, setcartview] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 text-white " to="/#">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active  text-white " aria-current="page" to="/#">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))
                ?
                <li className="nav-item">

                  <Link className="nav-link  text-white" aria-current="page" to="/myorder">My Order</Link>
                </li>
                : ""



              }
            </ul>
            {(!localStorage.getItem("authToken"))
              ?
              <div className="d-flex">

                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
              </div>
              :
              <div>

               <div className="btn bg-white text-success mx-1" onClick={()=>{setcartview(true)}}><i className="fa-solid fa-cart-shopping"></i> My Cart {"  "}
                  <Badge className='indicator_cart' pill bg="danger">{data.length}</Badge>
                </div>
                {cartview?<Modal onClose={()=>{setcartview(false)}}><Cart/></Modal>:null}

                <div className="btn bg-danger text-white mx-1" onClick={handelerLogout}><i className="fa-solid fa-right-from-bracket"></i> Log Out</div>
              </div>
            }

            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
