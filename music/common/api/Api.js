// 一 发现页面
const baseUrl = 'http://h5sm.com:8088'

// 1. 轮播图
export function getBanner(url) {
	return uni.request({
		url: baseUrl+url
	})
}

// 2. 精品 歌单  推荐歌单
export function getPersonalized8() {
	return uni.request({
		url: baseUrl+'/personalized?limit=8'
	})
}

// 3. 每日推荐歌单

export function getRecommendSongSheet(cat='华语',offset=1) {
	return uni.request({
		url: baseUrl + '/top/playlist?limit=39&order=hot&cat='+cat+'&offset='+offset*39
	})
}



// 二 视频
// 4. 视频 分类

export function getVideoCate() {
	return uni.request({
		url: baseUrl + '/video/category/list'
	})
}

// 5. 视频分类对应的 视频列表
export function getVideoCatePlayList(id) {
	return uni.request({
		url: baseUrl + '/video/group?id='+id
	})
}

// 6. 获取视频 播放地址
export function getVideoCatePlayUrl(id) {
	return uni.request({
		url: baseUrl + '/video/url?id='+id
	})
}


//  三 分类
// 7. 每日推荐歌曲
export function getTodayRecommendSongList() {
	return uni.request({
		url: baseUrl + '/recommend/songs'
	})
}

// 8. 歌单 cate
export function getHomeSongSheetsCate() {
	return uni.request({
		url: baseUrl + '/playlist/hot'
	})
}

// 9. 歌单 详情
export function getHomeSongSheetsDetail(id) {
	return uni.request({
		url: baseUrl + '/playlist/detail?id='+id
	})
}


// 10. 排行榜 内容
export function getRankList() {
	return uni.request({
		url: baseUrl + '/toplist/detail'
	})
}

// 11. 电台
export function getHomeDjRecommend() {
	return uni.request({
		url: baseUrl + '/dj/category/recommend'
	})
}

// 12
export function getHomeDjToplist() {
	return uni.request({
		url: baseUrl + '/dj/program/toplist/hours?limit=30'
	})
}


// 四 搜索
// 13 热搜榜
export function getSearchHotDetail() {
	return uni.request({
		url: baseUrl + '/search/hot/detail'
	})
}

// 14 你可能感兴趣
export function getSearchMultimatch(keywords) {
	return uni.request({
		url: baseUrl + '/search/multimatch?keywords='+keywords
	})
}

// 15 搜索 关键词
export function getSearchKeywords(keywords) {
	return uni.request({
		url: baseUrl + '/search?keywords='+keywords+'&limit=15'
	})
}

// 16 搜索建议 下拉列表

export function getSearchSuggest(keywords) {
	return uni.request({
		url: baseUrl + '/search/suggest?keywords='+keywords+'&type=mobile'
	})
}


// 五 登录
// 17 检查 是否已经注册  只处理注册了的 登录
export function getCheckTelReg(phone) {
	return uni.request({
		url: baseUrl + '/cellphone/existence/check?phone='+phone
	})
}

// 18 登录
export function PostLogin(username,password) {
	return uni.request({
		url: baseUrl + `/login/cellphone?phone=${username}&password=${password}`
	})
}

// 19 退出登录

export function getLogout() {
	return uni.request({
		url: baseUrl + '/logout'
	})
}


// 六  播放

export function getMusicUrl(id) {
	return uni.request({
		url: baseUrl + '/song/url?id='+id
	})
}

export function getMusicLyric(id) {
	return uni.request({
		url: baseUrl + '/lyric?id='+id
	})
}


export const lyc = "[00:00.000] 作曲 : 罗大佑 [00:01.000] 作词 : 罗大佑 [00:15.898]让青春吹动了你的长发让它牵引你的梦 [00:24.088]不知不觉这城市的历史已记取了你的笑容 [00:30.837]红红心中蓝蓝的天是个生命的开始 [00:39.017]春雨不眠隔夜的你曾空独眠的日子 [00:47.070]让青春娇艳的花朵绽开了深藏的红颜 [00:56.090]飞去飞来的满天的飞絮是幻想你的笑脸 [01:03.696]秋来春去红尘中谁在宿命里安排 [01:10.380]冰雪不语寒夜的你那难隐藏的光采 [01:16.177]看我看一眼吧莫让红颜守空枕 [01:25.048]青春无悔不死永远的爱人 [01:32.900]让流浪的足迹在荒漠里写下永久的回忆 [01:41.397]飘去飘来的笔迹是深藏的激情你的心语 [01:49.198]前尘红世轮回中谁在声音里徘徊 [01:58.797]痴情笑我凡俗的人世终难解的关怀 [02:38.519]看我看一眼吧莫让红颜守空枕 [02:46.498]青春无悔不死永远的爱人 [02:53.557]让青春吹动了你的长发让它牵引你的梦 [03:02.670]不知不觉这城市的历史已记取了你的笑容 [03:10.668]红红心中蓝蓝的天是个生命的开始 [03:19.170]春雨不眠隔夜的你曾空独眠的日子 [03:26.277]春雨不眠隔夜的你曾空独眠的日子 [04:07.297] "





