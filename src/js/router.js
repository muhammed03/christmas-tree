import Home from './views/Home' // HOME PAGE
import Toys from './views/Toys' // TOYS PAGE
import Tree from './views/Tree' // TREE PAGE

const pathRegex = (path) => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`)

const getParams = (match) => {
  const values = match.result.slice(1)
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1])

  return Object.fromEntries(keys.map((key, i) => [key, values[i]]))
}

const router = async () => {
  const routes = [
    { path: '/', View: Home },
    { path: '/toys', View: Toys },
    { path: '/tree', View: Tree },
  ]

  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathRegex(route.path)),
  }))

  let match = potentialMatches.find((potentialMatch) => potentialMatch.result != null)

  if (!match) {
    match = { route: routes[0], result: [window.location.pathname] }
    window.location.pathname = '/'
  }

  const view = new match.route.View(getParams(match))

  document.querySelector('#app').innerHTML = view.mount()
  view.mounted()

  const tabLinks = document.querySelectorAll('.header__menu-link')
  tabLinks.forEach((link) => {
    if (link.href == window.location) {
      link.classList.add('active-link')
    }
  })
}

const navigateTo = (url) => {
  window.history.pushState(null, null, url)
  router()
}

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault()
      navigateTo(e.target.href)
    }
  })
  router()
})
