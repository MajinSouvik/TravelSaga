import { useState } from "react";

function Slide({media}){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        if (currentIndex < media.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    return (
        <div>
            {media.length > 0 && (
                <div>
                    <button onClick={handlePrev} disabled={currentIndex === 0}>
                        {"<"}
                    </button>
                    {media[currentIndex].type.startsWith('image/')? (
                        <img
                            src={media[currentIndex].url}
                            alt="Uploaded"
                            className="w-[45%] aspect-[3/2] object-contain"
                        />
                    ) : (
                        <video
                            autoPlay
                            loop
                            className="w-[45%] aspect-[3/2] object-contain"
                        >
                            <source src={media[currentIndex].url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === media.length - 1}
                    >
                        {">"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Slide