function PostCard(props) {
  const template = `
  <div data-id=${props.dataId} class="card">
    <div class = "card-time">
    <p>${props.time}</p>
    <p class = "card-name">${props.name}</p>
    </div>
    <p class = "card-post">${props.post}</p>
  </div>
  `;
  return template;
}
export default PostCard;
