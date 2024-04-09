"use client"

import { useRouter } from "next/navigation";
import { Container, Card } from 'react-bootstrap'


//dynamic routes [id]
const SingleProfile = ({ params }) => {
    console.log("params", params)
    const router = useRouter()



    return (
        <>

            <Container className="mt-5">
                <Card style={{ width: '35rem' }} className="mx-auto p-5">
                    <h1>Single Profile page </h1>
                    <h3>{params.id}</h3>
                </Card>
            </Container>


        </>
    )
}


export default SingleProfile