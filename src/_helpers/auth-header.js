export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    const userToken =  user && user.data.user.authentication_token;

    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken };
    } else {
        return {};
    }
}
