"use client"
import { useState } from "react"
import axios from 'axios';
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";
import { Button, Container, Card } from 'react-bootstrap'
import Link from 'next/link'


const Profile = () => {
    const router = useRouter()
    const [data, setData] = useState("no data")

    const getUserDetails = async () => {

        const res = await axios.get('/api/users/profile')
        console.log("user profile", res?.data)
        setData(res.data.data)
    }
    const handleLogOut = async () => {
        try {
            await axios.get('api/users/logout')
            toast.success("Logout succesfully")
            router.push('/login')

        } catch (error) {
            console.log("erro in logout", error)
        }
    }
    return (
        <>
            <Container className="mt-5">
                <Card style={{ width: '35rem' }} className="mx-auto p-5">
                    <h1>Profile page </h1>
                    <h3>{data === "nothing" ? "No data availble for your profile" : <Link href={`profile/${data._id}`}>{data._id}</Link>}</h3>
                    <h3>{data?.username}</h3>
                    <p>{data?.email}</p>
                    <p>{data?.isVarified}</p>
                    <p>{data?.isAdmin}</p>
                    <Button className="m-5" onClick={handleLogOut} variant="danger">Logout</Button>
                    <Button className="mt-2" onClick={getUserDetails} variant="success">Get User details</Button>
                </Card>
            </Container>


        </>
    )
}


export default Profile