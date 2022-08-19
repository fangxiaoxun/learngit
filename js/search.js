// 热搜榜实现
//跳转到百度有参考网上的案列，再加入自己的想法
const history_li=document.querySelector(".sroll_nav .sear_List .history_li");
const Delete=document.querySelector(".sroll_nav .sear_List .history .delete");
const top_content=document.querySelector(".sroll_nav .sear_List .top_content");
const sear_List=document.querySelector(".sroll_nav .right .sear_List");
Delete.addEventListener("click",function(){
    history_li.innerHTML='';
    top_content.classList.add("none");
});
//搜索功能
// 回车搜索
hotSear.addEventListener("keydown",function(){
    if(window.event.keyCode==13){
        searchValue=hotSear.value;
        if(hotSear.value=='')
            searchValue=hotSear.placeholder;
        jumpPage(searchValue);
        history(searchValue);
    }
});
// 按钮搜索
hot_btn.addEventListener("click",function(){
    searchValue=hotSear.value;
    if(hotSear.value=='')
        searchValue=hotSear.placeholder;
    jumpPage(searchValue);
    history(searchValue);
});
// 搜索跳转
function jumpPage(searchValue){
    if(hotSear.value=='')
        searchValue=hotSear.placeholder;
    window.open("http://www.baidu.com/s?ie=UTF-8&wd="+searchValue);
}
// 添加历史记录
function history(searchValue){
    top_content.classList.remove("none");
    var sear_List = document.createElement('a');
    sear_List.setAttribute("target","_blank");
    sear_List.innerHTML=searchValue;
    history_li.insertBefore(sear_List,history_li.children[0]);
    // 防止添加相同内容的历史记录
    if(history_li.children.length>1){
        if(sear_List.innerHTML == history_li.children[1].innerHTML){
            history_li.removeChild(history_li.children[1])
        }
    }
}

sear_show(hotSear);
sear_show(sear_List);
document.body.addEventListener("click",function(){
    sear_List.classList.add("none");
});
// 封装搜索排行榜出现函数
function sear_show(obj){
    obj.addEventListener("click",function(){
        sear_List.classList.remove("none");
        window.event.stopPropagation();
        hotSear.cancelBubble=true;
    })
}





