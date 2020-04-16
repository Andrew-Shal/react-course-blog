import React,{useState, Suspense} from 'react';

import './Blog.css';
import Posts from './Posts/Posts';
//import FullPost from './FullPost/FullPost';

import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
//import NewPost from './NewPost/NewPost';
//import axios from '../../axios';

import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(()=> import('./NewPost/NewPost'));

//import useIsMount from '../../Utility/UseIsMount';

const Test = React.lazy(()=> import('./NewPost/NewPost'));

const Blog = props => {
    //const isMount = useIsMount();
    //const [selectedPostIdState, setSelectedPostIdState] = useState(null);
    //const [errorState, setErrorState] = useState(false);

    //const [auth,setAuth] = useState(false);
    const [auth,setAuth] = useState(true);
    return (
        <div className="Blog">
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/posts" exact activeClassName="my-active" activeStyle={{color:'#fa923f',textDecoration:'underline'}}>Posts</NavLink></li>
                        <li><NavLink to={{
                            pathname:'/new-post',
                            hash:'#submit',
                            search:'?quick-submit=true'
                        }}>New Post</NavLink></li>
                    </ul>
                </nav>
            </header>
            {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}
            <Switch>
                {/* {auth? <Route path="/new-post" exact component={AsyncNewPost}/> : null} */}
                {/* <Route path="/posts" render={(props)=><Posts {...props}/>}/> */}
                <Route path="/posts" component={Posts}/>
                {auth? <Route path="/new-post" exact render={()=><Suspense fallback={<div>Loading...</div>}><Test/></Suspense>}/> : null}

                {/* <Route path="/:id" exact component={FullPost}/> */}
                {/* <Redirect from="/" to="/posts"/> */}
                <Route render={()=><h1>404 NOT FOUND</h1>}/>
            </Switch>
        </div>
    );
}

export default Blog;