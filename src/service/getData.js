import fetch from '../utils/fetch';

// 获取用户信息
export const getAdminInfo = () => fetch('/admin/info');

// 登录
export const login = data => fetch('/admin/login', data, 'POST');

// 登出
export const logout = () => fetch('/admin/singout');

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

// 获取商铺总数
export const shopCount = () => fetch('/shopping/restaurants/count');

// 定位当前城市
export const cityGuess = () => fetch('/v1/cities', {type: 'guess'});

// 获取商家列表
export const shopList = data => fetch('/shopping/restaurants', data);

// 获取分类列表
export const categoryList = () => fetch('/shopping/v2/restaurant/category');

// 获取地址列表
export const addressList = data => fetch('/v1/pois', data);

// 更新商铺
export const updateRestaurant = data => fetch('/shopping/updateshop', data, 'POST');

// 删除商铺
export const deleteShop = id => fetch('/shopping/restaurant/' + id, {}, 'DELETE');
