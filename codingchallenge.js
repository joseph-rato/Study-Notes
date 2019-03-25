// original 
// issues were A[index] was wrong cause you can't index into a number unfortuantely
// A.slice was wrong cause you can't slice a number unfortunately 
// A.length was wrong because you can't actually take the length of a number
// converting a string to a number is done by "something".toString()
// lastly only works on even numbers this way. need to use an additional if to determine to add the last number
function someMethod(A) {
    let ans = ""
    let halfWay = A.length / 2
    for (let i= 0; i < halfWay; i++){
        let endding = i + 1 * -1
        ans = ans + `${A[i]}` + `${A.slice(endding)[0]}`
    }
    return parseInt(ans)
}


// corrected 
function someMethod(A) {
    let ans = ""
	debugger
	let strNum = A.toStraing()
    let halfWay = strNum.length / 2
    for (let i= 0; i < halfWay; i++){
        let endding = (i + 1) * -1
        ans = ans + `${strNum[i]}` 
		if (strNum.length !== ans.length){
			ans = ans + `${strNum.slice(endding)[0]}`
        }
    }
    return parseInt(ans)
}

