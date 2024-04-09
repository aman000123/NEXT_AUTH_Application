"use client"
//nest js server se hi html css js ko server se hi laata hai isliye client side ke liye use client ka use
import { useEffect, useState } from "react"
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import Link from 'next/link'

const Verifyemail = () => {

    const router = useRouter()
    const [token, setToken] = useState("")
    const [error, setError] = useState(false)
    const [verified, setVerified] = useState(false)


    const handelOnSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/users/verifyemail", { token })
            console.log("respons in verify email", response)
            setVerified(true)
            router.push('/login')
        } catch (error) {
            console.log("verification failed error", error)
            setError(true)
        }
    }

    useEffect(() => {
        setError(false)
        //window.location==//se url milegi
        const urlToken = window.location.search.split("=")[1]
        console.log("url token", urlToken)
        setToken(urlToken || "")

        //anotehr way get token using next js

        // const { query } = router()//got query parameter from routers
        // console.log("query", query)
        // const urlTokens = query.token;



    }, [])//token ke liye jaise start me load ho to 

    //ab token me change hua to
    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            handelOnSubmit()
        }
    }, [token])
    return (
        <>

            <Container className="mt-5">
                <h1>Verify Email</h1>
                <h3>{token ? `${token}` : "no token available"}</h3>

                <h2>{verified && (
                    <>
                        <Link href="/login">Login</Link>
                    </>
                )}</h2>
                <h2>{error && (
                    <>
                        <p>Error</p>
                    </>
                )}</h2>

            </Container>
        </>
    )
}


export default Verifyemail