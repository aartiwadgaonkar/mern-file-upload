import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function MultiImage() {
    const [name, setName] = useState("kate")
    const [documents, setDocuments] = useState()
    const [users, setUsers] = useState([])
    const userInstance = axios.create({
        baseURL: "http://localhost:5000"
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submited");
        console.log(documents);
        const fd = new FormData()
        fd.append("name", name)
        for (let d of documents) {
            fd.append("doc", d)
        }
        // print formdata
        for (const x of fd.entries()) {
            console.log(x);
        }
        // for (let i = 0; i < documents.length; i++) {
        //     fd.append("doc", documents[i])
        // }
        const { data } = await userInstance.post("/user/add/gallery", fd)
        console.log(data);
    }

    const getAllUsers = async () => {
        const { data: { result } } = await userInstance.get("/user/fetch")
        setUsers(result)
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return <>
        <pre>

            {JSON.stringify(name)}
            {JSON.stringify(documents)}
        </pre>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <form onSubmit={handleSubmit}>


                            <div class="card-body">
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        class="form-control"
                                        id="name"
                                        placeholder="Enter Your name"
                                    />

                                </div>
                                <div className='my-5'>
                                    <input
                                        multiple
                                        onChange={e => setDocuments(e.target.files)}
                                        type="file"
                                        class="form-control"
                                        placeholder='please choose docs'
                                    />

                                </div>

                                <button type="submit" class="btn btn-primary">Add Docs</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {
            users.map(item => <div class="card">
                <div class="card-body">
                    <h1>{item.name}</h1>
                    {
                        item.docs.map(url => <img src={`http://localhost:5000/${url}`}
                            height={100}
                            className="img-fluid"

                        />)
                    }
                </div>
            </div>)
        }
    </>
}
