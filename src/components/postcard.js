function PostCard(props) {
  const template = `
  <li data-id=${props.dataId} class="card">
    <p class = "card-time">${props.time}</p>
    <p class = "card-name">${props.name}</p>
    <p class = "card-post">${props.post}</p>
  </li>
  `;
  return template;
}
export default PostCard;
