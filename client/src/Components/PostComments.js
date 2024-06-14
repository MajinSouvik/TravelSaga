function PostComments(props){
    return(
        <div>
            {props.Comments[0].map(text=>{
                return <p>{text.comment}</p>
            })}
        </div>
    ) 
}

export default PostComments