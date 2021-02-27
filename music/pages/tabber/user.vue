<template>
	<view class="user">
		<view class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			
			<!-- 应用栏 -->
			<cu-custom bgColor="bg-gradual-orange">
				<block slot="content">个人中心</block>
			</cu-custom>	
			<!-- 应用栏 -->
			
			<!-- 默认显示 登录/注册按钮 -->
			<view class="cu-list menu-avatar" v-if="showLoginBtn"  @tap="showModal" data-target="viewModal">
				<view class="cu-item">
					<view class="cu-avatar round lg" style="background-image:url(https://img3.doubanio.com/icon/u164546053-1.jpg);"></view>
					<view class="content">
						<view class="text-grey">登录/注册</view>
					</view>
					<view class="action text-gray">
						<view class="cuIcon-settingsfill"></view>
					</view>
				</view>
			</view>
			<!-- 默认显示 登录/注册按钮 -->
			
			<!-- 默认不显示 用户信息 -->
			<view v-if="!showLoginBtn">
				
				<!-- 头像 -->
				<view class="cu-list menu menu-avatar"  
					@tap="handleAvatar"
					data-target="DialogModal1"
				>
					<view class="cu-item arrow">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+userInfo.avatar+')'}]"></view>
						<view class="content">
							<view class="text-grey">头像</view>
						</view>
						
					</view>
				</view>
				<!-- 头像 -->
				
				<!-- 选择头像的 ui组件 -->
				<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">选择头像</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="">
							<view class="cu-bar bg-white margin-top">
								<view class="action">
									选择头像
								</view>
								<view class="action">
									{{imgList.length}}/1
								</view>
							</view>
							<view class="cu-form-group">
								<view class="grid col-4 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
									 <image class="cu-tag bg-red" :src="imgList[index]" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'></text>
										</view>
									</view>
									<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
										<text class='cuIcon-cameraadd'></text>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
								<button class="cu-btn bg-green margin-left" @tap="handleImgUpload">确定</button>
				
							</view>
						</view>
					</view>
				</view>
				<!-- 选择头像的 ui组件 -->
				
				<!-- 其他用户信息 -->
				<view class="cu-list menu  ">
					<view class="cu-item arrow" style="margin-bottom: 2rpx;">
						<view class="content">
							<text class="cuIcon-github text-grey"></text>
							<text class="text-grey">昵称</text>
						</view>
						<view class="action text-grey">
							{{userInfo.nickname}}
						</view>
					</view>
					<view class="cu-item arrow" style="margin-bottom: 2rpx;">
						<view class="content">
							<text class="cuIcon-github text-grey"></text>
							<text class="text-grey">性别</text>
						</view>
						<view class="action text-grey">
							{{userInfo.gender}}
						</view>
					</view>
					<view class="cu-item arrow" >
						<view class="content">
							<text class="cuIcon-github text-grey"></text>
							<text class="text-grey">年龄</text>
						</view>
						<view class="action text-grey">
							{{userInfo.age}}
						</view>
					</view>
					
					<view class="cu-item " @tap="handleExitLogin">
						<view class="content">
							<text class="cuIcon-friend text-grey"></text>
							<text class="text-grey">退出</text>
						</view>
						<view class="action text-grey">
							<text class="cuIcon-exit text-grey"></text>
						</view>
					</view>
				</view>
				<!-- 其他用户信息 -->
			</view>
			<!-- 默认不显示 用户信息 -->
		</view>
		
		<!-- 抽屉打开时的阴影 -->
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<!-- 抽屉打开时的阴影 -->
		
		
		<!-- 抽屉打开时左边 登录注册组件 -->
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				
				
				<form @submit="handleFormSubmit">
					<view class="face-wapper">
						<image src="/static/img/default-face.png" class="face"></image>
					</view>
					
					<view class="info-wapper">
						<label class="words-lbl">账号</label>
						<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
					</view>
					
					<view class="info-wapper" style="margin-top: 40rpx;">
						<label class="words-lbl">密码</label>
						<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
					</view>
					
					<button type="primary" form-type="submit" style="margin-top: 60rpx;width: 90%;">注册 / 登录</button>
				</form>
				
				<view class="third-wapper" >
					
					<view class="third-line">
						<view class="single-line">
							<view class="line"></view>
						</view>
						
						<view class="third-words">第三方账号登录</view>
						
						<view class="single-line">
							<view class="line"></view>
						</view>
					</view>
					
					<view class="third-icos-wapper">
						<image src="/static/img/QQ.png" data-logintype="qq" @click="handleQQLogin" class="third-ico" ></image>
					</view>
					
				</view>
			</view>
		</scroll-view>
		<!-- 抽屉打开时左边 登录注册组件 -->
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				StatusBar: 0,
				modalName:null, 
				showLoginBtn: true, // 是否要显示登录按钮
				// 用户信息
				userInfo: {
					avatar: 'http://h5sm.com/static/sexy.jpg',
				}, 
				imgList: [], // 选择头像
			};
		},
		onLoad() {
			// 加载页面 就获取用户信息
			this.getStorageUserInfo()
			// console.log(this.userInfo);
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			// 1.加载页面 就获取用户信息 
			getStorageUserInfo(){
				const self =this
				//先判断用户有没有登录过
				const isLogin = uni.getStorageSync('isLogin')
				//如果为1 已经登录过了
				if( isLogin === 1){
					//让登录/注册按钮 消失
					self.showLoginBtn=false
					//再去获取用户的信息
					const userInfo = uni.getStorageInfoSync('globalUser')
					// 获取的用户信息重新赋值
					self.userInfo = userInfo
				}
			},
			//2.进行注册,将信息发送到后端
			handleFormSubmit(e){
				const self =this
				const username = e.detail.value.username
				const password = e.detail.value.password
				//模拟正则表达式,进行注册
				if( username.length < 3 || username.length > 10 ){
					uni.showToast({
						icon: 'none',
						title: '帐号 3~10个字符'
					})
					return;
				}
				if( password.length <3 || password.length >15 ){
					uni.showToast({
						icon: 'none',
						title: '密码 3~15个字符'
					})
					return;
				}
				//发送请求   POST请求  看后端的接口
				uni.request({
					url: 'https://h5sm.com/uni/users/loginAndRegister',
					data:{username,password},
					method:"POST",
					//执行回掉
					success(res) {
						// console.log(res);
						if(res.statusCode===200){
							if(res.data.status===1){
								uni.setStorageSync('isLogin',res.data.status)
								//调用自动更新数据函数 更新视图
								self.updateUserInfo(res.data.msg)
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: '/static/img/error.png',
									})
							}
						}else{
							uni.showToast({
								title: '服务端错误',
								icon: '/static/img/error.png'
							})
						}
						
					},
					fail(err) {
						uni.showToast({
							title: '网络异常，请重试',
							icon: 'none'
						})
					}
					
				})
				
			},
			//3 注册后数据进行自动更新
			updateUserInfo(obj){
				const self = this
				// console.log(obj);
				const renderUserInfo ={
					avatar: obj.avatar,
					nickname: obj.nickname,
					age: obj.age,
					gender: obj.gender,
					uuid: obj.uuid,
				}
				//将获取到的数据保存到全局APP中
				app.globalData.userInfo = renderUserInfo
				uni.setStorageSync('globalUser',renderUserInfo)
				self.hideModal()
				self.userInfo = renderUserInfo
				self.showLoginBtn = false
			},
			//4 退出按钮(清除缓存)
			handleExitLogin(){
				try{
					uni.clearStorageSync()
					this.showLoginBtn = true
				}catch(e){
					console.log(e);
				}
				
			},
			//点击头像 弹出模态框
			handleAvatar(e){
				this.modalName = e.currentTarget.dataset.target
				// console.log(e);
			},
			//调用相册选择图片
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			//浏览图片
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			//删除图片
			DelImg(e) {
				uni.showModal({
					title: '删除此图片',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//提交上传图片
			handleImgUpload(){
				const self = this
				const picList = this.imgList
				//获取最后一张图片
				const pic = picList[picList.length-1]
				uni.uploadFile({
					url: 'https://h5sm.com/uni/users/actionAvatar',
					filePath: pic,
					name: 'pic',
					formData: {
						uuid: self.userInfo.uuid
					},
					success: (res) => {
						if( res.statusCode == 200 ){
							console.log(res);
							// console.log('上传成功');
							self.hideModal()
							const info = JSON.parse(res.data)
							if( info.status == 1 ){
								const userInfo = self.userInfo
								//将userInfo的头像重新赋值
								userInfo['avatar'] = info.msg.avatar
								//将数据重新挂载
								self.userInfo = userInfo
								//调用自动更新函数
								self.updateUserInfo(userInfo)
								//最后去空图片列表的数据
								self.imgList = []
							}
							return
						}
						uni.showToast({
							title: '请检查网络'
						})
					},
					fail: (err) => {
						uni.showToast({
							title: err.message
						})
					}
				})
			},
			// qq 一键QQ登录
			handleQQLogin(){
				const self =this
				uni.login({
					provider:'qq',
					success() {
						uni.getUserInfo({
							provider:"qq",
							success(res) {
								// console.log(res.userInfo);
								// const avatar = res.userInfo.avatarUrl
								// const nickname =res.userInfo.nickname
								// const age =	res.userInfo.age
								// const gender =res.userInfo.gender
								// const openId =res.userInfo.openId
								// const gender_type =res.userInfo.gender_type
								const data={
									avatar:res.userInfo.avatarUrl,
									nickname:res.userInfo.nickname,
									age:res.userInfo.age,
									gender:res.userInfo.gender_type,
									qq_openid:res.userInfo.openId,
								}
								// console.log(datas);
								uni.request({
									url:'https://h5sm.com/uni/users/QQloginAndRegister',
									data,
									method:"POST",
									success(res) {
										// console.log(res);
										if(res.statusCode===200){
											if(res.data.status==1){
												uni.setStorageSync('isLogin',res.data.status)
												uni.setStorageSync('globalUser',res.data.msg)
												self.updateUserInfo(res.data.msg)
											}
										}
										// uni.setStorageSync('isLogin',res.data.status)
									}
								})
							}
							
						})
					}
				})
			},
			
		},
	}
</script>

<style lang="scss">
	.user{
		overflow: hidden;
	}
	
	
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}
	
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}
	
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100rpx 0;
	}
	
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	
	.DrawerPage .nav {
		flex: 1;
	}
	
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
	
	
	/* 登录注册 */
	
	/* 头像 */
	.face-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom: 120rpx;
	}
	
	.face {
		width: 160rpx;
		height: 160rpx;
	}
	/* 头像 */
	
	/* 注册登录 start */
	.info-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		
		border-bottom: solid 1px #DBDBDA;
		
		padding-bottom: 20rpx;
	}
	
	.words-lbl {
		color: #808080;
	}
	
	.input {
		width: 500rpx;
		margin-left: 40rpx;
	}
	
	.graywords {
		color: #EAEAEA;
	}
	
	/* 第三方登录 start */
	.third-wapper {
		width: 100%;
		/* 固定底部 */
		/* bottom: 0;
		position: fixed; */
		
		margin-top: 60rpx;
		
	}
	
	.third-line {
		display: flex;
		flex-direction: row;
		justify-content: center
	}
	
	.third-words {
		color: #A9A9A9;
		font-size: 13px;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.single-line {
		padding: 15rpx 20rpx;
		width: 25%;
		align-items: center;
	}
	
	.third-icos-wapper {
		margin-top: 30rpx;
		
		display: flex;
		flex-direction: row;
		justify-content: center
	}
	
	.third-ico {
		width: 60rpx;
		height: 60rpx;
	}
	
	/* 登录注册 */
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
