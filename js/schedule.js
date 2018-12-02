//
//  schedule.js
//
//  Created by LY on 11/07/2018.
//


/*
 * @function 操作data对象
 * @param prop(string) key
 * 		  val(json对象) value
 * 		  jsonOb(json对象) 总数据对象
 * @return jsonOb(json对象) 修改过的总数据对象
 */
function createJson(prop, val, jsonOb) {
	// 如果 val 被忽略
	if(typeof val === "undefined") {
		// 删除属性
		delete jsonOb[prop];
	}
	else {
		// 添加 或 修改
		jsonOb[prop] = val;
	}
	return jsonOb;
}
/*
 * @function 获取某对象的进度
 * @param aData(json对象) 一个时间表的数据
 * @return status(int) 进度
 */
function getStatus(aData) {
	if (aData["type"] == 1) {
		// 时间类型
			let now = new Date();
			let nowData = {
				// 获取当前时间
				"year": now.getFullYear(),
				"month": now.getMonth()+1,
				"day": now.getDate(),
				"hour": now.getHours(),
				"minute": now.getMinutes(),
				"second": now.getSeconds(),
			}
			let all = DateDiff(aData["time"]["start"], aData["time"]["end"]);
			let present = DateDiff(aData["time"]["start"], nowData);
			let toEnd = DateDiff(aData["time"]["end"], nowData);
		
			let status = parseInt(present*100/all);
			let statusCheck = status > 100 ?  100 : status;
			
			if (statusCheck === 0) status = 0;
			else if (!statusCheck) statusCheck = 100;
		
			return {"status": statusCheck, "toEnd": toEnd, "now": nowData};
	}
	else if (aData["type"] == 2) {
		// 自定义类型
		let all = Math.abs(aData["time"]["end"]  -  aData["time"]["start"]);
		let present = Math.abs(aData["time"]["now"]  -  aData["time"]["start"]);
		let toEnd = Math.abs(aData["time"]["end"]  -  aData["time"]["now"]);
		let status = parseInt(present*100/all);
		let statusCheck = status > 100 ?  100 : status;
		
		return {"status": statusCheck, "toEnd": toEnd};
		
	}
	else if (aData["type"] == 3) {
		let all = 0;
		let present = 0;
		for (var modelName in aData["sectionData"]) {
			if (aData["sectionData"][modelName]["isFinished"]) {
				present += 1;
			}
			all += 1;
		}
		let toEnd = all - present
		let status = parseInt(present*100/all);
		let statusCheck = status > 100 ?  100 : status;
		
		return {"status": statusCheck, "toEnd": toEnd, "now": present};
	}
	else {
		return {"status": 100, "toEnd": 0};
	}

}

/*
 * @function 计算两个时间的相差天数
 * @param data1(json对象) 时间1
 * 		  data2(json对象) 时间2
 * @return days(int) 差值天数
 */
function DateDiff(sDate1, sDate2){ 
       var oDate1, oDate2, iDays;  
       oDate1  =  new  Date(sDate1["year"], sDate1["month"], sDate1["day"], sDate1["hour"], sDate1["minute"], sDate1["second"]);    //转换为12-18-2006格式  
       oDate2  =  new  Date(sDate2["year"], sDate2["month"], sDate2["day"], sDate2["hour"], sDate2["minute"], sDate2["second"]);  
       iDays  =  parseInt(Math.abs(oDate2  -  oDate1)  /  1000);    //把相差的毫秒数转换为天数  
       return  iDays;
   }    


/*
 * @function 生成随机id
 * @param 无
 * @return id(string) 随机id
 */
function getId() {
	var id="";  //随机id
	for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
	{
		id += Math.floor(Math.random()*10);
	}
	id = new Date().getTime() + id;  //时间戳，用来生成随机id。
	return id;
}

/*
 * @function 添加一个时间表
 * @param newSchedule(json对象) 时间表数据对象
 * @return code(string) 状态码 1:成功, -1:失败, -2:参数错误
		   describe(string) 描述
 */
function addSchedule(newSchedule) {
	if (!newSchedule) { 
		//参数合法性验证
		return {"code": "-2", "describe": "参数错误"}
	}
	let id = getId(); //获取随机id
	let _data = {}; //初始化_data
	
	try {
		_data = uni.getStorageSync('data'); //尝试获取数据
	} catch (e) {
		return {"code": "-1", "describe": "获取数据失败"}
	}
	
	if(!_data) _data = {};
	_data = createJson(id, newSchedule, _data); //将新数据添加到json对象中

	try {
		uni.setStorageSync('data', _data); //尝试写入数据
	} catch (e) {
		return {"code": "-1", "describe": "添加数据失败"}
	}
	
	return {"code": "1", "describe": "添加成功"}
}

/*
 * @function 修改时间表
 * @param id(string) 需要修改的对象id
 * 		  schedule(json对象) 时间表数据对象
 * @return code(string) 状态码 1:成功, -1:失败, -2:参数错误
		   describe(string) 描述
 */
function changeSchedule(id, schedule) {
	if (!schedule || !id) { 
		//参数合法性验证
		return {"code": "-2", "describe": "参数错误"}
	}
	
	let _data = {}; //初始化_data

	try {
		_data = uni.getStorageSync('data'); //尝试获取数据
	} catch (e) {
		return {"code": "-1", "describe": "获取数据失败"}
	}
	
	if(!_data) _data = {};
	
	if (!_data[id]) {
		return {"code": "-2", "describe": "该时间表不存在"}
	}
	
	_data = createJson(id, schedule, _data); //在json对象中修改数据
	
	try {
		uni.setStorageSync('data', _data); //尝试写入数据
	} catch (e) {
		return {"code": "-1", "describe": "修改数据失败"}
	}
	
	return {"code": "1", "describe": "修改成功"}
}

/*
 * @function 删除时间表
 * @param id(string) 需要删除的对象id
 * @return code(string) 状态码 1:成功, -1:失败, -2:参数错误
		   describe(string) 描述
 */
function deleteSchedule(id) {
	if (!id) { 
		//参数合法性验证
		return {"code": "-2", "describe": "参数错误"}
	}
	
	let _data = {}; //初始化_data

	try {
		_data = uni.getStorageSync('data'); //尝试获取数据
	} catch (e) {
		return {"code": "-1", "describe": "获取数据失败"}
	}
	
	if(!_data) _data = {};
	
	if (!_data[id]) {
		return {"code": "-2", "describe": "该时间表不存在"}
	}
	
	_data = createJson(id, undefined, _data) //从json对象中删除数据 
	
	try {
		uni.setStorageSync('data', _data); //尝试写入数据
	} catch (e) {
		return {"code": "-1", "describe": "删除数据失败"}
	}
	
	return {"code": "1", "describe": "删除成功"}
}

/*
 * @function 获取全部时间表
 * @param 无
 * @return _data(json对象) 全部时间表
 */
function getAllSchedule() {
	let _data = {}; //初始化_data

	try {
		_data = uni.getStorageSync('data'); //尝试获取数据
	} catch (e) {
		return {} //出错则返回空
	}
	
	if(!_data) _data = {};
	
	for (var id in _data) {
		let status = getStatus(_data[id]); //获取进度
		_data[id]["status"] = status;
	}
	return _data;
}

/*
 * @function 获取单个时间表
 * @param id(string) 需获取的时间表id
 * @return _data[id](json对象) 单个时间表
 */
function getOneSchedule(id) {
	let _data = {}; //初始化_data
	
	try {
		_data = uni.getStorageSync('data'); //尝试获取数据
	} catch (e) {
		return {} //出错则返回空
	}
	
	if(!_data) _data = {};
	let status = getStatus(_data[id]); //获取进度
	_data[id]["status"] = status;
	
	return _data[id];
}

export {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule}