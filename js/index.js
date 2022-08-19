
window.onload=function(){
    // 头部导航条
    const drop_nav=document.querySelectorAll("header .drop");
    const switch_list=document.querySelectorAll("header .top_nav .switch");
    //封装下拉层函数
    // 这个不要封装
    drop_change(switch_list,drop_nav,"cur_nav","drop_show");
    function drop_change(dropli,dropmenu,changeName1,changeName2,callback) {
        for(let i=0;i<dropli.length;i++){
            dropli[i].index= i;
            dropli[i].addEventListener("mouseover",function(){
                this.classList.add(changeName1);
                dropmenu[this.index].classList.add(changeName2);
            
            
            });
            dropli[i].addEventListener("mouseleave",function(){
                this.classList.remove(changeName1);
                dropmenu[this.index].classList.remove(changeName2);
            
            });
            if(callback){
                callback();
            }
            callback && callback();
        }
    }
    // 点击网页
    const selcet_list=document.querySelector(".top_nav .search_box .selcet_list");
    const selcet=selcet_list.querySelector(".selcet");
    selcet_list.addEventListener("click",function(){
        selcet.style.display="block";
    });
    const search = document.querySelector(".top_nav .nav_right .search");
    const search_box=search.querySelector(".search_wrap");
    const user=document.querySelector(".top_nav .nav_right .user");
    const login_box=user.querySelector(".login_wrap");

    // 黑色导航条右边的搜索框和登录框
    box_show(search,search_box,login_box,"width","height");
    box_show(user,login_box,search_box,"height","width");
    function box_show(item,obj1,obj2,style1,style2) {
        item.addEventListener("click",() => {
            move(obj1,style1,280,7,function(){
                obj1.style.overflow="visible";
            });
            obj2.style.overflow="hidden";
            move(obj2,style2,0,-12);
            window.event.stopPropagation();
            item.cancelBubble=true;
        })
    }
    document.body.addEventListener("click",function(){
        search_box.style.overflow="hidden";
        move(search_box,"width",0,-12);
        login_box.style.overflow="hidden";
        move(login_box,"height",0,-7);
    });


    // 精灵图标
    const title_icon=document.querySelectorAll(".popups .channel>i");
    for(let i=0;i<title_icon.length;i++){
        title_icon[i].style.backgroundPosition="-"+i*24+"px -0";
    }
    const areaTV=document.querySelectorAll(".areaTV>li>a");
    for(let i=0;i<areaTV.length;i++){
        areaTV[i].style.backgroundPosition="-0 -"+i*21+"px";
    }
    const TVlist=document.querySelectorAll(".popups .bottom .TV_list>li>a");
    for(let i=0;i<TVlist.length;i++){
        TVlist[i].style.backgroundPosition="-0 -"+i*21+"px";
    }
    const siderA=document.querySelectorAll(".sider li>a");
    for(let i=0;i<siderA.length;i++){
        siderA[i].style.backgroundPosition=" center -"+(16+i*62)+"px";
    }

    // 侧边栏
    function windowAnimate(obj, target,step) {
        if(window.pageYOffset>target){
            step = -step;
        }
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            if(step<0){
                if (window.pageYOffset <= target) { 
                    clearInterval(obj.timer);
                    return false;
                }
            }
            if(step>0){
                if(window.pageYOffset>=target){
                    clearInterval(obj.timer);  
                }
            }
            window.scroll(0,window.pageYOffset+step);

        }, 15);
    }

    // 获取目标位置
    const target=document.querySelectorAll(".target");
    // 侧边栏的li
    var siderli=document.querySelectorAll(".sider li");
    let liHeight=siderli[0].offsetHeight;
    // 对应板块
    let curr, destin, next=null, setdown,moveIndex, currentSort;
    const removable = document.querySelector('.removable');

// 侧边栏点击到达任意指定地方
    for(let i = 0 ;i<siderli.length;i++){
        siderli[i].addEventListener("click",function(){
            if(i==siderli.length-2){
                siderli[i].click=null;
            }
            else if(i==siderli.length-1){
                windowAnimate(window,0,70);
            }
            else{
                windowAnimate(window,target[i].offsetTop-150,70);//这里-150
            }
            for(let j = 0; j<siderli.length; j++){
                siderli[j].classList.remove('cur');
            }
            this.classList.add('cur');
        });
    }
    // 侧边栏的排序有参考网上的一些案列，再修改整合自己的思路
    for(let i = 0; i<siderli.length; i++) {
        siderli[i].index = i;
        siderli[i].sort= i;
    }
    // 初始化排序
    moveItem(siderli);
    function moveItem(objArr){
        for(let i= 0;i<siderli.length;i++){
            objArr[i].style.top=objArr[i].sort*liHeight+5+"px";
        }
    }
    // 为每个侧边栏的绑定自定义拖拽函数
    for(let i=0;i<siderli.length;i++){
        siderli[i].onmousedown=addEvent(siderli[i]);
    }

    function addEvent(item){
        item.addEventListener("mousedown",(event)=>{
            // 当前要移动的li
            curr=document.querySelectorAll(".remove")[item.sort];
            event = event || window.event;
            item.style.zIndex='2';
            item.style.transition='all 0s';
            let startY = event.pageY;
            let top=item.offsetTop;
            // 获取当前移动的坐标
            let moveFun = (event) => {
                let Y = event.pageY-startY+top;
                item.style.top=Y+'px';
                resort(item ,Y);
            };
            document.addEventListener("mousemove",moveFun)
            document.addEventListener('mouseup',()=>{
                // 移动到目的位置的li
                destin=document.querySelectorAll(".remove")[setdown];
                // item向上移动
                if(currentSort > moveIndex){
                    next=document.querySelectorAll(".remove")[setdown];
                    removable.insertBefore(curr,next);
                }
                // item向下移动
                else if(currentSort < moveIndex){
                    next=document.querySelectorAll(".remove")[setdown+1];
                    removable.insertBefore(curr,next);
                }
                document.removeEventListener('mousemove',moveFun);
                item.style.zIndex='1';
                item.style.transition='all .3s ease-in';
                moveItem(siderli);
                document.onmouseup=null; 
                document.onmousemove=null;
            });
        });
    }
    // 取消默认
    for(let i = 0;i<siderli.length;i++){
        siderli[i].ondragstart = function() {
            return false;
        };
    }
    let index=0
// 对li的自定义属性sort进行重新赋值并且依据此值进行重新排列
    function resort(item, y){
        // 确定移动的序号index
        moveIndex = Math.round(y/liHeight);
        moveIndex = moveIndex < 0 ? 0 :moveIndex;
        moveIndex = moveIndex >siderli.length-1 ? siderli.length -1 : moveIndex;
        if(moveIndex != index){
            index = moveIndex;
            currentSort = item.sort;
            for(let i = 0 ;i<siderli.length;i++){
                // item往下移动
                if(currentSort < moveIndex){
                    // item之下且移动的目的位置之上的所有元素,往上移动一个位置
                    if(siderli[i].sort > currentSort && siderli[i].sort <= moveIndex){
                        siderli[i].sort-=1;
                    }
                }else if(currentSort > moveIndex){//item往上移
                    // item之上且目的位置之下的所有元素
                    if(siderli[i].sort < currentSort && siderli[i].sort >= moveIndex){
                        siderli[i].sort+=1;
                    };
                }
            };
            siderli[item.index].sort = moveIndex;
            // 按照更改后的元素sort的值进行排列
            moveItem(siderli);
            setdown=moveIndex;
        }
    }

    // 白色导航条
    // 白色导航出现
    const whiteNav=document.querySelector("header .sroll_nav");
    const sider=document.querySelector(".sider");
    let SPosition=document.querySelector(".main_navWrap").offsetTop+document.querySelector(".main_navWrap").offsetHeight-300;
    window.addEventListener("scroll",function(){
        if(window.pageYOffset>=SPosition){
            whiteNav.classList.remove("disappear");
            sider.style.visibility="visible";
            sider.style.display="block";
        }
        else{
            whiteNav.classList.add("disappear");
            sider.style.visibility="hidden";
            sider.style.display="none";

        }
        for(let i= 0;i<target.length;i++){
            target[i].index = i;
            if(window.pageYOffset>=target[i].offsetTop-100){
                for(let j= 0;j<siderli.length;j++){
                    siderli[j].classList.remove("cur");
                }
                siderli[target[i].index].classList.add('cur');
            }
        }
    });

    // 弹出层
    const popups=document.querySelector(".popups");
    const logo_nav=document.querySelector(".logo_nav");
    const popups_wrap=document.querySelector(".popups_wrap");
    const close=document.querySelector(".logo_box .close");
    const option=document.querySelector(".top_nav .nav_right .option");
    const logo=document.querySelector(".logo_nav");
    // 窗口缩放
    // 一些窗口缩放后会变化的数据做修改
    window.addEventListener("resize",function(){
        lazyLoad(imgs);
        // 黑色导航弹窗的内容高度
        popups.style.height=document.documentElement.clientHeight-150+"px";

        // 下拉层精灵图标
        TVicon=TVli[0].querySelector('a').offsetHeight;
        for(let i=0;i<TVli.length;i++){
            TVli[i].style.backgroundPosition="-0 -"+i*TVicon+"px";
            allTV[i].style.backgroundPosition="-0 -"+i*TVicon+"px";
        }

        //    手风琴
        fixeBox();

        for(let i = 0;i<sroll_drop.length;i++){
            dropH[i] = drop[i].offsetHeight;
        }

        // 缩放不同时点击滚动的距离不同
        step=parseInt(window.getComputedStyle(mask,null).width);
        // 给ul先有个缓冲的时间，避免li的宽度被弹性盒宽度不够被压小
        live_ul.style.width='4000px';
        // 根据缩放的li宽度不同，对ul的宽度重新赋值
        live_ul.style.width=live_li.length*live_li[0].offsetWidth+"px";
        live_ul.style.left=Hotflag*live_li[0].offsetWidth+"px";
        // 点击后进行缩放
        finaValue=live_ul.offsetWidth-parseInt(window.getComputedStyle(mask,null).width)-3;//-3是为了消除缩放至125%时的误差  

        if(Hotflag){
            finaValue=live_ul.offsetWidth-parseInt(window.getComputedStyle(mask,null).width)-3;//-3是为了消除缩放至125%时的误差  
            if(live_ul.offsetLeft!=-finaValue){
                arrow[1].classList.remove("none");
            }
            if(live_ul.offsetLeft <= -finaValue){
                arrow[1].classList.add("none");
            }
        }
        // 直播导视
        guideStep = guideWrap.offsetWidth;
        guide_ul.style.width=guideLi.offsetWidth*guideLi.length+"px";
        guide_ul.style.left=Guideflag*guideLi[0].offsetWidth+"px";
        FValue=guide_ul.offsetWidth-guideStep;
        if(Guideflag){
            FValue=guide_ul.offsetWidth-guideStep;
            
            if(guide_ul.offsetLeft < -FValue){
                guide_ul.style.left=-FValue+"px";
            }
            if(guide_ul.offsetLeft!=-FValue){
                guide_arrow[1].classList.remove("pro");
            }
        }


        // 片库
        // 缩放调整
        changeL=document.querySelector(".mov_wrap .content").offsetWidth+20;
        for(let i=0;i<conul.length;i++){
            if(conul[i].offsetLeft<0){
                conul[i].style.left=-changeL+'px';
            }
            if(conul[i].offsetLeft>0){
                conul[i].style.left=changeL+'px';
            }
        }
    });

    popups.addEventListener("scroll",function(){
        logo_nav.classList.add("shadow");
        if(popups.scrollTop==0){
            // 弹窗滚动到顶部时的阴影
            logo_nav.classList.remove("shadow");
        }
    });
    // 点击隐藏main部分消除滚动条
    const mainbody=document.querySelector("main");
    const footbody=document.querySelector("footer");
    // 展开黑色滚动条的顶部弹窗
    option.addEventListener("click",function(){
        popups_wrap.style.display="block";
        move(popups_wrap,"height",window.innerHeight-1,15,function(){//这个部分传入的终值如果传window.innerHeight的话就会出现竖直滚动条，-1的话就不会
            // 让主体body部分的滚动条消失
            popups_wrap.style.overflow="visible";
            logo.style.position="fixed";
            mainbody.style.display="none";
            footbody.style.display="none";
        });
    });
    // 关闭弹窗
    close.addEventListener("click",function(){
        popups_wrap.style.overflow="hidden";
        logo.style.position="absolute";
        mainbody.style.display="block";
        footbody.style.display="block";
        move(popups_wrap,"height",0,-15);
    });

    // 白色导航条的弹出层
    const dropli=document.querySelectorAll(".sroll_nav .left .alt");
    var sroll_drop=document.querySelectorAll(".sroll_nav .drop_list");
    let drop=document.querySelectorAll(".sroll_nav .drop_list .sroll_drop");
    var TVli=document.querySelectorAll(".sroll_nav .drop_list .TVs>li");
    var allTV=document.querySelectorAll(".sroll_nav .all_nav .TVs_all>li");
    const sec=document.querySelectorAll(".sroll_nav .sec_drop .sec_wrap");
    const titleli=document.querySelectorAll(".sroll_nav .sec_drop .sec_title>li");
    var TVicon=TVli[0].querySelector('a').offsetHeight;
    // 动态获取弹出层的高度
    var dropH = new Array();
    for(let i = 0;i<sroll_drop.length;i++){
        dropH[i] = drop[i].offsetHeight;
    }
    //精灵图标
    for(let i=0;i<TVli.length;i++){
        TVli[i].style.backgroundPosition="-0 -"+i*TVicon+"px";
        allTV[i].style.backgroundPosition="-0 -"+i*TVicon+"px";
    }
    for(let i=0;i<dropli.length;i++){
        dropli[i].index=i;
         // 展出
        dropli[i].addEventListener("mouseover",function(){
            for(let i=0;i<sroll_drop.length;i++)
                sroll_drop[i].classList.remove("drop_shadow");
            sroll_drop[this.index].classList.add("drop_shadow");
            move(sroll_drop[this.index],"height",dropH[this.index],5);
        });
        // 收起
        dropli[i].addEventListener("mouseout",function(){
            let mark=this.index;
            move(sroll_drop[this.index],"height",0,-5,function(){
                sroll_drop[mark].classList.remove("drop_shadow");//消失
            });
        });
    }
    // 频道大全点击切换
    for(let i=0;i<titleli.length;i++){
        titleli[i].index = i;
        titleli[i].addEventListener("click",function(){
            for(let j=0;j<titleli.length;j++){
                titleli[j].classList.remove("cur");
                sec[j].classList.add("none");
            }
            this.classList.add("cur");
            sec[this.index].classList.remove("none");
        });
    }

    // 热播轮播图
    const arrow=document.querySelectorAll(".swiper_container .arr");
    var live_ul=document.querySelector(".swiper_container .live");
    var live_li=document.querySelectorAll(".swiper_container .live>li");
    var mask=document.querySelector(".swiper_container .mask");
    var step=parseInt(window.getComputedStyle(mask,null).width);

    var ul_l, pre, aft, Hotflag;
    //动态设置ul的宽度 
    live_ul.style.width=live_li.length*live_li[0].offsetWidth+"px";
    // 控制在不管那个尺寸的浏览器，点击到尽头都是相同的效果
    var finaValue=live_ul.offsetWidth-parseInt(window.getComputedStyle(mask,null).width)-3;//-10是为了消除缩放至125%时的误差
    let timerl,timerr;
    // 点击左边箭头
    arrow_click( arrow[0] ,timerl,function(){
        if(pre>0)
        pre=0;
        move(live_ul,"left",pre,+20,function(){
            Hotflag=Math.round(live_ul.offsetLeft/live_li[0].offsetWidth);
            arrowChanged(live_ul,arrow[0],arrow[1],-finaValue,"none");

        });
    });
    // 点击右边箭头
    arrow_click(arrow[1], timerr,function(){
        if(aft<=-finaValue){
            aft=-finaValue;
        }
        move(live_ul,"left",aft,-20,function(){
            Hotflag=Math.round(live_ul.offsetLeft/live_li[0].offsetWidth);
            arrowChanged(live_ul,arrow[0],arrow[1],-finaValue,"none");
        });
    });

    function arrow_click(obj, timer, callback) {
        obj.addEventListener("click",() => {
            if(flag){
                clearInterval(timer)
                flag=false;
                ul_l=live_ul.offsetLeft;
                aft=ul_l-step;
                pre=ul_l+step;
                if(callback){
                    callback && callback();
                }
                timer=setInterval(() =>{flag=true;},750)
            }
        })
    }
    // 鼠标在热播轮播图上会停止自动播放
    mask.addEventListener("mouseenter", function(){
        clearInterval(timer);
    });
    mask.addEventListener("mouseleave", function(){
        clearInterval(timer);
        autoplay();
    });


    // 推荐轮播图
    // 轮播图的背景颜色
    const colorArr=["#939297","#112145","#b8a78b","#a87f63","#aaa7b0","#8a8863"];
    const recom=document.querySelectorAll(".swiper_wrap .recom");
    for(let i=0;i<recom.length;i++){
        recom[i].style.backgroundColor=colorArr[i];
    }
    const play=document.querySelectorAll(".swiper_wrap .right_side .play");
    const play_content=document.querySelectorAll(".swiper_wrap .play_content");
    const recommend=document.querySelector(".swiper_wrap .right_side .recommend");
    let count=0;
    var timer;

    autoplay();

    for(let i=0; i<play.length; i++){
        play[i].index=i;
        play[i].addEventListener("mouseover",function(){
            clearInterval(timer);
            count=this.index;
            playfun(this);
        });
    }

    function autoplay(){
        timer=setInterval(function(){
            count%=play.length;
            playfun(play[count]);
            count++;
        },3500);
    }

    function playfun(obj){
        for(var i=0;i<play_content.length;i++){
            play_content[i].classList.add("hidden");
            play[i].classList.remove("cur");
        }
        obj.classList.add("cur");
        play_content[obj.index].classList.remove("hidden");
        if(obj.index>0)
            recommend.classList.add("cur");
        else
            recommend.classList.remove("cur");
    }

    const wrapper = document.querySelector(".wrapper");
    wrapper.addEventListener("mouseover",function(){
        clearInterval(timer);
    });
    wrapper.addEventListener("mouseout",function(){
        autoplay();
    })

    // main导航条
    const nav1_icon=document.querySelectorAll(".main_nav nav>ul>li .nav1_icon");
    // 精灵图标
    for(let i = 0;i<nav1_icon.length;i++){
        nav1_icon[i].style.backgroundPosition="0 -"+24*i+"px";
    }
    // 下拉导航
    const mainNav_li=document.querySelectorAll(".main_nav .nav1>ul>li");
    const mainAlt=document.querySelectorAll(".main_nav .alt");
    const AltDrop=document.querySelectorAll(".main_nav .alt .main_drop>div");
    // 鼠标移入的样式
    for(let i = 0;i<mainNav_li.length;i++){
        mainNav_li[i].addEventListener("mouseover",function(){
            for(let j=0;j<mainNav_li.length;j++)
                mainNav_li[j].classList.remove("ative");
            this.classList.add("ative")
        });
        mainNav_li[i].addEventListener("mouseleave",function(){
            mainNav_li[i].classList.remove("ative");
        });
    }
    // 二级导航
    for(let i=0;i<mainAlt.length;i++){
        mainAlt[i].index=i;
        mainAlt[i].addEventListener("mouseover",function(){
            for(let j=0;j<mainAlt.length;j++){
                AltDrop[j].classList.add("none");
            }
            AltDrop[this.index].classList.remove("none");
        });
        mainAlt[i].addEventListener("mouseleave",function(){
            for(let i = 0;i < mainAlt.length;i++){
                AltDrop[i].classList.add("none");

            }
        });
    }

    // 直播导视
    var guide_arrow=document.querySelectorAll(".live_guide .guide_content .btn>div");
    var guide_ul=document.querySelector(".guide_content .content>ul");
    var guideLi=document.querySelectorAll(".guide_content .content>ul>li");
    let guideWrap=document.querySelector(".guide_content .content");
    // 设置ul的宽度
    guide_ul.style.width=guideLi.offsetWidth*guideLi.length+"px";
    var guideStep = guideWrap.offsetWidth;
    var FValue=guide_ul.offsetWidth-guideStep;
    let newLeft, guidePre, guideAft;
    var Guideflag;
    let flag=true;
    let timerL,timerR;
    // 点击向左
// 封装直播导视的轮播
    function guideArrow(obj, timer, callback) {
        obj.addEventListener("click",() => {
            if(flag){
                clearInterval(timer)
                flag=false;
                newLeft=guide_ul.offsetLeft;
                guidePre=newLeft+guideStep;
                guideAft=newLeft-guideStep;
                if(callback){
                    callback && callback();
                }
                timer=setInterval(() =>{flag=true;},700)
            }
        })
    }

    guideArrow(guide_arrow[0] ,timerL,function(){
        if(guidePre>0){
            guidePre=0;
        }
        move(guide_ul,"left",guidePre,30,function(){
            Guideflag=Math.round(guide_ul.offsetLeft/guideLi[0].offsetWidth)
            arrowChanged(guide_ul,guide_arrow[0],guide_arrow[1],-(guide_ul.offsetWidth-guideStep),"pro")
        });
    });


    guideArrow(guide_arrow[1], timerR,function(){
        if(guideAft<=-FValue){
            guideAft=-FValue;
        }
        move(guide_ul,"left",guideAft,-30,function(){
            Guideflag=Math.round(guide_ul.offsetLeft/guideLi[0].offsetWidth);
            arrowChanged(guide_ul,guide_arrow[0],guide_arrow[1],-(guide_ul.offsetWidth-guideStep),"pro")
        });
    })

// 封装到达终点是左右箭头的样式
    function arrowChanged(obj,left, right,target,className) {
        if(obj.offsetLeft>=0){
            left.classList.add(className);
        }else{
            left.classList.remove(className);
        }
        if(obj.offsetLeft <= target){
            right.classList.add(className);
        }else{
            right.classList.remove(className);
        }
    }

    // 直播导视下的节目介绍
    const con_boxes =document.querySelectorAll(".CCTV .con_box");
    const hov_boxes=document.querySelectorAll('.CCTV .hov_box');
    for(let i = 0;i<con_boxes.length;i++){
        con_boxes[i].index=i;
        con_boxes[i].addEventListener("mouseover",function(){
            for(let j = 0;j < hov_boxes.length;j++){
                hov_boxes[j].classList.add("none")
            }
            hov_boxes[this.index].classList.remove("none");
        });
        con_boxes[i].addEventListener("mouseout",function(){
            for(let j = 0;j < hov_boxes.length;j++){
                hov_boxes[j].classList.add("none")
            }
        });
    }

    // 片库
    const title=document.querySelectorAll(".mov_wrap .right a");
    const conul=document.querySelectorAll(".mov_wrap .content ul");
    const conli=document.querySelectorAll(".mov_wrap .content ul li");
    const hov_box=document.querySelectorAll(".mov_wrap li .hov_box");
    var changeL=document.querySelector(".mov_wrap .content").offsetWidth+20;

    for(let i=0;i<title.length;i++){
        title[i].index=i;
        title[i].addEventListener("mouseover",function(){
            for(let j=0;j<conul.length;j++){
                conul[j].style.left=changeL+"px";
                title[j].classList.remove("hov");
            }
            this.classList.add("hov");
            if(this.index==0){
                conul[conul.length-1].style.left="0px";
                move(conul[conul.length-1],"left",-changeL,-15);
                move(conul[this.index],"left",0,-15);
            }
            else{
                conul[this.index-1].style.left="0px";
                move(conul[this.index-1],"left",-changeL,-15);
                move(conul[this.index],"left",0,-15);
            }
        }); 
    }

    for(let i=0;i<conli.length;i++){
        conli[i].index=i;
        conli[i].addEventListener("mouseover",function(){
            for(let j=0;j<hov_box.length;j++){
                hov_box[j].classList.add("none");
            }
            hov_box[this.index].classList.remove("none");
        });
        conli[i].addEventListener("mouseout",function(){
            hov_box[this.index].classList.add("none");
        })
    }
    // 看点底下的手拉琴特效
    let keyNum;
    function fixeBox(){
    var ADli=document.querySelectorAll(".highlight_wrap .column3 .conBom li");
        const ADWrap=document.querySelectorAll(".highlight_wrap .column3 .conBom .wrap");
        let conLength=document.querySelector(".highlight_wrap .column3 .conBom").offsetWidth;
        for(let i = 0;i < ADli.length; i++){
            let sumLength = 0;
            for(let k = 0 ;k<ADli.length;k++){
                sumLength += ADli[k].querySelector(".min").offsetWidth;
                if(sumLength>conLength-ADWrap[0].offsetWidth){
                    keyNum=k;
                    break;
                }
            }
            ADli[i].index=i;
            ADli[i].addEventListener("mouseover",function(){
                for(let j=0;j<ADli.length;j++)
                    ADli[j].classList.remove("active");
                this.classList.add("active");
                if(this.index>keyNum){
                    for(let k = keyNum;k<ADli.length;k++)
                            ADli[k].classList.add("no-width");
                        this.classList.remove("no-width");
                }        
            });
            ADli[i].addEventListener("mouseout",function(){
                this.classList.remove("active");
                for(let j=0;j<ADli.length;j++)
                    ADli[j].classList.remove("no-width");
            });
        }
    }
    fixeBox();

    // 央视大全切换
    const TVLIST=document.querySelectorAll(".program .TVlist li");
    const prolist=document.querySelectorAll(".program .prolist");
    for(let i=0;i<TVLIST.length;i++){
        TVLIST[i].index=i;
        TVLIST[i].addEventListener("click",function(){
            for(let i =0;i<TVLIST.length;i++){
                TVLIST[i].classList.remove("click");
                prolist[i].classList.add("none");
            }
            this.classList.add("click");
            prolist[this.index].classList.remove("none");
        });
    }

    // lazyload
    let node=document.querySelectorAll("main div,footer div,main a,footer a,main i,footer i,main span footer span");
    for(let i = 0;i<node.length;i++)
        node[i].classList.add('lazy');
    var imgs = document.querySelectorAll('img');
    function getTop(e) {
        let T = e.offsetTop;
        while(e = e.offsetParent) {
            T += e.offsetTop;
        }
        return T;
    }
    function lazyLoad(imgs) {
        let H = document.documentElement.clientHeight;
        let S = document.documentElement.scrollTop || document.body.scrollTop;
        for (let i = 0; i < imgs.length; i++) {
            if (H + S > getTop(imgs[i])) {
                if(imgs[i].getAttribute('Data-src')){
                    imgs[i].src = imgs[i].getAttribute('Data-src');
                }
            }
        }
        for(let i = 0;i<node.length;i++){
            if(H + S > getTop(node[i]))
                node[i].classList.remove('lazy');
        }
    }
    lazyLoad(imgs);
    window.addEventListener('scroll',function () {
        lazyLoad(imgs);
    });
}

