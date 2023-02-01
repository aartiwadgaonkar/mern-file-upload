import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MultiDocs() {

    const [dob, setDob] = useState()
    const [adhar, setAdhar] = useState()
    const [tc, setTc] = useState()
    const [docs, setDocs] = useState([])
    const userInstance = axios.create({
        baseURL: "http://localhost:5000"
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData
        fd.append("dob", dob)
        fd.append("adhar", adhar)
        fd.append("tc", tc)
        const { data } = await userInstance.post("doc/add", fd)
        console.log(data);
    }
    const getAllDocs = async () => {
        const { data: { result } } = await userInstance.get("doc")
        setDocs(result)
    }
    useEffect(() => {
        getAllDocs()
        // console.log(getAllDocs());
    }, [])
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-2">
                    <form onSubmit={handleSubmit} >
                        <div class="card">
                            <div class="card-body">

                                <div className='my-3'>
                                    <label for="name" class="form-label"> DOB</label>
                                    <input type="file"
                                        onChange={e => setDob(e.target.files[0])}
                                        class="form-control" id="name" placeholder="Enter Your Name" />
                                </div>
                                <div className='my-3'>
                                    <label for="name" class="form-label"> Adhar</label>
                                    <input type="file"
                                        onChange={e => setAdhar(e.target.files[0])}
                                        class="form-control" id="name" placeholder="Enter Your adhar" />
                                </div>
                                <div className='my-3'>
                                    <label for="name" class="form-label"> Tc</label>
                                    <input type="file"
                                        onChange={e => setTc(e.target.files[0])}
                                        class="form-control" id="name" placeholder="Enter Your tc" />
                                </div>
                                <button type="submit" class="btn btn-primary">Add Docs</button>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    docs.map(item => <div>
                        <h1>DOB</h1>
                        <img src={`http://localhost:5000/${item.userDob}`} alt="" height={100} width={100} />
                        <h1>Adhar</h1>
                        <img src={`http://localhost:5000/${item.userAdhar}`} alt="" height={100} width={100} />
                        <h1>Tc</h1>
                        <img src={`http://localhost:5000/${item.userTc}`} alt="" height={100} width={100} />
                    </div>)
                }
            </div>
        </div>
    </>
}
// import axios from 'axios'
// import React, { useState } from 'react'

// export default function MultiDocs() {
//     const [docs, setDocs] = useState({
//         userDob: "",
//         userAdhar: "",
//         userTc: ""
//     })
//     const userInstance = axios.create({
//         baseURL: "http://localhost:5000"
//     })
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const fd = new FormData
//         fd.append("dob", docs.userDob)
//         fd.append("adhar", docs.userAdhar)
//         fd.append("tc", docs.userTc)
//         const { data } = await userInstance.post("doc/add", fd)
//         console.log(data);
//     }
//     return <>
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-6 offset-sm-2">
//                     <form onSubmit={handleSubmit} >
//                         <div class="card">
//                             <div class="card-body">

//                                 <div className='my-3'>
//                                     <label for="name" class="form-label"> DOB</label>
//                                     <input type="file"
//                                         onChange={e => setDocs({ ...docs, userDob: e.target.files[0] })}
//                                         class="form-control" id="name" placeholder="Enter Your Name" />
//                                 </div>
//                                 <div className='my-3'>
//                                     <label for="name" class="form-label"> Adhar</label>
//                                     <input type="file"
//                                         onChange={e => setDocs({ ...docs, userAdhar: e.target.files[0] })}
//                                         class="form-control" id="name" placeholder="Enter Your adhar" />
//                                 </div>
//                                 <div className='my-3'>
//                                     <label for="name" class="form-label"> Tc</label>
//                                     <input type="file"
//                                         onChange={e => setDocs({ ...docs, userTc: e.target.files[0] })}
//                                         class="form-control" id="name" placeholder="Enter Your tc" />
//                                 </div>
//                                 <button type="submit" class="btn btn-primary">Add Docs</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </>
// }
