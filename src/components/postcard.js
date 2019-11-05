function PostCard(props) {
    const template = `
    <li data-id=${props.id} class="card">
      <p class = "card-time">${props.time}</p>
      <p class = "card-name">${props.name}</p>
      <p class = "card-post">${props.post}</p>
    </li>
    `;
    return template;
}
window.PostCard= PostCard;
export default PostCard;
