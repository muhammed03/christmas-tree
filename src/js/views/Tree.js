import View from './View'
import HeaderComponent from '../../components/Header/'
import TreePage from '../../pages/Tree/'
import FooterComponent from '../../components/Footer/'
import FilterToys from '../service/FilterToys'
import snowFlake from '../helper/snowflake'

const filterToys = new FilterToys()

export default class extends View {
  constructor(params) {
    super(params)
    this.setTitle(`Елка`)
  }

  setBackground(bgImgSrcName) {
    this.treeSettings.backgroundNumber = bgImgSrcName
    localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))

    document.querySelector('.main__center').style.backgroundImage = `url(assets/bg/${bgImgSrcName}.jpg)`
  }

  setTreeImg(treeImgSrcName) {
    this.treeSettings.treeNumber = treeImgSrcName
    localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))

    document.querySelector('.selected-tree').src = `assets/tree/${treeImgSrcName}.png`
  }

  setGarland(garlandType) {
    this.treeSettings.garlandType = garlandType
    localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))


    const garlandSwitcherInput = document.getElementById('garland-controller-input');
    if (this.treeSettings.isGarlandOn) {
      garlandSwitcherInput.checked = true;
    } else {
      garlandSwitcherInput.checked = false;
    }

    let garlandLiItems = document.querySelectorAll('.garland-ul')

    if (this.treeSettings.isGarlandOn) {
      garlandLiItems.forEach((el) => {
        el.className = 'garland-ul'
        el.classList.add(garlandType)
      })
    } else {
      garlandLiItems.forEach((el) => {
        el.className = 'garland-ul'
        el.classList.remove(garlandType)
      })
    }
  }


  layoutToysContainer() {
    const toysListContainer = document.querySelector('.toys-list__container')
    const toysData = filterToys.getDefaultToys()

    toysData.forEach((el) => {
      const toysListItem = document.createElement('div')
      toysListItem.classList.add('toys-list__item')
      toysListItem.classList.add('centered')

      const toyQuantity = Number(el.count)

      const toyQuantitySpan = document.createElement('span')
      toyQuantitySpan.classList.add('toys-list__quantity')
      toyQuantitySpan.innerText = toyQuantity
      toyQuantitySpan.id = el.num + '-in-order'

      for (let i = 0; i < toyQuantity; i++) {
        const toyImg = document.createElement('img')
        toyImg.classList.add('toys-list__img')
        toyImg.classList.add('draggable')
        const currentNum = i + 1
        toyImg.style.zIndex = currentNum
        toyImg.src = `assets/toys/${el.num}.png`
        toyImg.setAttribute('default-place', `${el.num}`)
        toyImg.setAttribute('draggable', 'true')
        toysListItem.append(toyImg)
      }
      toysListItem.append(toyQuantitySpan)
      toysListContainer.append(toysListItem)
    })
  }

  dragEvent() {
    const toysListContainer = document.querySelector('.toys-list__container')

    let positionX = 0
    let positionY = 0
    let isDraggedOver = false
    const area = document.getElementById('map-area')

    const draggables = document.querySelectorAll('.draggable')
    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', (e) => {
        e.preventDefault()
        const dragging = draggable
        const dragParent = draggable.parentElement
        let defualtPlace = dragging.getAttribute('default-place')
        if (isDraggedOver) {
          dragParent.removeChild(draggable)
          area.appendChild(dragging)
          const draggingHeight = dragging.getBoundingClientRect()
          dragging.style.top = positionY - 60 + 'px'
          dragging.style.left = positionX - 60 + 'px'
          positionX = 0
          positionY = 0
          isDraggedOver = false
        } else {
          dragging.style.top = 'auto'
          dragging.style.left = 'auto'
          toysListContainer.children[Number(defualtPlace) - 1].appendChild(dragging)
        }

        dragging.classList.remove('dragging')
        const childrensNumber = toysListContainer.children[Number(defualtPlace) - 1].children.length - 1
        this.setRightQuantity(defualtPlace, childrensNumber)
      })
    })

    document.addEventListener(
      'drop',
      function (event) {
        // prevent default action (open as link for some elements)
        event.preventDefault()
        // move dragged elem to the selected drop target
        if (event.target.id == 'map-area') {
          isDraggedOver = true
        } else {
          isDraggedOver = false
        }
      },
      false
    )

    const map = document.getElementById('map')
    map.addEventListener('dragover', (e) => {
      e.preventDefault()
      positionX = e.offsetX
      positionY = e.offsetY
    })
  }

  setRightQuantity(idx, quantity) {
    const quantitySpan = document.getElementById(`${idx}-in-order`)
    quantitySpan.innerText = quantity
  }

  audioControl() {
    const playAudioBtn = document.getElementById('play-audio-btn')
    const audio = document.getElementById('audio')

    playAudioBtn.addEventListener('click', () => {
      if (this.treeSettings.isAudioPlaying) {
        audio.pause()
        playAudioBtn.classList.remove('ma-audio-checked')
        playAudioBtn.classList.add('ma-audio')
        this.treeSettings.isAudioPlaying = false
      } else {
        audio.play()
        playAudioBtn.classList.remove('ma-audio')
        playAudioBtn.classList.add('ma-audio-checked')
        this.treeSettings.isAudioPlaying = true
      }

      localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))
    })
  }

  loadAudio() {
    const playAudioBtn = document.getElementById('play-audio-btn')
    const audio = document.getElementById('audio')

    if (this.treeSettings.isAudioPlaying) {
      audio.play()
      playAudioBtn.classList.remove('ma-audio')
      playAudioBtn.classList.add('ma-audio-checked')
    } else {
      audio.pause()
      playAudioBtn.classList.remove('ma-audio-checked')
      playAudioBtn.classList.add('ma-audio')
    }
  }

  generateSnowFlake() {
    document.body.appendChild(snowFlake)
  }

  controlSnowFlake() {
    const snowBtn = document.getElementById('snow-btn')
    const snowFlakeContainer = document.querySelector('.snowflakes')
    snowBtn.addEventListener('click', () => {
      snowFlakeContainer.classList.toggle('display-none')
      if (this.treeSettings.isSnowFalling) {
        snowBtn.classList.remove('ma-snow-checked')
        snowBtn.classList.add('ma-snow')
        this.treeSettings.isSnowFalling = false
      } else {
        snowBtn.classList.add('ma-snow-checked')
        snowBtn.classList.remove('ma-snow')
        this.treeSettings.isSnowFalling = true
      }

      localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))
    })
  }

  loadSnowFlake() {
    const snowBtn = document.getElementById('snow-btn')
    const snowFlakeContainer = document.querySelector('.snowflakes')
    if (this.treeSettings.isSnowFalling) {
      snowBtn.classList.add('ma-snow-checked')
      snowBtn.classList.remove('ma-snow')
      snowFlakeContainer.classList.remove('display-none')
    } else {
      snowBtn.classList.remove('ma-snow-checked')
      snowBtn.classList.add('ma-snow')
      snowFlakeContainer.classList.add('display-none')
    }
  }

  events() {
    const backgroundListContainer = document.querySelector('.background-list__container')
    backgroundListContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('background-list__item')) {
        let bgSrcId = event.target.id
        let bgImgSrcName = bgSrcId[bgSrcId.length - 1]
        this.setBackground(bgImgSrcName)
      }
    })

    const treeListContainer = document.querySelector('.tree-list__container')
    treeListContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('tree-list__item') || event.target.classList.contains('tree-list__img')) {
        let treeSrcId = event.target.id
        let treeImgSrcName = treeSrcId[treeSrcId.length - 1]
        this.setTreeImg(treeImgSrcName)
      }
    })

    const garlandBtnContainer = document.querySelector('.garland-list__container')
    garlandBtnContainer.addEventListener('click', (event) => {
      this.treeSettings.isGarlandOn = true;
      switch (event.target.id) {
        case 'red-gr':
          this.setGarland('red-garland')
          break
        case 'blue-gr':
          this.setGarland('blue-garland')
          break
        case 'yellow-gr':
          this.setGarland('yellow-garland')
          break
        case 'green-gr':
          this.setGarland('green-garland')
          break
      }
    })

    const garlandSwitcherInput = document.getElementById('garland-controller-input')
    garlandSwitcherInput.addEventListener('change', () => {
      if (garlandSwitcherInput.checked) {
        this.treeSettings.isGarlandOn = true;
        console.log("checked")
      } else {
        this.treeSettings.isGarlandOn = false;
      }
      this.setGarland(this.treeSettings.garlandType);
      localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))
    })

    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', () => {
      this.treeSettings = {
        treeNumber: '1',
        backgroundNumber: '1',
        garlandType: 'red-garland',
        isGarlandOn: false,
        isSnowFalling: false,
        isAudioPlaying: false,
      };
      localStorage.setItem('treeSettings', JSON.stringify(this.treeSettings))

      this.setBackground(this.treeSettings.backgroundNumber)
      this.setTreeImg(this.treeSettings.treeNumber)
      this.setGarland(this.treeSettings.garlandType)
      this.loadSnowFlake()
      this.loadAudio()
    })
  }

  async mounted() {
    this.events()
    this.setBackground(this.treeSettings.backgroundNumber)
    this.setTreeImg(this.treeSettings.treeNumber)
    this.setGarland(this.treeSettings.garlandType)
    this.audioControl()
    this.generateSnowFlake()
    this.controlSnowFlake()
    this.loadSnowFlake()
    this.loadAudio()
    this.layoutToysContainer()
    this.dragEvent()
  }

  mount() {
    return `
      ${HeaderComponent}
      ${TreePage}
      ${FooterComponent}
    `
  }
}
