<template>
	<view>
		<!-- 标签栏 -->
		<!-- <cu-custom bgColor="bg-gradual-purple" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">视频</block>
		</cu-custom> -->
		<!-- 滚动列表 -->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in videoCate" :key="index" @tap="tabSelect" 
			:data-id="index" 
			:data-vid="item.id">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 视频组件 -->
		<VideoList :vid ='vid'></VideoList>
	</view>
</template>

<script>
	import VideoList from '@/components/video/VideoList.vue'
	import {getVideoCate} from '@/common/api/Api.js'
	export default {
		components:{VideoList},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				videoCate:[],
				vid:58100
			};
		},
		onLoad() {
			this.handleVideoCate()
		},
		methods:{
			tabSelect: function(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				//获取列表对应的id
				this.vid =e.currentTarget.dataset.vid
				// console.log(this.vid);
				},
			// 请求滚动列表数据
			handleVideoCate: async function(){
				try{
					const result = await getVideoCate()
					// console.log(result[1].data.data)
					const list = result[1].data.data
					this.videoCate =list
					
				}catch(e){
					console.log(e);
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
// .videoplay{
//     padding: 0 30rpx 15rpx;
//     background-color: #fff;
//     margin: 25rpx 0;

//     .video-con {
//         height: 384rpx;
//         border-radius: 20rpx;
//         overflow: hidden;

//         .video{
//             object-fit: cover;
//         }
//     }

//     .title{
//         font-size: 20rpx;
//         color: #454545;
//         margin: 20rpx 0;

//         display: flex;
//         justify-content: space-between;
//         align-items: center;

//         /deep/ .arc-img{
//             width: 68rpx;
//             height: 68rpx;
//             border-radius: 50%;
//             border: 1rpx solid #ddd;
//             flex-shrink: 0;
//         }
//     }


//     .video-user{
//         display: flex;
//         justify-content: space-between;

//         .user-info{
//             display: inherit;
//             align-items: center;
//             .avatar{
//                 width: 56rpx;
//                 height: 56rpx;
//                 margin-right: 8rpx;
//             }

//             span{
//                 font-size: 22rpx;
//             }

//         }

//         .like{
//             display: inherit;
//             align-items: center;

//             & > div{
//                 margin-left: 35rpx;
//                 position: relative;

//                 i{
//                     font-size: 40rpx;
//                     color: #b9b9b9;
//                 }

//                 span{
//                     position: absolute;
//                     top: -14rpx;
//                     right: -24rpx;

//                     font-size: 20rpx;
//                 }
//             }
//         }
//     }
// }
</style>
