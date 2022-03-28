const createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", function(e){
    e.preventDefault();

    let postTitle = createPostForm.post_title.value.trim();

    let postSummary = createPostForm.post_summary.value.trim();

    let postContent = createPostForm.post_content.value.trim();


    if(postTitle.length == 0 || postSummary.length == 0 || postContent.length == 0){
        //do nothing
    }else{
        //carry on 
       const params = {
            postTitle: postTitle,
            postSummary: postSummary,
            postContent: postContent
        }
        axios.post("http://localhost:4000/create-post", params).then((feedback) =>{
            //continue from here..
            console.log(feedback);

        })

    }


})