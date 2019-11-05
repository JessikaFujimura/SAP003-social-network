function Button(props) {
  const template = `
    <button
      class="${props.class}-button"
      type="submit"
      data-id=${props.id}
      onclick="button.handleClick(event, ${props.onClick})" >
      ${props.title}
    </button>
  `;
  return template;
}
window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
};
window.Button = Button;
export default Button;
