import service from '.';
// import { LoginFormInt } from "@/type/login";

interface LoginFormInt {
  username: string;
  password: string;
}

export function login(data: LoginFormInt) {
  return service({
    url: '/login',
    method: 'post',
    data
  });
}
