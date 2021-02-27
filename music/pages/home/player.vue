<template>
	<view class="PlayPage">
		<cu-custom :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{getName}}</block>
		</cu-custom>
		<view class="play-container">

			<!--圆盘-->
			<view v-if="!show" class="play-disc" @tap="handleshow">
				<view class="needle">
					<img class="rotate" width="100%" height="100%" src="static/img/needle.png" alt="">
				</view>
				<view class="disc play-disc-rotate">
					<view class="play-song-cover rount">
						<image mode="aspectFill" :src="getPic"></image>

					</view>
				</view>
			</view>
			<!--歌词-->
			<view v-if="show" class="lyric-wrap" @tap="handleshow">
				<view :style="{transform:`translate3d(0,-${getLine}px,0)`}">


					<view v-for="(item,index) in songLyricList" :key="index" :id="item.ms" :class="line === index ? 'active' : '' ">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>

		<!--音乐控制面板-->
		<view class="play-controls">
			<view class="play-time">
				<text class="current-time">{{currentTime|handleDate}}</text>
				<slider class="showlg-more"
				:value="currentTime"
				:max="duration"
				min='0'
				block-size='12'
				 ></slider>
				<text class="duration-time">{{duration|handleDate}}</text>
			</view>
			<div class="play-btn">
			<i :class="['iconfont', modeIcon]" @click="handlePlayMode"></i>							   
			<i :class="['iconfont','icon-shangyiqu101']" @click="handlePrev"></i>
			<i :class="['iconfont','icon-bofang-copy']" @click="handlePlay" ></i>
			<i :class="['iconfont','icon-zantingyanshi--copy']" @click="handlePause" ></i>
			<i :class="['iconfont','icon-xiayiqu101']" @click="handleNext"></i>	
			</div>
		</view>
		



	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations,
		mapActions,
		
	} from 'vuex'
	import MusicUtils from '../../common/utils/musicStorage.js'
	export default {
		data() {
			return {
				name: '',
				author: '',
				pic: '',
				songLyricList: '',
				line: 0,
				show:true,
				timer:null,
				
			};
		},
		computed: {
			...mapGetters(['getSongLyric', 'getName', 'getPic', 'getAuthor']),
			...mapState(['duration', 'currentTime','audioContext','modeNum','modeIcon','modeAliIcon','currentPlaySongIndex','playerList',]),
			getLine() {
				if (this.line > 5 && this.line < this.songLyricList.length - 5) {
					return (this.line - 5) * 29
				}
			},

		},
		onLoad() {
			this.handleEnterOperation()
			this.audioContext.onEnded(this.listenEnded)
		},
		filters: {
			//处理时间
			handleDate(v) {
				let m = 0,
					s = 0;
				m = Math.floor(v / 60) + ''
				m = m.length == 1 ? 0 + m : m

				// 取整！~~
				s = (v % 60 | 0) + ''
				s = s.length == 1 ? 0 + s : s

				return m + ':' + s
			}
		},

		methods: {
			...mapMutations(['pauseSong','playSong','setModeNum','setModeIcon','setCurrentPlaySongIndex']),
			...mapActions(['getMusicUrl','getMusicLyric',]),
			handleshow: function(){
				if(new Date()- this.timer<500 ) return
				this.timer =new Date()
				this.show= !this.show
			},
			//暂停
			handlePause: function(){
				this['pauseSong']()
			},
			//播放
			handlePlay: function(){
				this['playSong']()
			},
			//上一曲
			handlePrev:function(){
				this.handlePrevOrNext(-1)
			},
			//下一曲
			handleNext:function(){
				this.handlePrevOrNext(1)
			},
			//处理歌曲公用函数
			handlePrevOrNext: async function(n){
				//获取播放歌曲的索引值
				let currentIndex = this.currentPlaySongIndex
				//获取播放歌曲的列表
				const playerList = this.playerList.length && this.playerList
				//限制
				const index = (currentIndex + n < 0 ? playerList.length-1 : currentIndex + n) % playerList.length
				console.log(index);
				await this.setCurrentPlaySongIndex(index)
				const {
					id,
					name,
					ar,
					artists,
					al,
					album,
				} = playerList[index]
				const r = await this.getMusicUrl({
					id,
					name,
					author: ar ? ar[0]['name'] : artists[0]['name'],
					pic: al ? al['picUrl'] : album['artist']['img1v1Url'],
				})
				// console.log(r);
				if(!r){
					uni.showToast({
						title: '此歌曲无版权，无法播放',
						icon: 'none'
					})
					return 
				}
				await this.getMusicLyric(id)
				await this.playSong()
					
				this.handleEnterOperation()
				
			},
			//监听歌曲 是否结束
			listenEnded:function(){
				switch (this.modeNum) {
					case 0:
						this.handlePrevOrNext(0)
						break
					case 1:
						this.handlePrevOrNext(parseInt(this.playerList.length * Math.random()))
						break
					case 2:
						this.handlePrevOrNext(1)
						break
				}
			},
			//切换播放模式
			handlePlayMode :function(){
				let index = this.modeNum
				index = index + 1 
				index = index % 3
				this.setModeNum(index)
				this.setModeIcon(index)
				uni.showToast({
					title: this.modeAliIcon[index].name,
					icon: 'none'
				})
			},
			handleEnterOperation: function() {
				this.handleLyricStr(this.getSongLyric)
			},
			// 处理歌词
			handleLyricStr: function(lyric) {
				// console.log(lyric);
				// 歌词结构 [00:00.000] 作曲 : 罗大佑
				// 以"["切割 成为一个数组   00:00.000] 作曲 : 罗大佑
				let lrcArr = lyric.split('[')
				// console.log(lrcArr);
				let songLyricList = []
				for (let i = 0; i < lrcArr.length; i++) {
					// console.log(typeof lycArr[i]);
					//在进行切割 以"]" 来切割
					let arr = lrcArr[i].split(']')
					//返回结果为 ["00:00.000","作曲 : 罗大佑"]
					// console.log(arr[1]);
					//得到全部的歌词
					let text = arr[1]
					// console.log(text)
					//再切割 时间 以. 切割 除去毫秒
					let time = arr[0].split('.')
					//再以: 切割 分离 分 和 秒
					let timer = time[0].split(':')
					//在进行转换 都转为秒
					let ms = timer[0] * 60 + timer[1] * 1
					// console.log(ms);
					if (text && !isNaN(ms)) {
						songLyricList.push({
							text,
							ms
						})
					}
				}
				this.songLyricList = songLyricList
				// console.log(this.songLyricList);
			},
		},
		watch: {
			currentTime(newvla) {
				//转成整数
				newvla = parseInt(newvla)
				//判断 秒对应的时间
				let index = this.songLyricList.findIndex(function(item) {
					return item.ms === newvla
				})
				//当不等于-1 的时候就能够找到对应的值
				if (index !== -1) {
					//防止多次输出
					if (this.line !== index) {
						// console.log(index)
						this.line = index
					}


				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.PlayPage {
		position: relative;
		z-index: 9999;
	}

	.needle {
		width: 273rpx;
		height: 402rpx;
		/*border: 1rpx yellow solid;*/
		position: absolute;
		z-index: 99;
		left: 50%;
		top: -100rpx;

		img {
			/*border: 1rpx slateblue solid;*/
			transform: scale(0.5);
			transition: 1s;
			transform-origin: 44rpx 37rpx;
		}

		// img.rotate{
		//     transform: scale(0.5) rotate(-30deg);
		// }
	}

	@keyframes myRotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.play-disc-rotate {
		animation: myRotate 10s infinite linear;
	}


	.PlayPage {
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(135deg, rgb(142, 132, 133) 0%, rgb(230, 132, 110) 100%);
		display: flex;
		flex-direction: column;

		.play-nav-bar {
			padding-left: 40rpx;

			.leading {
				display: flex;
				align-items: center;

				.icon {
					color: #fff;
					font-size: 40rpx;
					margin-right: 35rpx;
				}

				.song-info {
					display: flex;
					flex-direction: column;
					padding: 20rpx 0;

					.song-name {
						color: #fff;
						font-size: 40rpx;
						margin-bottom: 8rpx;
					}

					.song-author {
						color: rgba(255, 255, 255, 0.4);
						font-size: 20rpx;
					}
				}
			}
		}

		.play-container {
			flex: 1;
			position: relative;
			/*border: 1rpx blue solid;*/

			.play-disc {
				width: 564rpx;
				height: 564rpx;
				background-color: rgba(255, 255, 255, 0.1);
				border-radius: 50%;

				position: absolute;
				left: calc((100% - 564rpx) / 2);
				top: calc((100% - 564rpx) / 2);

				display: flex;

				.disc {
					width: 546rpx;
					height: 546rpx;
					background: url("/static/img/disc.png");
					background-size: cover;

					margin: auto;

					display: flex;

					.play-song-cover {
						width: 370rpx;
						height: 370rpx;
						margin: auto;
						border-radius: 50%;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
				}
			}

			.lyric-wrap {
				position: absolute;
				width: 100%;
				height: 100%;
				background: linear-gradient(135deg, rgb(142, 132, 133) 0%, rgb(230, 132, 110) 100%);
				font-size: 30rpx;
				color: rgba(255, 255, 255, 0.5);
				text-align: center;
				overflow: hidden;



				view {
					font-size: 12px;
					height: 60rpx;
					line-height: 60rpx;
					transition: .5s;
					// white-space: pre-wrap;
					// background: hsla(0, 0%, 100%, .5) -webkit-linear-gradient(left, #fff, #fff) no-repeat 0 0;
					// -webkit-text-fill-color: transparent;
					// -webkit-background-clip: text;
					// background-size: 0 100%;

					&.active {
						color: rgba(255, 255, 255, 1);
						// animation: scan 3s linear;
					}
				}

			}
		}	
		// 歌词逐词滚动
		// @keyframes scan {
		// 	0% {
		// 		background-size: 0 100%;
		// 	}
		// 	100% {
		// 		background-size: 100% 100%;
		// 	}
		// }

		.play-controls {
			height: 220rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			/deep/ .van-slider__button {
				width: 12rpx;
				height: 12rpx;
			}

			.van-slider {
				margin: 0 20rpx;
			}

			.play-time {
				// border: 1px solid blue;
				color: #ddd;
				font-size: 20rpx;
				display: flex;
				padding: 15rpx 25rpx;
				align-items: center;
				justify-content: space-between;
			}

			.showlg-more {
				height: 20rpx;
				width: 80%;
			}

			.play-btn {
				color: #fff;
				display: flex;
				justify-content: space-around;

				i{
					font-size: 50rpx;
				}
			}
		}
	}
</style>
