import React, {useState, useEffect} from 'react';
import  useIsMount from '../../../Utility/UseIsMount';

import Post from '../../../components/Post/Post';
import axios from '../../../axios'
import './Posts.css';

import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

//import {Link} from 'react-router-dom';

const Posts = props => {
    const isMount = useIsMount();

    const [postsState, setPostsState] = useState([]);

    const [selectedPostIdState, setSelectedPostIdState] = useState(null);
    const [errorState, setErrorState] = useState(false);


    const postSelectedHandler = id => {
        //setSelectedPostIdState(id);
        props.history.push({pathname:props.match.url+'/'+id});
    };

    let posts = <p style={{textAlign:'center',color:'red'}} >Something went wrong!</p>
    if(!errorState){
        posts = <p style={{color:'green'}}>Loading posts...</p>
        if(postsState.length){
            posts = postsState.map(post => 
            //<Link to={'/' + post.id} key={post.id} >
                <Post key={post.id} clicked={()=> postSelectedHandler(post.id)} title={post.title} author={post.author}/>
            //</Link>
            );
        }
    }

    useEffect(() => {
        if(isMount){
            console.log(props);
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    console.log(response);
                    const posts = response.data.slice(0,4);
                    const updatedPosts = posts.map(post => { return {...post,author:'Andrew'}});
                    setPostsState(updatedPosts);
                })
                .catch(err => {
                    setErrorState(true);
                    console.log(err);
                });
        }
    });

    return(
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={props.match.url+"/:id"} exact component={FullPost}/>
        </div>
    );
}  

export default Posts;