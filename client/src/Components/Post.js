import CloseIcon from '@mui/icons-material/Close';
import PostComments from './PostComments';
import Slide from './Slide';

function Post({ images, videos, feedID, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl w-[60vw] h-[90vh] max-w-6xl flex overflow-hidden">
        <CloseIcon onClick={() => onClose()} className="absolute top-2 right-2 z-10 cursor-pointer" />
        <div className="flex w-full h-full">
          {/* Slide Section */}
          <div className="w-[40%] h-full flex items-center justify-center">
            <div className="w-full h-full relative flex items-center justify-center">
              <Slide pprops="post" className="w-full h-full flex items-center justify-center">
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
          </div>

          {/* Comments Section */}
          <div className="w-[60%] h-full flex">
            <PostComments feedID={feedID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;


// function Post({ images, videos, feedID, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
//       <div className="relative bg-white rounded-lg shadow-xl w-[90vw] h-[80vh] max-w-6xl flex overflow-hidden">
//         <CloseIcon onClick={() => onClose()} className="absolute top-2 right-2 z-10 cursor-pointer" />
//         <div className="flex w-full h-full">
//           {/* Slide Section */}
//           <div className="w-2/5 h-full flex items-center justify-center">
//             <div className="w-full h-full relative overflow-hidden">
//               <Slide className="absolute inset-0 h-full">
//                 {[
//                   ...images.map((image, index) => (
//                     <img
//                       key={`image-${index}`}
//                       src={image.url}
//                       alt={`Slide ${index + 1}`}
//                       className="object-cover w-full h-full"
//                     />
//                   )),

//                   ...videos.map((video, index) => (
//                     <video
//                       key={`video-${index}`}
//                       src={video.url}
//                       autoPlay
//                       muted
//                       className="object-cover w-full h-full"
//                     />
//                   )),
//                 ]}
//               </Slide>
//             </div>
//           </div>

//           {/* Comments Section */}
//           <div className="w-3/5 h-full flex">
//             <PostComments feedID={feedID} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;


  





