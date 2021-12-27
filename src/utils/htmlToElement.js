export default function HtmlToElement(htmlString) {
  const template = document.createElement('template')
  template.innerHTML = htmlString
  return template.content.firstChild
}
