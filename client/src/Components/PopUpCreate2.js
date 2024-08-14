import {useState} from "react"
import SlideContent from "./SlideContent"
import {v4} from "uuid"
import {storage} from "../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { setPopUp } from "../redux/popUpSlice"
axios.defaults.withCredentials = true;

function PopUpCreate2(){
    const dispatch=useDispatch()
    const [uploading, setUploading]=useState(false)
    const [files, setFiles]=useState([])
    const user=useSelector((store)=>store.user.user)
    
    const handleChange = (e) =>{
        setFiles(e.target.files)
    }

    const handleUpload=async()=>{
        if(files.length===0) return;
        setUploading(true);

        const selectedFiles = Array.from(files);

        const uploadPromises = selectedFiles.map(async (fileObj) => {
            const storageRef = ref(storage, `uploads/${fileObj.name+v4()}`);
            await uploadBytes(storageRef, fileObj);
            const fileUrl = await getDownloadURL(storageRef);

            return {
                name: fileObj.name,
                url: fileUrl,
                type: fileObj.type,
            };
        });

        const uploaded = await Promise.all(uploadPromises);
        
        uploadPost(uploaded);
        setUploading(false);
    }

    const uploadPost=async(filess)=>{
        // const finalFiles=filess.map(file=>{
        //     return file.url
        // })
        

        const values={  name: user.username,  
                        place:"Paris", 
                        description:"My second post!!", 
                        files:filess
                    }
        const resp = await axios.post("http://localhost:8000/posts/upload/",{
            ...values
         }     

        );

        dispatch(setPopUp(false))
    }

    return (
        <div>
            <input type="file" multiple onChange={(e)=>handleChange(e)} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
            {files.length!==0 && <SlideContent files={files} />}
        </div>
    )
}

export default PopUpCreate2;