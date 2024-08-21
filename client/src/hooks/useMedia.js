import { useState, useEffect } from 'react';

function useMedia(files) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadMedia = () => {
      const imagesArray = [];
      const videosArray = [];

      const filesArray = Array.from(files);

      filesArray.forEach((file) => {
        if(file.type.startsWith("video")){
            videosArray.push(file)
        }else{
            imagesArray.push(file)
        }
      });

      setImages(imagesArray)
      setVideos(videosArray);
    };

    if (files.length > 0) {
      loadMedia();
    }
  }, [files]);

  return { images, videos };
}

export default useMedia;
