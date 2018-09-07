var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
$(function () {
	// 检查插件是否已经安装过
	var iRet = WebVideoCtrl.I_CheckPluginInstall();
	if (-2 == iRet) {
		alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
		return;
	} else if (-1 == iRet) {
		alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
		return;
	}

	// 初始化插件参数及插入插件
	WebVideoCtrl.I_InitPlugin("100%", "100%", {
		bWndFull: true, //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
		iWndowType: 1, //分屏类型：1- 1*1，2- 2*2，3- 3*3，4- 4*4，默认值为 1，单画面,
	});

	//嵌入播放插件
	WebVideoCtrl.I_InsertOBJECTPlugin("myVideo");

	// 检查插件是否最新
	if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
		alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
		return;
	}
	
	 login();
	 alert("开始预览")//中间需要停顿加载一下，否则会异常
	 playVideo();
});

//登陆
function login() {

var IP = "192.168.1.100",
		Port = 80,
		Username = "admin",
		Password = "ccwc2631";
		Prototocol = 1; //http 协议，1 表示 http 协议 2 表示 https 协议

	if ("" == IP || "" == Port || "" == Username || "" == Password) {
		console.log("信息不能为空!");
		return;
	}

	var iRet = WebVideoCtrl.I_Login(IP, Prototocol, Port, Username, Password, {
		success: function (xmlDoc) {
			console.log(IP + " 登录成功！");
		},
		error: function () {
			console.log(IP + " 登录失败！");
		}
	});

	if (-1 == iRet) {
		console.log(IP + " 已登录过！");
	}
}

//预览视频
function playVideo() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		ip ="192.168.1.100";
		info = "";

	if ("" == ip) {
		return;
	}

	if (oWndInfo != null) { // 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}
	
	var iRet = WebVideoCtrl.I_StartRealPlay(ip);//s开始预览

	if (0 == iRet) {
		info = "开始预览成功！";
	} else {
		info = "开始预览失败！";
	}

	console.log(ip + " " + info);
}
