let baseURL = 'https://virezaey.lc-cn-n1-shared.com'
export const $http = function(url,method='GET',data={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseURL+url,
			method,
			header:{
				"X-LC-Id":"vIrEzAeyFWR6BohOXdiIKSPz-gzGzoHsz",
				"X-LC-Key":"3aIxYcpniIjQjB7BL9hrkbhc",
				"Content-Type": "application/json"
			},
			data,
			success: (res) => {
				resolve(res.data)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}

export const $get = function(url,data={}){
	return $http(url,'GET',data)
}
export const $post = function(url,data={}){
	return $http(url,'POST',data)
}

  