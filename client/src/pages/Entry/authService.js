import { postService } from "../../components/apiService";

export const LoginService = (payload) => {
  let res;
  try {
    res = postService("http://localhost:5000/api/auth/login", payload);
  } catch (err) {
    res = err;
  }
  return res;
};

export const SignUpService = (payload) => {
  let res;
  try {
    res = postService("http://localhost:5000/api/auth/signup", payload);
  } catch (err) {
    res = err;
  }
  return res;
};
