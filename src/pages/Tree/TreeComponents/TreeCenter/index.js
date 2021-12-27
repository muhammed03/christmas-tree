import TreeCenter from './index.html'
import Garland from './garland.html'
import './style.scss'
import './garland.scss'

import htmlToElement from '../../../../utils/htmlToElement'

const treeCenter = htmlToElement(TreeCenter)
const garland = htmlToElement(Garland)

const mainCenterContainer = treeCenter.querySelector('.main__center-container')

mainCenterContainer.append(garland)

export default treeCenter.outerHTML
