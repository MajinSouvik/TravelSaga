import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import userSlice from "./userSlice"
import feedSlice from "./feedSlice"
import commentSlice from "./commentSlice"
import popUpSlice from "./popUpSlice"
import imageSlice from "./imageSlice"
import reelSlice from "./reelSlice"
import feedReelSlice from "./feedReelSlice"
import slideSlice from "./slideSlice"

const appStore=configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        feed:feedSlice,
        comments:commentSlice,
        popUp:popUpSlice,
        image:imageSlice,
        reels: reelSlice,
        feedReel:feedReelSlice,
        slide:slideSlice
    }
})

export default appStore