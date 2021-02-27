export default {
	setLocalStorageSongPlayList(data,playlist='playerList'){
		uni.setStorageSync(playlist,data)
	},
	getLocalStorageSongPlayList(playlist='playerList'){
		return uni.getStorageSync(playlist) || []
	}
}