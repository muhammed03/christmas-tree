import data from '../data/data'

export default class FilterToys {
  constructor(data) {
    this.data = data
  }

  getDefaultToys() {
    const defaultNumberOfToys = 20
    return data.slice(0, defaultNumberOfToys)
  }
}
