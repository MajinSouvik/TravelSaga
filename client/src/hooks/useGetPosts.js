import { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import axios from "axios"
import { API } from "../utils/constants";
import { setFeed } from "../redux/feedSlice";
axios.defaults.withCredentials = true;

function useGetPosts(){
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(API+"posts/get-posts");
        console.log("posts in feeds-->", response);
        dispatch(setFeed(response.data.posts));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, [dispatch]);
}

export default useGetPosts