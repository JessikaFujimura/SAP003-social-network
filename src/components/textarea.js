function TextArea(props) {
  const template = `
  <textarea 
  class="${props.class}-textarea" 
  placeholder="${props.placeholder}"></textarea>
  `;
  return template;
}
export default TextArea;
