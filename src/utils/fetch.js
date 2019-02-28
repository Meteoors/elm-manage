import { baseUrl } from './env'
import { resolve } from 'url';

export default async(url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        //拼接字符串
        let str;
        Object.keys(data).forEach(key => {
            str += key + '=' + data[key] + '&';
        })

        if (str !== '') {
            str = str.substr(0, str.lastIndexOf('&'));
            url += '?' + str;
        }
    }

    if (window.fetch) {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            mode: 'cors',
            cache: 'reload'
        };

        if (type === 'POST') {
            requestConfig.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson;
        } catch(e) {
            throw new Error(e);
        }

    } else {
        //浏览器不支持fetch时使用ajax
        return new Promise((resolve, reject) => {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject();
            }

            let sendData = null;
            if (type === 'POST') {
                sendData = JSON.stringify(data);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let obj = xhr.responseText;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(xhr);
                    }
                }
            }

            xhr.open(type, url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(sendData);
        })
    }
}