import View from './View'
import HomePage from '../../pages/Home/'
import HeaderComponent from '../../components/Header/'
import FooterComponent from '../../components/Footer'

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle(`Главная`)
  }

  async mounted() {}

  mount() {
    return `
    ${HeaderComponent}
    ${HomePage}
    ${FooterComponent}
    `
  }
}
