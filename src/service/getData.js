import fetch from '../utils/fetch';

// 获取用户信息
export const getAdminInfo = () => fetch('/admin/info');

// 登录
export const login = data => fetch('/admin/login', data, 'POST');

// 登出
export const logout = () => fetch('/admin/signout');

// 取得新增用户
export const userCount = date => fetch('/statis/user/' + date + '/count');

// 取得新增订单
export const orderCount = date => fetch('/statis/order/' + date + '/count');

// 取得新增管理员
export const adminCount = date => fetch('/statis/admin/' + date + '/count');

// 取得总用户数
export const totalUserCount = data => fetch('/v1/users/count', data);

// 取得总订单数
export const totalOrderCount = data => fetch('/bos/orders/count', data);

// 取得总管理员数
export const totalAdminCount = () => fetch('/admin/count');

// 获取用户列表
export const userList = offset => fetch('/v1/users/list', {
    limit: 20,
    offset
});
