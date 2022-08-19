// get请求
function get(url){
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.onreadystatechange =function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<300){
                    // let res = JSON.parse(xhr.responseText);
                    // console.log(res);
                    // callback(xhr.responseText);
                    resolve(JSON.parse(xhr.responseText))

                }
                else{
                    reject(xhr.status);
                }
            }
        }
    });
}












