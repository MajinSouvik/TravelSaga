import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPopUp } from "../redux/popUpSlice";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { setFeed } from "../redux/feedSlice";
import SlideContent from "./SlideContent";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {openSlice} from "../redux/slideSlice"
import { API } from "../utils/constants";

axios.defaults.withCredentials = true;

function PopUpCreate({ close }) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const user = useSelector((store) => store.user.user);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch(openSlice(true))
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  const getPosts = async () => {
    const posts = await axios.get(API+"posts/get-posts");
    console.log("posts in feeds-->", posts);
    dispatch(setFeed(posts.data.posts));
  };

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dispatch(openSlice(true))
  };

  const handleDragLeave = () => {
    setIsDragging(false);
    dispatch(openSlice(true))
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
    setIsDragging(false);
    dispatch(openSlice(true))
  };

  const handleShare = async () => {
    if (files.length === 0) return;
    setUploading(true);

    const selectedFiles = Array.from(files);

    const uploadPromises = selectedFiles.map(async (fileObj) => {
      const storageRef = ref(storage, `uploads/${fileObj.name + v4()}`);
      await uploadBytes(storageRef, fileObj);
      const fileUrl = await getDownloadURL(storageRef);

      return {
        name: fileObj.name,
        url: fileUrl,
        type: fileObj.type,
      };
    });

    const uploaded = await Promise.all(uploadPromises);

    await uploadPost(uploaded);
    await uploadReel(uploaded);
    setUploading(false);

    getPosts();
    dispatch(openSlice(true))
    close();
  };

  const uploadPost = async (filess) => {
    const values = {
      name: user.username,
      place: "Paris",
      description: "My second post!!",
      files: filess,
    };
    await axios.post(API+"posts/upload/", {
      ...values,
    });
  };

  const uploadReel = async (filess) => {
    const finalFiles = filess.filter((file) => !file.type.startsWith("image/"));

    const values = {
      name: user.username,
      place: "Paris",
      files: finalFiles,
    };

    const resp = await axios.post(API+"reels/upload/", {
      ...values,
    });

    console.log("reels-uploaded-->", resp);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    dispatch(openSlice(true))
    close();
  };
  // fixed inset-0 z-50

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative flex flex-col w-[30rem] h-[35rem] bg-white rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-0 left-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <CloseIcon className="text-gray-600" />
        </button>

        <div className="p-2 border-b flex justify-end">
          <button
            onClick={handleShare}
            disabled={uploading || files.length === 0}
            className={`px-2 py-1 text-sm text-white rounded-md shadow-sm ${
              uploading || files.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Sharing..." : "Share"}
          </button>
        </div>

        <div className="flex-grow flex flex-col overflow-hidden">
          {files.length === 0 ? (
            <div
              className={`border border-dashed rounded-lg flex-grow flex items-center justify-center text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center p-2">
                <UploadFileIcon className="text-3xl text-gray-400 mb-2" />
                <p className="text-xs text-gray-600 mb-1">
                  Drag Photos and Videos Here
                </p>
                <p className="text-xs text-gray-500 mb-1">or</p>
                <div className="flex justify-center space-x-2 mb-2">
                  <AttachFileOutlinedIcon className="text-xl text-blue-500" />
                  <PlayArrowOutlinedIcon className="text-xl text-green-500" />
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-2 py-1 text-xs bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                  >
                    Select from Computer
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto">
              <SlideContent files={files} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopUpCreate;
