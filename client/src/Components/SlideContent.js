import Slide from "./Slide"
import useMedia from "../hooks/useMedia";

function SlideContent({ files }) {
    const { images, videos }=useMedia(files)

    return (
        <Slide>
        {[
          ...images.map((image, index) => {
            // Check if image is a URL string or a file object
            const imageUrl = typeof image === "string" ? image : URL.createObjectURL(image);
            return (
              <img
                key={`image-${index}`}
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            );
          }),
      
          ...videos.map((video, index) => {
            // Check if video is a URL string or a file object
            const videoUrl = typeof video === "string" ? video : URL.createObjectURL(video);
            return (
              <video
                key={`video-${index}`}
                data-index={index}
                src={videoUrl}
                loop
                playsInline
                className="object-cover w-full h-full"
              />
            );
          }),
        ]}
      </Slide>
      
    );
}

export default SlideContent;
