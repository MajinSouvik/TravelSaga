import { useState, useEffect } from "react";
import Slide from "./Slide"

function SlideContent({ files }) {
    const [media, setMedia] = useState([]);
    
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
    );
}

export default SlideContent;
