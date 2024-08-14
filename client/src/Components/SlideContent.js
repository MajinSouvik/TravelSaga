import { useState, useEffect } from "react";
import Slide from "./Slide"

function SlideContent({ files }) {
    const [media, setMedia] = useState([]);
    

    // const handleNext = () => {
    //     if (currentIndex < media.length - 1) {
    //         setCurrentIndex(currentIndex + 1);
    //     }
    // };

    // const handlePrev = () => {
    //     if (currentIndex > 0) {
    //         setCurrentIndex(currentIndex - 1);
    //     }
    // };

    const loadMedia = () => {
        const filesArray = Array.from(files);
        const mediaArray = [];

        filesArray.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                mediaArray.push({
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    url: reader.result,
                });

                if (mediaArray.length === filesArray.length) {
                    setMedia(mediaArray);
                }
            };
        });
    };

    useEffect(() => {
        loadMedia();
    }, [files]);

    return (
      <Slide media={media} />
        // <div>
        //     {media.length > 0 && (
        //         <div>
        //             <button onClick={handlePrev} disabled={currentIndex === 0}>
        //                 {"<"}
        //             </button>
        //             {media[currentIndex].type === 'image' ? (
        //                 <img
        //                     src={media[currentIndex].url}
        //                     alt="Uploaded"
        //                     className="w-[45%] aspect-[3/2] object-contain"
        //                 />
        //             ) : (
        //                 <video
        //                     autoPlay
        //                     loop
        //                     className="w-[45%] aspect-[3/2] object-contain"
        //                 >
        //                     <source src={media[currentIndex].url} type="video/mp4" />
        //                     Your browser does not support the video tag.
        //                 </video>
        //             )}
        //             <button
        //                 onClick={handleNext}
        //                 disabled={currentIndex === media.length - 1}
        //             >
        //                 {">"}
        //             </button>
        //         </div>
        //     )}
        // </div>
    );
}

export default SlideContent;
