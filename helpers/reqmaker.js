
function requetmake(lists){
    let req=''
    const lists_len=lists.length
    for (let index = 0; index < lists.length; index++) {
        const list=lists[index] 
        req+=''+list
        if (index==lists_len-1) {
            continue
        }
        req+=','
        
    }
    console.log(req);
    return req
}

module.exports=requetmake