function PostCard(props) {
  const template = `
  <li data-id=${props.dataId} class="card">
    <div class = "card-time">
    <p>${props.time}</p>
    <p class = "card-name">${props.name}</p>
    </div>
    <p class = "card-post">${props.post}</p>
  </li>
  `;
  return template;
}
export default PostCard;
