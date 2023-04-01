import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
const Card = (props) => {

    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    let priceOptions = Object.keys(options);
    const [qty, setqty] = useState("1");
    const [size, setsize] = useState("");

    let Priceref = useRef();
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(Priceref.current.value)
    }, []);
    const handelerAddCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
            }
            else if (food.size !== size) {
                
                
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: qty, size: size })
                return
                // console.log(data)
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: qty, size: size })
    }
    return (
        <>
            <div className="card m-3" style={{ "width": "18rem" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>

                    {/* <Link to="#" className="btn btn-primary">Go somewhere</Link> */}
                    <div className="container w-100">
                        <select className="m-2 h-100 w-30 rounded" onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option value={i + 1} key={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 w-60 rounded" ref={Priceref} onChange={(e) => setsize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (<option key={data} value={data} >{data}</option>)
                            })}
                        </select>
                    </div>
                    <hr />
                    <div className="d-inline-block  h-100 fs-6">
                        <b>   Total Price :       <i className="fa-solid fa-indian-rupee-sign"></i>     {finalPrice}/-

                        </b>
                        <button className="btn btn-sm text-right bg-primary text-white mybtn" onClick={handelerAddCart}><i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                  

                </div>
            </div>
        </>
    )
}

export default Card;