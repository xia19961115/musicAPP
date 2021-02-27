import Vue from 'vue'
import Vuex from 'vuex'

import {getMusicUrl,getMusicLyric} from '../common/api/Api.js'
import MusicUtils from '../common/utils/musicStorage.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		//播放歌曲的列表
		playerList: [],
		//播放歌曲的索引值
		currentPlaySongIndex: 0,
		//播放地址
		audioSrc: '',
		//歌词
		songLyric: '',
		//创建一个音频
		audioContext: null,
		//歌名
		name:'',
		//图片
		pic:'https://img.yzcdn.cn/vant/cat.jpeg',
		//作者
		author:'',
		//歌曲总时间
		duration:0,
		//获取当前歌曲的位置
		currentTime: 0,
		//设置定时器
		timer: null,
		//开关器
		isPlayingState: false,
		//标签
		modeNum:2, // 顺序播放
		modeIcon: 'icon-icon--',
		modeAliIcon: [
			{
				icon: 'icon-danquxunhuan-copy',
				name: '单曲循环'
			},
			{
				icon: 'icon-icon--1-copy',
				name: '随机播放'
			},
			{
				icon: 'icon-icon--',
				name: '顺序播放'
			}
		],
	},
	getters:{
		getSongLyric(state){
			return state.songLyric
		},
		getName(state){
			return state.name
		},
		getPic(state){
			return state.pic
		},
		getAuthor(state){
			return state.author
		},
	},
	mutations:{
		setPlayerList(state,payload){
			state.currentPlaySongIndex =payload.index
			state.playerList=payload.list
			// console.log(payload.index);
		},
		//播放歌曲
		playSong(state){
			// state.audioContext.src = state.audioSrc
			state.audioContext.play()
			state.audioContext.onPlay(()=>{
				console.log('播放啦')
			})
			state.audioContext.onCanplay(()=>{
				state.timer= setTimeout(()=>{
					clearTimeout(state.timer)
					if(state.audioContext.duration === 0){
						state.duration = state.audioContext.duration
					}else{
						state.duration = state.audioContext.duration
						// console.log(state.duration);
						clearTimeout(state.timer)
						state.audioContext.onTimeUpdate(()=>{
							state.currentTime = state.audioContext.currentTime
							// console.log(state.currentTime);
						})
					}
				})
			})
		},
		//创建音频
		setAudioContext(state){
			state.audioContext = uni.createInnerAudioContext();
		},
		//暂停
		pauseSong(state){
			if(state.isPlayingState){
				state.isPlayingState = !state.isPlayingState
			}
			state.audioContext.pause()
		},
		//图标number值
		setModeNum(state,n){
			state.modeNum = n
		},
		//图标的名字
		setModeIcon(state,iconIndex){
			state.modeIcon = state.modeAliIcon[iconIndex].icon
		},
		setCurrentPlaySongIndex(state,index){
			state.currentPlaySongIndex = index
			// 防止刷新
			// MusicUtils.setLocalStorageSongPlayList(index,'currentPlaySongIndex')
		},
	},
	actions:{
		//请求歌曲地址
		async getMusicUrl({commit,state},payload){
			try{
				const {
					id,
					name,
					author,
					pic
				}=payload
				// console.log(id)
				//发送请求 获取音乐的播放地址
				const res = await getMusicUrl(id)
				// console.log(res[1])
				const data =res[1].data.data
				//判断版权
				if(data.length && data[0].url){
					//设置播放音乐的地址
					state.audioSrc =data[0].url
					state.audioContext.src = data[0].url
					//返回的参数没用 歌名, 作者,图片 使用对象的方法添加
					data[0].name = name
					data[0].author =author
					data[0].pic = pic
					
					
					state.name = name
					state.author =author
					state.pic = pic
					// console.log(data)
					//当前这一首歌曲的数据
					// MusicUtils.setLocalStorageSongPlayList(data,'playerList')
					return true
				}else{
					return false
				}

				
				
			}catch(e){
				console.log(e);
			}
		},
		//请求歌词
		async getMusicLyric({commit,state},id){
			try{
				const res = await getMusicLyric(id)
				// console.log(res[1].data.lrc.lyric)  这里歌词对的
				
				const result = res[1].data
				//判断歌曲有没有歌词
				if( result.lrc ){
					state.songLyric = result.lrc.lyric
					// 当在播放页面刷新之后，也能播放
					// const data = MusicUtils.getLocalStorageSongPlayList('playlist')
					// data[0]['songLyric'] = result.lrc.lyric
					// MusicUtils.setLocalStorageSongPlayList(data,'playlist')
				}else{
					//无歌词
					state.songLyric = '[00:00:000] 纯音乐 无歌词'
				}
				
			}catch(e){
				console.log(e);
			}
		}
		
		
	}
})

export default store