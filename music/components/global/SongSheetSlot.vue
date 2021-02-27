<template>
	<view class="songsheetSlot">
		<slot name="songsheetCate"></slot>
		<slot name="songsheetItem"></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.songsheetSlot{
	margin: 20rpx 0;
}
</style>
