import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Feed({image,name,place}){
    return(
    <div className='my-6'>
        <div>
            <p>{name}</p>
            <img src={image}/>   
            <p>{place}</p>
        </div>

        <div className='flex justify-between'>
            <div className='space-x-3'>
                <CommentIcon />
                <FavoriteBorderIcon />
            </div>
            <BookmarkBorderIcon />
        </div>
    </div>
    )
}

export default Feed