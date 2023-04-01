
import React from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer';
export default function Cart() {
  let data = useCart();

  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleRemove = (index) => {
    console.log(index)
    dispatch({ type: "REMOVE", index: index })
  }

  const handleCheckOut = async (e) => {
    e.preventDefault();

    let userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:7000/api/orderData", {
      // credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div className='text-white'>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th className='text-center' scope='col' >NO.</th>
              <th className='text-center' scope='col' >Name</th>
              <th className='text-center' scope='col' >Quantity</th>
              <th className='text-center' scope='col' >Option</th>
              <th className='text-center' scope='col' >Amount</th>
              <th className='text-center' scope='col' >Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th className='text-white' scope='row' >{index + 1}</th>
                <td className='text-center text-white'>{food.name}</td>
                <td className='text-center text-white'>{food.qty}</td>
                <td className='text-center text-white'>{food.size}</td>
                <td className='text-center text-white'> <i className="fa-solid fa-indian-rupee-sign"></i>  {food.price}/-</td>
                <td className='text-center' ><button type="button" className="btn text-danger p-0" onClick={handleRemove}><i className="fa-solid fa-trash"></i></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-5'>Total Price:  <i className="fa-solid fa-indian-rupee-sign"></i>   {totalPrice}/-</h1>
        <button className='btn bg-success mt-5 text-white ' onClick={handleCheckOut} > Check Out </button>
      </div>
    </div>



    </div >
  )
}
