/**
 * 封装的异步请求处理函数
 * 使用方法为:
 * request('接口名称',{key:value},'请求方式(默认为GET)')
 * .then(res=>{console.log(res)})
 */
import {
	getToken,
	removeToken
} from "./auth";
let baseUrl = 'https://ny.waduobao.cn'; // 小程序
// let baseUrl = '';
async function request(mehtod, params, type, callBack) {
	//创建一个名为request请求的方法函数
	if (!type) {
		type = 'GET';
	}
	let header = {
		//设置请求头信息
		'Authorization': getToken(),
		'X-Requested-With': 'XMLHttpRequest',
		"Accept": "application/json",
		"Content-Type": "application/json; charset=UTF-8"
	};
	let http = {
		url: baseUrl + mehtod,
		data: params,
		method: type,
		header: header
	};
	return new Promise((resolve, reject) => {
		uni.request({
			...http,
			success: (result) => {
				if (result.statusCode === 200) {
					resolve(result.data);
				}
				if(result.statusCode === 412) {
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/login",
						})
					}, 1000);
				}
				reject(result.data.message || '服务异常');
			},
			fail: (err) => {
				reject(err);
			}
		})
	});
}
export default {
	request
};
