<template>
	<view class="category">
		<view class="gridview" v-for="(item,index) in cate" :key="item.id" @click="handleSwitchTopPage(item.path)">
			<view class="icon">
				<text :class="['iconfont','ali-icon',item.icon]"></text>
			</view>
			<view class="title">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate: [{
					id: 1,
					name: '每日推荐',
					icon: 'icon-rili2',
					path: '/pages/home/songslist'
				}, {
					id: 2,
					name: '歌单',
					icon: 'icon-SongListgedan',
					path: '/pages/home/songsheet'
				}, {
					id: 3,
					name: '排行榜',
					icon: 'icon-paihangbang-copy',
					path: '/pages/home/rank'
				}, {
					id: 4,
					name: '电台',
					icon: 'icon-luyinjishouyinjidiantai',
					path: '/pages/home/dj'
				}]
			};
		},
		methods: {
			handleSwitchTopPage: function(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		height: 146rpx;
		padding: 0 28rpx;
		margin: 20rpx 0;

		display: flex;
		font-size: 24rpx;

		.gridview {

			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			.icon {
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
				background: linear-gradient(to left, #ff5e4d, #e62626);
				display: inherit;

				.ali-icon {
					margin: auto;
					font-size: 55rpx;
					color: #eee;
				}
			}
		}
	}
</style>
