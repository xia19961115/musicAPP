<template>
	<view class="RankPage">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">歌单广场</block>
		</cu-custom>
		
		
		<view class="rankSheet">
			<view class="rankTitle"> 官方榜 </view>
			<view
				class="rank-song-sheet"
				v-for="(item,index) in rankLists"
				:key="item.id"
				v-if="item.tracks&&item.tracks.length"
				@click="handleClick(item.id,item.name)"
			>
				<view class="rank-song-item">
					<view class="rank-pic">
						<image
							mode="aspectFill"
							:src="item.coverImgUrl"
						></image>
						<view class="tips">{{item.updateFrequency}}</view>
					</view>

					<view class="rank-name-list">
						<view class="song-name"
							v-for="track in item.tracks"
							 :key="track.second"
						>
							{{track.first}} - {{track.second}}

						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getRankList} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				rankLists: []
			};
		},
		onLoad() {
			this.handleGetRankList()
		},
		methods:{
			handleGetRankList: async function(){
				try{
					const result = await getRankList()
					// console.log(list[1].data.list)
					const list = result[1].data.list
					this.rankLists = list
				}catch(err){
					console.log(err);
				}
				
			},
			handleClick (id,name){
				uni.navigateTo({
					url:'/pages/home/songslist?id='+id+'&name='+name
				})
			}
		},
	}
</script>

<style lang="scss">

.RankPage{
    height: 100vh;
    background: radial-gradient(ellipse,#fff 0,#eee 100%);

    .rankSheet{
        padding: 0 30rpx;

        .rankTitle{
            padding: 14rpx 0;
            font-size: 32rpx;
            font-weight: bold;
        }

        .rank-song-sheet{
            margin-bottom: 20rpx;

            .rank-song-item{
                display: flex;

                color: #666;
                font-size: 26rpx;

                .rank-pic{
                    width: 196rpx;
                    height: 196rpx;
                    position: relative;
                    border-radius: 10rpx;
                    overflow: hidden;
					
					image{
						height: 100%;
						height: 100%;
					}

                    .tips{
                        position: absolute;
                        left: 10rpx;
                        bottom: 13rpx;
                        font-size: 20rpx;
                        color: #fff;
                        opacity: 0.9;
                    }
                }

                .rank-name-list{
                    display: inherit;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-left: 15rpx;
                }
            }

        }

    }
}
</style>

