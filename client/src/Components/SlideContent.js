import {useState, useEffect} from "react"

function SlideContent({files}){
    const [images, setImages]=useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };


    const helper=()=>{
        const filesArray=Array.from(files)
        const imagesArray=[]

        filesArray.forEach((file)=>{
            const reader=new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                imagesArray.push(reader.result);
        
                if (imagesArray.length === filesArray.length) {
                setImages(imagesArray);
                }
            };
        })
    }

    useEffect(() => {
        helper()
    },[files])

    return (
        <div>
      {images.length > 0 && (
        <div>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            {"<"}
          </button>
          <img
            src={images[currentIndex]}
            alt="Uploaded"
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
        
    )
}

export default SlideContent