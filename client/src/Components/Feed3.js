import Slide from "./Slide";
import useMedia from "../hooks/useMedia";

function Feed3(props) {
  const { images, videos } = useMedia(props.content);
  
  return (
    <div className="max-w-md mx-auto my-6 border rounded-lg shadow-lg overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <img
          className="h-12 w-12 rounded-full border border-gray-300"
          src={props.avatar}
          alt={props.name}
        />
        <div className="ml-4">
          <h2 className="font-semibold">{props.name}</h2>
          <p className="text-gray-500 text-sm">{props.place}</p>
        </div>
      </div>

      {/* Post Media */}
      <div className="max-w-lg">
        <Slide>
          {[
            ...images.map((image, index) => (
              <img
                key={`image-${index}`}
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            )),

            ...videos.map((video, index) => (
              <video
                key={`video-${index}`}
                src={video.url}
                autoPlay
                muted
                className="object-cover w-full h-full"
              />
            )),
          ]}
        </Slide>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-red-500">
            <i className="fas fa-heart"></i>
          </button>
          <button className="text-gray-700 hover:text-blue-500">
            <i className="fas fa-comment"></i>
          </button>
          <button className="text-gray-700 hover:text-yellow-500">
            <i className="fas fa-share"></i>
          </button>
        </div>
        <button className="text-gray-700 hover:text-gray-900">
          <i className="fas fa-bookmark"></i>
        </button>
      </div>

      {/* Post Likes */}
      <div className="px-4 py-2">
        <p className="font-semibold">100 likes</p>
      </div>

      {/* Post Caption */}
      <div className="px-4 pb-4">
        <p>
          <span className="font-semibold">{props.name}</span> {props.desc}
        </p>
        <p className="text-gray-500 text-sm mt-2">15 seconds ago</p>
      </div>
    </div>
  );
}

export default Feed3;
