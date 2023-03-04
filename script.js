const createPostBtn = document.getElementById('create-post-btn');
const main = document.querySelector('main');

const postFormTemplate = document.getElementById('post-form-template');
const postFormOverlay = postFormTemplate.content.querySelector('.post-form-overlay');
const postFormContainer = postFormTemplate.content.querySelector('.post-form-container');
const closePostFormBtn = postFormTemplate.content.getElementById('close-post-form-btn');
const publishBtn = postFormTemplate.content.getElementById('publish-btn');
const cancelBtn = postFormTemplate.content.getElementById('cancel-btn');
const postTitleInput = postFormTemplate.content.getElementById('post-title');
const postContentTextarea = postFormTemplate.content.getElementById('post-content');


let posts = [];

function renderPosts() {
  main.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div>
        <button data-id="${post.id}" class="edit-btn">Edit</button>
        <button data-id="${post.id}" class="delete-btn">Delete</button>
      </div>
    `;

    const editBtn = postElement.querySelector('.edit-btn');
    const deleteBtn = postElement.querySelector('.delete-btn');
    editBtn.addEventListener('click', editPost);
    deleteBtn.addEventListener('click', deletePost);

    main.appendChild(postElement);
  });
}

function showPostFormOverlay() {
  document.body.appendChild(postFormOverlay);
}

function hidePostFormOverlay() {
  postFormOverlay.remove();
}

function createPost() {
  const title = postTitleInput.value;
  const content = postContentTextarea.value;

  const id = Date.now();

  const post = {
    id,
    title,
    content
  };

  posts.push(post);

  hidePostFormOverlay();
  renderPosts();
}
function editPost(event) {
  const postId = event.target.dataset.id;
  const post = posts.find(post => post.id === Number(postId));
  postTitleInput.value = post.title;
  postContentTextarea.value = post.content;
  deletePost(event);
  showPostFormOverlay();
}

function deletePost(event) {
  const postId = event.target.dataset.id;
  posts = posts.filter(post => post.id !== Number(postId));
  renderPosts();
}


createPostBtn.addEventListener('click', showPostFormOverlay);
closePostFormBtn.addEventListener('click', hidePostFormOverlay);
publishBtn.addEventListener('click', createPost);
cancelBtn.addEventListener('click', hidePostFormOverlay);
