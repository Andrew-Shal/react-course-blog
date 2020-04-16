import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useIsMount from '../../../Utility/UseIsMount';

import './FullPost.css';

const FullPost = props => {
    const isMount = useIsMount();

    const [loadedPostState, setLoadedPostState] = useState(null);

    const deletePostHandler = () => {
        axios.delete('/posts/' + props.match.params.id)
            .then(res => console.log(res));
    }

    // only after mount we fetch data
    useEffect(()=> {
        if(isMount){
            console.log(props);
            loadData();
        }else{
            // did update
            loadData();
        }
    });

    const loadData = ()=>{
        if(props.match.params.id){
            if(!loadedPostState || (loadedPostState && loadedPostState.id != props.match.params.id)){
                axios.get('/posts/'+ props.match.params.id)
                    .then(response => {
                        console.log(response.data);
                        setLoadedPostState(response.data);
                    });
            }
        }
    }

    let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
    if(props.match.params.id){
        post = <p style={{textAlign:"center"}}>Loading...</p>;
    }
    if (loadedPostState){
        post = (
            <div className="FullPost">
                <h1>{loadedPostState.title}</h1>
                <p>{loadedPostState.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={deletePostHandler}>Delete</button>
                </div>
            </div>
        );
    }
    return post;
}

export default FullPost;