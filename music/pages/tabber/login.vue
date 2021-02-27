<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange">
			<block slot="content">个人中心</block>
		</cu-custom>
		<!-- 没有登录的组件-->
		<view v-if="show">
			<form @submit="handleSubmit">
				<view class="cu-form-group margin-top">
					<image src="/static/icon/user.png" mode="aspectFill"></image>
					<input placeholder="请输入手机号" name="phone"></input>
				</view>
				<view class="cu-form-group">
					<image src="/static/icon/password.png" mode="aspectFill"></image>
					<input placeholder="请输入密码" name="password" password="true"></input>
				</view>
				
				<button  type="default" form-type="submit" class="bg-gradual-orange">登录</button>
			</form>
		</view>
		<!-- 已经登录的组件 -->
		<view v-if="!show">
		<view class="my-name" bgColor="bg-gradual-orange">
			<view class="my-img">
				<image :src="datalist.avatarUrl"></image>
			</view>
			<view class="my-text">
				<text>{{datalist.nickname}}</text>
			</view>
		</view>
		<button @click="handleLogout" type="primary">退出</button>
		</view>
	</view>
</template>

<script>
import {getCheckTelReg,PostLogin,getLogout} from '@/common/api/Api.js'
	
	var validate = require("../../common/validate.js");
	export default {
		data() {
			return {
				phoneRegex: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
				passwordRegex: /^\w+$/,
				show:true,
				datalist:{}
			};
		},
		onLoad() {
			this.getStorageUserInfo()
		},
		methods: {
			handleSubmit: async function(e){
				const self = this
				const formData = e.detail.value
				var rule = [
					{
						name: 'phone',
						rules: ['require', ['regex', this.phoneRegex]],
					},
					{
						name: 'password',
						rules: ['require', ['min', 6],['regex', this.passwordRegex]],
					},
				];
				// 是否全部通过，返回Boolean
				validate.check(formData, rule);
				// 获取错误信息
				const validate_arr =  validate.getError()
				
				if(!validate_arr.length){
					// 没长度 就是通过校验 符合规则
					const isReg = await getCheckTelReg(formData.phone)
					const isRegData = isReg[1]['data'].exist
					if( isRegData === -1 ){
						uni.showToast({
							icon: 'none',
							title: '请移步到网易云音乐注册吧~'
						})
						return
					}
					
					try{
						const login = await PostLogin(formData.phone,formData.password);
						const {profile:{nickname,avatarUrl,userId}} = login[1]['data'];
						self.datalist={
							nickname,
							avatarUrl
						},
						self.show =false,
						uni.setStorageSync("listtoken",self.datalist)
					}catch(err){
						console.log(err);
					}
					
					return
				}
				uni.showToast({
					title: validate_arr.join(),
					icon: 'none'
				})
				
			},
			handleLogout: function(){
				const self =this				 
					 uni.clearStorage()
					 getLogout()
					 self.show =true
					 uni.showToast({
					 	icon: 'none',
					 	title: '退出成功，请重新登录'
					 })
			},
			getStorageUserInfo:function(){
				const self = this 
				const useInfo = uni.getStorageSync('listtoken')
				// console.log(useInfo);
				// console.log(useInfo==="");
				if(useInfo===""){
					self.show =true
				}else{
					self.show =false
				}			
			}
		},
		
	}
</script>

<style lang="scss">
	.color{
		background-color: #ff3300;
	}
image{
	width: 40rpx;
	height: 40rpx;
	margin-right: 20rpx;
}

button{
	color: white;
}
// 

	.my-img image {
		width: 120rpx !important;
		height: 120rpx !important;
		border-radius: 50%;
		margin-right: 20rpx;
		border: 10rpx solid #999999;
	}

	text {
		display: block;
		margin: 10rpx 0;
		color: #999999;
	}

	.my-name {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		align-content: center;
		height: 200rpx;
		background: linear-gradient(to right, #Ff9700 10%, #Ed1c24 100%);
		height: 350rpx;
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		
	}

	.my-text text {
		font-size: 35rpx;
	}

</style>
