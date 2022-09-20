const install = (Vue, vm) => {

	// 是否登录
	let Logintoken = () => {
		// 没有token 跳回登录
		const token = vm.vuex_token;
		if (!token) {
			vm.$u.toast('未登录，请登录');
			var pages = getCurrentPages(); //所有页面
			var page = pages[pages.length - 1]; //拿到 来源页 （当前页）
			uni.setStorageSync('pageUrl', page.route) //储存 

			let option = page.options; //拿到 当前页参数 // {id :	1}
			const pageoptionkey = Object.keys(option); // 当前页 参数的key		  [id]
			const pageoptionval = Object.values(option); //当前页  参数的 val
			let params = '';
			if (pageoptionkey.length > 0) {
				// 1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
				//    2、currentValue （数组中当前被处理的元素）
				//    3、index （当前元素在数组中的索引）
				//    4、array （调用 reduce 的数组）
				params = pageoptionkey.reduce((previousValue, currentValue, index, array) => {
	 return previousValue + currentValue + '=' + option[currentValue] + '&'.slice(0, -1)
	  //   		?				id		    =		1
				}, '?');
			}
			console.log(params, 'params'); //拿到 当前页参数拼接完成
			setTimeout(() => {
				vm.$u.route({
					url: 'pages/auth/login',
					type: 'redirect'
				});
			}, 2000);
			return false;
		}
		return true
	}
	// 因为vm就是this，也即this.$u.api)下
	vm.$u.util = {
		Logintoken
	}


}
export default {
	install
}
