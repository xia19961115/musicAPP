<template>
	<view>
		<!-- 顶部导航栏 -->
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">搜索</block>
		</cu-custom>
		
		<!-- 搜索栏目 -->
		<view class="cu-bar search list-style" id="customtop" :style="{top:top+'px'}" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="搜索歌曲" confirm-type="search" @input="handleInput" 
				v-model="title"
				@confirm="onKeyInput"
				></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round"
				@click="secrhList()"
				>搜索</button>
			</view>
		</view>
		<!--撑开内容区域 -->
		<view :style="{height:bottom-top+'px'}">
		</view>
		<!-- 搜索提示内容区 -->
		<view class="search-song-name-list"  v-if="isSearch" :style="{top: bottom+'px'}">
			<view
				class="list"
				v-for="(item,index) in selectList"
				:key='index'
				@click="handleSearchKeyword(item.keyword)"
			>
				<icon type="search" size="12"/>
				<text>{{item.keyword}}</text>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>搜索历史</view>
				<view @click="removeStorage()"><image src="/static/searchend.svg" mode="widthFix"></image></view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		
		<!-- 搜索提示内容结果区 -->
		<view class="seach-content" 
		v-for="(item,index) in searchLists" 
		:key='item.id'
		v-if="!show"
		@click="handleGoToPlayPage(index,item.id,item.name,(item.artists&&item.artists[0]['name']) || (item.ar&&item.ar[0]['name']),item.al?(item.al && item.al.picUrl) || item.album.artist.img1v1Url:'https://img.yzcdn.cn/vant/cat.jpeg')"
		>
			<view class="seach-content-text">
				<text class="text-1">{{item.name}}</text>
				<text class="text-2">歌手:{{item.artists[0].name}}</text>
			</view>
			<view class="font-size">
				<text class="lg text-gray cuIcon-video"></text>
			</view>
		</view>
		<!-- 热搜榜 -->
		<view class="HotSearchList" v-if="show">
			<view class="hot-search-cate">热搜榜</view>
			<view class="hot-search-cate-ul">
				<view  class="hot-search-cate-li"
				v-for="(item,index) in searchHotLists" :key="index">
					<view class="hot-search-info">
						<text :class="['order',index<3?'active':'']">{{index+1}}</text>
						<view class="hot-song">
							<view class="hot-song-name" :class="index<3?'fontW':''">
								{{item.searchWord}}
								<van-icon :name="item.iconUrl"/>
							</view>
							<view class="hot-song-des">{{item.content}}</view>
						</view>
					</view>
					<text class="host-song-playCount">{{item.score}}</text>
				</view >
			</view >
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapActions} from"vuex"
	
	
	import {getSearchSuggest,getSearchKeywords,getSearchHotDetail} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				searchHotLists:[],
				bottom:'',
				top:'',
				selectList:[],
				isSearch:true,
				searchLists:[],
				show:true,
				title:'',
				ifhistory:false,
				setdata:[]
			};
		},
		onLoad() {
			this.handleGetSearchHotDetail()
		},
		//当页面滚动的时候 自动关闭
		onPageScroll() {
			this.isSearch=false
		},
		beforeMount() {
			this.setStorage()
		},
		mounted() {
			//获取搜索栏 的底部高度
			const query = uni.createSelectorQuery().in(this);
			query.select('#customtop').boundingClientRect()
			query.exec((res)=>{
				console.log(res[0].bottom);
				console.log(res[0].top);
				this.bottom =res[0].bottom
				this.top=res[0].top
			})
		},
		methods:{
			//搜索关键字
			handleInput: async function (e){
				// console.log(e.detail.value);
				const keyword = e.detail.value.trim()
				//当用户没有输入内容的时候
				if(keyword===''){
					this.isSearch = false
					this.show = false
					// console.log('没有输入歌名',keyword);
					return
				}
				//有内容的时候发送请求
				try{
					const result = await getSearchSuggest(keyword)
					// console.log(result[1].data.result.allMatch)
					const list =result[1].data.result.allMatch
					this.selectList =list
					//判断 有长度现实
					if(list.length){
						this.isSearch = true
					}
				}catch(err){
					console.log(err);
				}
			},
			//热搜榜数据请求
			handleGetSearchHotDetail: async function(){
				try{
					const result = await getSearchHotDetail()
					// console.log(result[1].data.data);
					const list = result[1].data.data
					this.searchHotLists = list
				}catch(e){
					console.log(e);
				}
			},
			//关键字搜索
			handleSearchKeyword: async function(keyword){
				try{
					const result = await getSearchKeywords(keyword)
					// console.log(result[1].data.result.songs)
					this.searchLists=result[1].data.result.songs
					this.getStorage(keyword)
					this.ifhistory=false
					this.isSearch = false
					this.show = false
				}catch(e){
					console.log(e);
				}
			},
			//点击搜索案件触发
			secrhList(){
				if(this.title.trim()===""){
					return
				}
				this.ifhistory=false
				this.handleSearchKeyword(this.title)
				this.getStorage(this.title)
			},
			//手机键盘事件
			onKeyInput(e){
				if(e.detail.value.trim()===""){
					return
				}
				this.ifhistory=false
				this.handleSearchKeyword(e.detail.value)
				this.getStorage(e.detail.value)
			},
			//本地存入搜索历史
			getStorage(key){
				//先取出本地缓存数据
				let seararray = uni.getStorageSync('search') || []
				// //存入在数组中
				seararray.unshift(key)
				uni.setStorageSync('search',seararray);
			},
			//取出本地缓存数据
			setStorage(){
				let setdata = uni.getStorageSync('search')
				let setdataarr = Array.from(new Set(setdata))
				if(setdataarr == ''){
					this.ifhistory = false
				}else{
					this.setdata = setdataarr
					this.ifhistory = true
				}
			},
			//清除本地缓存
			removeStorage(){
				uni.removeStorageSync('search');
				this.ifhistory=false
			},
			//点击搜索历史发送请求
			menubtn(item){
				this.ifhistory=false
				this.handleSearchKeyword(item)
			},
			
			// ====================
			...mapMutations(['playSong']),
			...mapActions(['getMusicLyric']),
			handleGoToPlayPage: async function(index,id,name,author,pic){
				//共享当前状态
				this.$store.commit('setPlayerList',{
					// 绑定index是让数据在数据中心能知道下一首
					index,
					//知道对应页面的歌曲列表
					list:this.searchLists
				})
				//请求
				const r = await this.$store.dispatch('getMusicUrl',{
					id,name,author,pic
				})
				if( !r ){
					uni.showToast({
						title: '此歌曲无版权，无法播放',
						icon: 'none',
					})
					return
				}
				//获取歌词
				await this.getMusicLyric(id)
				//播放音乐
				await this.playSong()
				//跳转放页面
				await uni.navigateTo({
					url:"/pages/home/player"
				})
			},
				// ====================
				
			
		},
		//检测input输入框的内容为空的时候  返回热搜榜单 
		watch:{
			title(newval,oldval){
				// console.log(newval);
				if(newval.trim()===""){
					this.show=true

					}
			},
			
			
		},
	}
</script>

<style lang="scss" scoped>
	.search-history {
		margin: 20rpx;
	}
	
	.search-title {
		font-size: 30rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.search-title image {
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	
	.menu-block view {
		background: #f7f8fa;
		border-radius: 6rpx;
		font-size: 27rpx;
		color: #292c33;
		text-align: center;
		padding: 10rpx;
		margin: 20rpx 20rpx 0 0;
	}
	
	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	
	
	.list-style{
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
	}
	.seach-content{
		height: 90rpx;
		// border: 1px solid black;
		margin: 20rpx 20rpx 0 ;
		display: flex;
		justify-content: space-between;
		.seach-content-text{
			display: flex;
			flex-direction: column;
			margin-right: 40rpx;
			.text-1{
				margin-top: 5rpx;
				font-size: 30rpx;
				overflow: hidden;
				// white-space: nowrap;
				// text-overflow: ellipsis;
			}
			.text-2{
				margin-top: 20rpx;
				font-size: 24rpx;
				color: grey;
			}
		}
		.font-size{
			font-size: 24px;
			line-height: 90rpx;
		}
	}
	.search-song-name-list{
	        position: fixed;
	        left: 30rpx;
	        top: -100rpx;
	        z-index: 999;
	        width: 600rpx;
	        background-color: #fff;
	        box-shadow: 0 0 20rpx 2rpx rgba(0,0,0,0.2);
			color: #000;
			
	        .list {
	            padding-left: 25rpx;
	            border-bottom: 1rpx solid #eee;
	            height: 88rpx;
	            display: flex;
	            align-items: center;
	
	            font-size: 30rpx ;
	
	             text{
	                margin-left: 20rpx;
	            }
	        }
	    }
	
	
	.HotSearchList {
		margin-top: 40rpx;
	
		.hot-search-cate {
			font-size: 36rpx;
			font-weight: bold;
			padding-left: 30rpx;
		}
	
		.hot-search-cate-ul{
			margin-top: 20rpx;
			padding: 0 30rpx;
	
			.hot-search-cate-li{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
	
				.hot-search-info {
					display: flex;
					align-items: center;
	
					.order {
						font-size: 30rpx;
						font-weight: 600;
						color: #aaa;
	
						&.active {
							color: #ce4f51;
						}
					}
	
					.hot-song {
						margin-left: 30rpx;
	
						.hot-song-name {
							font-size: 34rpx;
	
							margin-bottom: 10rpx;
	
							&.fontW {
								font-weight: bold;
							}
	
							img {
								width: 60rpx;
								height: 30rpx;
							}
						}
	
						.hot-song-des {
							font-size: 20rpx;
							color: #aaa;
						}
					}
				}
	
				.host-song-playCount {
					font-size: 20rpx;
					color: #aaa;
				}
			}
		}
	}
</style>
