import './styles.scss'
import TreePage from './index.html'
import TreeLeft from './TreeComponents/TreeLeft/'
import TreeCenter from './TreeComponents/TreeCenter/'
import TreeRight from './TreeComponents/TreeRight/'
import htmlToElement from '../../utils/htmlToElement'

const treePage = htmlToElement(TreePage)

treePage.innerHTML = `
    ${TreeLeft}
    ${TreeCenter}
    ${TreeRight}
`

export default treePage.outerHTML
