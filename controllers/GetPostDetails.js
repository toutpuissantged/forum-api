

    function PostDetailsGet(res){
        let postid=String()
        postid = parseInt(res.params.id)
        console.log(postid);
        // res.send('id is '+postid)
        return postid
    }

module.exports=PostDetailsGet