export default class {
  constructor(params) {
    this.params = params
    this.treeSettings = {}
    this.initialSettingsState = {
      treeNumber: '1',
      backgroundNumber: '1',
      garlandType: 'red-garland',
      isGarlandOn: false,
      isSnowFalling: false,
      isAudioPlaying: false,
    }
    this.getTreeSettingsFromStorage()
  }

  setTitle(title) {
    document.title = title
  }

  getTreeSettingsFromStorage() {

    let treeSettings = JSON.parse(localStorage.getItem(`treeSettings`)) || this.initialSettingsState

    this.treeSettings = treeSettings
  }

  mount() {
    return ''
  }
}
