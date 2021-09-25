import React from 'react'
import { Link } from 'react-router-dom';


function Post({props}){
    return(
            <div className="post-holder" >
                <div className="post">
                    <div style={{display: 'flex', justifyContent: 'center', paddingTop: 10}}>
                        <img className="post-image" src={props} alt={"post"}/>
                    </div>
                    <Link to='/postID'>
                        <div className="post-header">this is a caption</div>
                    </Link>
                    <Link to='/profile'>
                        <div className="post-user">username</div>
                    </Link>
                </div>
            </div>
    )
}
export default Post;