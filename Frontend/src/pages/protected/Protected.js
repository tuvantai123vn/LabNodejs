import jwtDecode from 'jwt-decode';

const Protected = () => {
    const token = localStorage.getItem('Token');
    if (!token) {
        console.log(token);
    return window.location = "http://localhost:3000/login";
    }
    try {
    // decode JWT to get user information
    const user = jwtDecode(token);
    console.log(user);
    return window.location = "http://localhost:3000";
    } catch (err) {
        console.log(err);
    }
}
export default Protected;
