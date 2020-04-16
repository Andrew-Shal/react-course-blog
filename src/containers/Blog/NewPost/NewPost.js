import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

import useIsMount from '../../../Utility/UseIsMount';

import './NewPost.css';

const NewPost = props => {
    const isMount = useIsMount();

    useEffect(()=>{
        if(isMount){
            console.log(props);
        }
    });

    const [titleState,setTitleState] = useState('');
    const [contentState,setContentState] = useState('');
    const [authorState, setAuthorState] = useState('Andrew');
    const [submitted, setSubmitted] = useState(false);

    const postDataHandler = () => {
        const data = {
            title:titleState,
            body:contentState,
            author:authorState
        };
        axios.post('/posts',data)
            .then(response => {console.log(response);/* props.history.push('/posts') *//* setSubmitted(true); */});
    }
    //let redirect = submitted?<Redirect to="/posts"/>: null;

    return (
        <div className="NewPost">
            {/* {redirect} */}
            <h1>Add a Post</h1>
            <label>Title</label>
            <input type="text" value={titleState} onChange={(event) => setTitleState(event.target.value)} />
            <label>Content</label>
            <textarea rows="4" value={contentState} onChange={(event) => setContentState(event.target.value)} />
            <label>Author</label>
            <select value={authorState} onChange={(event) => setAuthorState(event.target.value)}>
                <option value="Andrew">Andrew</option>
                <option value="Andre">Andre</option>
            </select>
            <button onClick={postDataHandler}>Add Post</button>
        </div>
    );
}

export default NewPost;