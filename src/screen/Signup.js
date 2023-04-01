import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""});
let navigate=useNavigate();

    const handlesubmit=async (e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:7000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
            
        });
        const json=await response.json();
        console.log(json);

        if(!json.success){
            alert("Something went wrong....");
        }
        if(json.success){
     navigate("/login");

        }
        
    }
    const change=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
        <div className="container mt-4">

            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={change}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email' value={credentials.email} onChange={change}/>
                    <div id="emailHelp" className="form-text text-danger">* We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  name='password' value={credentials.password} onChange={change} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name='geolocation' value={credentials.geolocation} onChange={change} />
                </div>
               
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to='/login' className='m-3 btn btn-success'>Already have account?</Link>
            </form>
        </div>

        </>
    )
}

export default Signup;