import fetch from '../utils/fetch';

//获取用户信息
export const getAdminInfo = () => fetch('/admin/info');

//登录
export const login = data => fetch('/admin/login', data, 'POST');