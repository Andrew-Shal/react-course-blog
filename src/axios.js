import axios from 'axios';

const instance = axios.create({
    baseUrl:'https://jsonplaceholder.typicode.com/'
});

instance.defaults.headers.common['Authorizations'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;