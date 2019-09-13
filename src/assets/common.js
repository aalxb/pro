// 获取URL的查询参数
//q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;

export const ownerIdVerify = (id) => {
	let chars = id.split("");
	let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	let code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
	let sum = 0;
	for (let i = 0; i < 17; i++){
		sum += parseInt(chars[i] * factor[i]);
	}
	sum %= 11;

	return id + code[sum];
};

export const getObjectId = (o) => {
	return o && o._id ? o._id.$oid:null;
};

export const formatTimestamp = (time = +new Date(), type) => {
	let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
	if( type == 'long' ){
		return date.toJSON().substr(0, 19).replace('T', ' ');
	} else {
		return (date.toJSON().substr(0, 19).replace('T', ' ')).split(" ")[0];
	}

};
