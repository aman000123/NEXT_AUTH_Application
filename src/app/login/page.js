"use client"
//nest js server se hi html css js ko server se hi laata hai isliye client side ke liye use client ka use
import { useEffect, useState } from "react"
import axios from 'axios';
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({ email: "", password: "" })
    const [buttonDisabeled, setButtonDisabeled] = useState(false)
    const [loading, setLoading] = useState(false)

    const handelOnSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            // console.log("respons in submit login", response)
            toast.success("Login success")
            router.push('/profile')
        } catch (error) {
            console.log("login failed error", error)
            toast.error("Please fill the form")
        }
    }

    //state ko contantly monitr karne ke liye button ko enabel karana
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabeled(false)
        } else {
            setButtonDisabeled(true)
        }

    }, [user])//user state me koi change ho to dubara run ho

    return (
        <>
            <Container className="mt-5">
                <Card style={{ width: '35rem' }} className="mx-auto p-5">

                    <h3 className="text-center">{loading ? "Proceesing" : "Please Login"}</h3>
                    <Form>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" onClick={handelOnSubmit} className="mt-4">
                            {buttonDisabeled ? "Fill Credentials" : "Login"}
                        </Button>

                    </Form>
                    <Link href="/signup" className="mt-4" style={{ textDecoration: "none" }}> visit Signup</Link>
                </Card>
            </Container>
        </>
    )
}


export default Login