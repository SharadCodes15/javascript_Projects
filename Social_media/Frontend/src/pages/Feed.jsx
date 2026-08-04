import { useState ,useEffect } from 'react';
import React from "react";
import axios from 'axios';





const Feed = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
    
        axios.get('http://localhost:3000/posts').then((res)=>{
            console.log(res);
            setPosts(res.data.post)
        })
    
    }, [])
  return (
    <div className="feed-page">
      <div className="feed-wrapper">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <img src={post.Image} alt="Post" className="post-image" />

            <div className="post-caption">
              <p>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
