// 接口实现
// 热搜榜接口实现
const rankli=document.querySelectorAll(".sroll_nav .hotSearch li>i");
const title=document.querySelectorAll(".sroll_nav .hotSearch li>a");
const hotSear=document.getElementById("hotSear");//搜素框
const hot_btn=document.getElementById("hot_btn");
const LHrank=document.querySelectorAll(".highlight_wrap .conRight .rank");
const LHA=document.querySelectorAll(".highlight_wrap .conRight .banCon a");
const input=document.querySelector(".swiper_wrap .input input");
// console.log(input);
document.getElementById("hotSear").onfocus=function(){
    // console.log('ok');
};
// document.getElementById("hotSear").select();
// console.log(hotSear.focus());
get('http://106.52.74.37:8000/getHotSearch').then(resp =>{
    for(let i=0;i<rankli.length;i++){
        rankli[i].innerHTML=resp.data.hotSearchData[i].rank;
        title[i].innerHTML=resp.data.hotSearchData[i].title;
        LHrank[i].innerHTML=resp.data.hotSearchData[i].rank;
        LHA[i].innerHTML=resp.data.hotSearchData[i].title;
    }
    let j=0;
    function valueChanged(){
        if(j>=resp.data.hotSearchData.length)
            j=0;
        hotSear.setAttribute("placeholder",resp.data.hotSearchData[j].title);
        j++;
    }
    var holder=setInterval(valueChanged,3000);
    hotSear.addEventListener("focus",()=>{
        clearInterval(holder);
        hotSear.classList.add("focus");
    });
    hotSear.addEventListener("blur",()=>{
        holder=setInterval(valueChanged,3000);
        hotSear.classList.remove("focus");
    })
});

// 轮播图接口实现
const live_img=document.querySelectorAll(".swiper_container .live img");
const live_title=document.querySelectorAll(".swiper_container .live .title>span")
const live_allA=document.querySelectorAll(".swiper_container .live>li>a");
const hot_play=document.querySelector(".column_wrap .hot_play");
const recommend=document.querySelector(".column_wrap .recommend")
const recomA=document.querySelectorAll(".column_wrap .recom_list>li>a");
const img=document.querySelectorAll(".swiper_wrap .recom img");
const imgA=document.querySelectorAll(".swiper_wrap .recom>a");
get('http://106.52.74.37:8000/getSwiper').then(resp =>{
    for(let i=0;i<live_img.length;i++){
    live_img[i].setAttribute('data-src',resp.data.liveData.livePlay[i].imgSrc);
    live_title[i].innerHTML=resp.data.liveData.livePlay[i].name;
    live_allA[i].href=resp.data.liveData.livePlay[i].link;
}
hot_play.innerHTML=resp.data.liveData.liveState;
recommend.innerHTML=resp.data.recommendData.recommendation;
for(let i=0;i<recomA.length;i++){
    recomA[i].href=resp.data.recommendData.recomendContent[i].link;
    recomA[i].innerHTML=resp.data.recommendData.recomendContent[i].title;
    img[i].setAttribute('data-src',resp.data.recommendData.recomendContent[i].imgSrc);
    imgA[i].href=resp.data.recommendData.recomendContent[i].link;
}
});

// 今日热门接口实现
const topic_img=document.querySelectorAll(".hotTopic .box img");
const topic_imgA=document.querySelectorAll(".hotTopic .box .image>a");
const topic_info=document.querySelectorAll(".hotTopic .box .info>a");
const topicH=document.querySelector(".hotTopic .info h4");
get('http://106.52.74.37:8000/getHotTopic').then(resp =>{
    topicH.innerHTML=resp.data.hotTopicData[0].brief;
    for(let i=0; i<topic_img.length; i++){
        topic_imgA[i].href = resp.data.hotTopicData[i].img.link;
        topic_img[i].setAttribute('data-src',resp.data.hotTopicData[i].img.src);
        topic_info[i].href=resp.data.hotTopicData[i].title.link;
        topic_info[i].innerHTML=resp.data.hotTopicData[i].title.text;
    }
});

// 直播导视
const guideImg=document.querySelectorAll(".live_guide .content img");
const guideA=document.querySelectorAll(".live_guide .content li>a");
const guideTopic=document.querySelectorAll(".live_guide .content li img~i");
const start=document.querySelectorAll(".live_guide .time .start");
const end=document.querySelectorAll(".live_guide .time .end");
const brief=document.querySelectorAll(".live_guide li .brief");
get('http://106.52.74.37:8000/getLiveGuide').then(resp => {
    for(let i=0;i<guideImg.length;i++){
        guideImg[i].setAttribute('data-src',resp.data[i].img.src);
        guideA[i].href=resp.data[i].img.link;
        guideTopic[i].innerHTML=resp.data[i].topic;
        start[i].innerHTML=resp.data[i].time.startTime;
        end[i].innerHTML=resp.data[i].time.endTime;
        brief[i].innerHTML=resp.data[i].itemName;
    }
});

// 看点
const HLnav=document.querySelectorAll(".highlight_wrap .top_title li>a");
const HLimg=document.querySelectorAll(".highlight_wrap .conLeft .image img");
const HLimgA=document.querySelectorAll(".highlight_wrap .conLeft .image>a");
const titleA=document.querySelectorAll(".highlight_wrap .conLeft .title>a");
const keywordA=document.querySelectorAll(".highlight_wrap .conLeft .keyword>a");
get('http://106.52.74.37:8000/getHighLight').then(resp =>{
    for(let i =0;i<HLnav.length;i++){
        HLnav[i].href=resp.data.navigation[i].link;
        HLnav[i].innerHTML=resp.data.navigation[i].text;
    }
    for(let i = 0;i<HLimg.length;i++){
        HLimg[i].setAttribute('data-src',resp.data.highlightData[i].img.src);
        HLimgA[i].href=resp.data.highlightData[i].img.link;
        titleA[i].href=resp.data.highlightData[i].title.link;
        titleA[i].innerHTML=resp.data.highlightData[i].title.text;
        keywordA[i].href=resp.data.highlightData[i].keyword.link;
        keywordA[i].innerHTML=resp.data.highlightData[i].keyword.text;
    }
});
// 央视大全
const proName=document.querySelectorAll(".program .TVlist li .name");
const proTopic=document.querySelectorAll(".program .TVlist li .topic");
const rightBox=document.querySelectorAll(".program .prolist .rightBox");
const proImg=document.querySelectorAll(".program .prolist .leftBox .image img");
const proImgA=document.querySelectorAll(".program .prolist .leftBox .image a");
get('http://106.52.74.37:8000/getProgram').then(resp => {
    for(let i=0;i<proName.length;i++){
        proName[i].innerHTML=resp.data.programData[i].name;
        proTopic[i].innerHTML=resp.data.programData[i].topic;
    }
    for(let i=0;i<resp.data.programData.length;i++){
        proImg[i].setAttribute('data-src',resp.data.programData[i].img.src);
        proImgA[i].href=resp.data.programData[i].img.link;
        for(let j=0;j<resp.data.programData[i].programList.length;j++){
            rightBox[i].querySelectorAll("li a")[j].innerHTML=resp.data.programData[i].programList[j].text;
            rightBox[i].querySelectorAll("li a")[j].href=resp.data.programData[i].programList[j].href;
        }
    }
});