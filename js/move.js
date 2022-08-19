
function move(obj,attr, target, speed,callback,changeVal) {
	//关闭上一个定时器
	clearInterval(obj.timer);
	
	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {
        if(attr=="width"){
            var oldValue = obj.offsetWidth;
        }
        else if(attr=="height"){
            var oldValue = obj.offsetHeight;
        }
		else if(attr=="left"){
			var oldValue = obj.offsetLeft;
		}

		//在旧值的基础上增加
		let newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			// console.log(newValue);
		//动画执行完毕，调用回调函数
		callback && callback();
		changeVal && changeVal();
		}

	}, 10);
}








