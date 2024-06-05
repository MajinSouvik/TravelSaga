import { useState, useEffect } from "react"
import axios from "axios"

function Register(){
    const [values, setValues] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("http://localhost:8000/register",{
               ...values
            });
            console.log("Registered data",data)
        } catch (err) {
          console.log(err);
        }
      };


    return(
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
                }
            />
        </div>

        <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
                }
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default Register