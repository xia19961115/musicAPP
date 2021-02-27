<template>
	<view>
		<video
			class="video"
			:poster="poster"
			:src="video.url"
			object-fit='cover'
			v-if="poster != ''"
			controls
			show-mute-btn
			enable-play-gesture
		></video>
	</view>
</template>

<script>
	import {getVideoCatePlayUrl} from '@/common/api/Api.js'
	export default {
		props: ['poster','vid'],
		data() {
			return {
				video:{}
			};
		},
		created() {
			//有ID 在发送请求
			this.vid && this.handleGetVideoCatePlayUrl(this.vid)
		},
		methods:{
			//发送请求
			handleGetVideoCatePlayUrl: async function (id){
				try{
					const result = await getVideoCatePlayUrl(id)
					// console.log(result[1].data.urls)
					//数据有长度再 挂载
					const list =result[1].data.urls.length && result[1].data.urls[0]
					this.video =list
				}catch(e){
					console.log(e);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.video{
	width: 100%;
	height: 300rpx;
	border-radius: 40rpx;
	overflow: hidden;
}
</style>
