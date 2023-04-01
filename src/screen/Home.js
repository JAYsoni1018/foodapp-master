import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import cake from '../imgs/c1.png'
import burger from '../imgs/b1.png'
import pizza from '../imgs/pizza.jpg'
const Home = () => {

    const [search, setsearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const loadData = async () => {

        let response = await fetch("http://localhost:7000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0],response[1])
    }
    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                                {/* <button className="btn btn-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src={burger} className="d-block w-100" alt='..' style={{ filter: 'brightness(30%)' }} />
                        </div>
                        <div className="carousel-item">
                            <img src={cake} className="d-block w-100" alt='' style={{ filter: 'brightness(30%)' }} />
                        </div>
                        <div className="carousel-item">
                            <img src={pizza} className="d-block w-100" alt='' style={{ filter: 'brightness(30%)' }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCat !== [] ?
                        foodCat.map((data) => {
                            return (
                                <div className='row mb-2'>

                                    <div key={data._id} className="fs-5 m-3">{data.CategoryName}</div>
                                    <hr />
                                    {foodItem !== [] ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        })

                                        : <div>No item found</div>}
                                </div>
                            )
                        })
                        : ""

                }

            </div>
        </>
    )
}

export default Home;
