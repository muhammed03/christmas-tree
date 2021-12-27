import View from './View'
import HeaderComponent from '../../components/Header/'
import FooterComponent from '../../components/Footer'
import ToysPage from '../../pages/Toys'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle(`Игрушки`)
  }

  async mounted() {}

  mount() {
    return `
      ${HeaderComponent} 
      ${ToysPage}
      ${FooterComponent} 
      `
  }
}
