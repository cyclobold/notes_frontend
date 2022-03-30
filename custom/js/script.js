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