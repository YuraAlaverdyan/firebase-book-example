import { Button, LinearProgress, TextField } from "@mui/material"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useRef, useState } from "react"
import { storage } from "../firebase-config"
import { addDoc, collection } from "firebase/firestore"
import { db } from './../firebase-config';

const Add = () => {
    const [product, setProduct] = useState({price:'', model:''})
    const [progress, setProgress] = useState(0)
    const myPhotoRef = useRef()
    const productList = collection(db, 'products')

    const handleSubmit = e => {
        e.preventDefault()
        const file = myPhotoRef.current.files[0]
        if(!file) {
            return
        }

        const storageRef = ref(storage, `files/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (data) => {
            console.log('in process..')
            setProgress(Math.round((data.bytesTransferred/data.totalBytes) * 100))
        },
        (error) => {
            console.log("something wrong")
        },
        () => {
            console.log("uploaded successfully")

            getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
                await addDoc(productList, {...product, photo:downloadURL})
            })
            setProduct({model:'', price:''})
            myPhotoRef.current.value = null
            setProgress(0)
        }
        )
    }
    return <div>
        <h4>Add</h4>
        {
            progress > 0 &&
            <div>
                <LinearProgress variant="indeterminate" value={progress} />
                <p>{progress} %</p>    
            </div>
        }
        <form onSubmit={handleSubmit}>
            <div className="box">
                <TextField
                    label='model'
                    type='text'
                    required
                    value={product.model}
                    onChange={e => setProduct({...product, model:e.target.value})}
                />
            </div>
            <div className="box">
                <TextField
                    label='price'
                    type='number'
                    required
                    value={product.price}
                    onChange={e => setProduct({...product, price:+e.target.value})}
                />
            </div>
            <div className="box">
                <input type='file' ref={myPhotoRef}/>
            </div>
            <div className="box">
                <Button type="submit">Save</Button>
            </div>
        </form>
    </div>
}

export default Add