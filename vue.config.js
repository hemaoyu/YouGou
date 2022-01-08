module.exports = {
	// 配置开发服务器
	devServer: {
		// 代理
		proxy:{
			// https://www.uinav.com
			// 代理段
			"/uinav":{
				// 代理到地址
				target:"https://www.uinav.com",
				changeOrigin: true,
				secure:true,
				pathRewrite:{
					"^/uinav":""
				}
			}
		}
	}
}