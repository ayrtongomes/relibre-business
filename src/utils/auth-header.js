export default function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('@relibre-business:user'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
