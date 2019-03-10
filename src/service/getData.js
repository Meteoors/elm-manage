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

// 获取商家分类列表
export const categoryList = () => fetch('/shopping/v2/restaurant/category');

// 获取地址列表
export const addressList = data => fetch('/v1/pois', data);

// 更新商铺
export const updateRestaurant = data => fetch('/shopping/updateshop', data, 'POST');

// 删除商铺
export const deleteShop = id => fetch('/shopping/restaurant/' + id, {}, 'DELETE');

// 获取食品列表
export const foodList = offset => fetch('/shopping/v2/foods', {
    limit: 20,
    offset
});

// 获取食品总数
export const foodCount = () => fetch('/shopping/v2/foods/count');

// 获取商家详情
export const shopDetail = id => fetch('/shopping/restaurant/' + id);

// 获取食品种类详情
export const categoryDetail = id => fetch('/shopping/v2/menu/' + id);

// 获取店铺食品种类列表
export const foodCategoryList = id => fetch('/shopping/getcategory/' + id);

// 更新食品
export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

// 删除食品
export const deleteFood = id => fetch('/shopping/v2/food/' + id, {}, 'DELETE');

// 获取订单列表
export const orderList = offset => fetch('/bos/orders', {
    limit: 20,
    offset
});

// 获取用户信息
export const userDetail = id => fetch('/v1/user/' + id);

// 获取地址信息
export const addressDetail = id => fetch('/v1/addresse/' + id);

// 获取管理员列表
export const adminList = offset => fetch('/admin/all', {
    offset,
    limit: 20
});

// 添加餐馆
export const addShop = data => fetch('/shopping/addshop', data, 'POST');

// 添加食品种类
export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');

// 添加食品
export const addFood = data => fetch('/shopping/addfood', data, 'POST');
