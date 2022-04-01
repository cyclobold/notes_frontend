const createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", function(e){
    e.preventDefault();

    let postTitle = createPostForm.post_title.value.trim();

    let postSummary = createPostForm.post_summary.value.trim();

    let postContent = createPostForm.post_content.value.trim();


    if(postTitle.length == 0 || postSummary.length == 0 || postContent.length == 0){
        //do nothing
        alert("Post title, summary and content are required");   
    }else{
        //carry on 
       const params = {
            postTitle: postTitle,
            postSummary: postSummary,
            postContent: postContent
        }
        axios.post("http://localhost:4000/create-post", params).then(function(feedback){

            console.log(feedback);

            if(feedback.data.code === "success"){
                //alert(feedback.data.message);

                let toastCode = `<div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
                <div id="toast-id" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
                  <div class="toast-header bg-success text-white">
                    <strong class="mr-auto">Success</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="toast-body">
                    ${feedback.data.message}
                  </div>
                </div>
              </div>`;

              let toastElementDiv = document.createElement("div");

              toastElementDiv.innerHTML = toastCode;

             document.body.appendChild(toastElementDiv);

            $("#toast-id").toast('show');



                //close the modal
                //createPostModal = document.querySelector("#create-post-modal");

                $('#create-post-modal').modal("hide");
            }

        })

    }


})



window.onload = function(){

  axios.get("http://localhost:4000/get-posts").then((feedback) =>{
    let postsContents =  document.querySelector("#posts-contents");
        result = feedback.data.data;

        for(let i = 0; i < result.length; i++){
          code = `<div class="col-md-6">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary">World</strong>
                <h3 class="mb-0">${result[i].post_title}</h3>
                <div class="mb-1 text-muted">Nov 12</div>
                <p class="card-text mb-auto">${result[i].post_summary}</p>
                <a href="#" class="stretched-link">Continue reading</a>
              </div>
              <div class="col-auto d-none d-lg-block">
                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      
              </div>
            </div>
          </div>`;

          postsContents.innerHTML += code;


        }
    
    console.log(feedback);


  })

}