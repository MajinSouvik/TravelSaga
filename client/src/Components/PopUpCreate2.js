import {useState, useRef} from "react"
import SlideContent from "./SlideContent"

function PopUpCreate2(){
    const [uploading, setUploading]=useState(false)
    const [files, setFiles]=useState([])
    
    const handleChange = (e) =>{
        setFiles(e.target.files)
    }

    const handleUpload=()=>{
        if(files.length===0) return;

        console.log("These are the files--->",files)
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