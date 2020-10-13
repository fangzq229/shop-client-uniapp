/**
 * 封装的异步请求处理函数
 * 使用方法为:
 * request('接口名称',{key:value},'请求方式(默认为GET)')
 * .then(res=>{console.log(res)})
 */
import { getToken, removeToken } from "./auth";
let baseUrl = '';
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
			if(result.statusCode === 200) {
				if(result.data.status === 0) {
					resolve(result.data.data);
				}
				reject(result.data.message);
			} else {
				reject(result.data.message);
			}
		},
		fail: (err) => {
			reject(err);
		}
	  })
   //  uni.request(http).then(res => {
   //    let newdata = res[1].data; // if (newdata.code == 403) {
   //    if (newdata.status == -1) {
   //      //如果错误码为 -1 提示
   //      uni.showToast({
   //        title: newdata.message,
   //        icon: 'none'
   //      });
   //    }
   //    resolve(newdata);
	  // console.log('------222-----');
   //  }).catch(err => {
	  // console.log('----1111----');
   //    reject(err);
   //  });
  });
}
export default {
  request
};