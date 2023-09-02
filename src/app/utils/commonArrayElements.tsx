const commonArrayElements = (arr_1: Array<string>, arr_2: Array<string>): number => {
	let count = 0;
	for(var i = 0; i < arr_1.length; i++){
		for(var j = 0; j < arr_2.length; j++){
			if(arr_1[i] == arr_2[j]){
				count++;
			}
		}
	}
	return count;
}

export default commonArrayElements;