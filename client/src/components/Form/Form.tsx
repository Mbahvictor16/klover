import { Form as RouterForm, useNavigate } from "react-router-dom"
import Input from "../Input/Input";

import "./form.css"
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

type Props = {
    type: "login" | "register";
}

function Form({type}: Props) {
    const [userLoginDetails, SetUserLoginDetails] = useState({
        email: "",
        password: "",
    }) 

    const [userRegisterDetails, SetUserRegisterDetails] = useState({
        fullname: "",
        email: "",
        password: "",
    })
    
    const [__, setCookie] = useCookies()

    const navigate = useNavigate()

    async function submitForm(event: any) {
        event.preventDefault()

        if(type === "login") {
            const res = await axios.post("http://localhost:8000/login", userLoginDetails)
    
            const result: {status: "ok" | "failed"; id?: string} = await res.data

            console.log(result);
            
           if (result.status === "ok") {
                setCookie("user", result.id, {path: "/", expires: new Date(Date.now() + (30 * 24 * 3600))})
                navigate("/")
            }
        } else {
            const res = await axios.post("http://localhost:8000/register", userRegisterDetails)

            const result: {status: "ok" | "failed", id?: string} = await res.data
            console.log(result);
            
            if (result.status === "ok") {
                navigate("/auth/login")
            }
        }
    }

    function UpdateInput(event: any) {
        if (type === "login") {
            
            SetUserLoginDetails(prevDetails => {
                return {
                    ...prevDetails,
                    [event.target.name]: event.target.value
                }
            })
        } else {
            
            SetUserRegisterDetails(prevDetails => {
                return {
                    ...prevDetails,
                    [event.target.name]: event.target.value
                }
            })
        }
    }
  return (
    <RouterForm method="POST" action="" onSubmit={(event) => submitForm(event)}>
        {
            type === "login" ? <h1>Login</h1> : <h1>Register</h1>
        }

        {
            type === "register" && (
                <div>
                    <Input type="text" name="fullname" placeholder="Full Name" className="btn" value={userRegisterDetails.fullname} onChange={(event: any) => UpdateInput(event)} />
                </div>
            )
        }

        <div>
            <Input type="email" name="email" placeholder="Email address"  className="btn" value={type === "login" ? userLoginDetails.email : userRegisterDetails.email} onChange={(event: any) => UpdateInput(event)}/>
        </div>

        <div>
            <Input type="password" name="password" placeholder="Password"  className="btn" value={type === "login" ? userLoginDetails.password : userRegisterDetails.password} onChange={(event: any) => UpdateInput(event)} />
        </div>

        <div>
            <button type="submit" className="btn">
                {type === "login" ? "Login" : "Register"}
            </button>
        </div>

    </RouterForm>
  )
}

export default Form