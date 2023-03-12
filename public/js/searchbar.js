import { getSearchedArticles } from './queries.js'
import Article from './models/article.js'

//CREER 2 EVENEMENTS D'ECOUTE POUR 2 ACTIONS DISTINCTES

const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button)

  // searchBar.onKeypress = checkEnter

  searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('show-search')
  })
}

toggleSearch('search-bar', 'search-button')

// EVENEMENT QUI SE PRODUIT (CLICK | INPUT)
// INVOCATION D'ACTION

const searchInput = document.querySelector('.research-bar')
const searchButton = document.querySelector('#search-button')

const threshold = 1000
let timeout = null

function onSubmit(event) {
  event.preventDefault()

  //pas certain sur le target.value
  //ne pas 'hesiter a console.log(event ou event.target)
  search(event.target.value)
}

function search(value) {
  // 2. check: if input exists and if input is larger than 0
  if (value && value.trim().length > 0) {
    const request = value.trim().toLowerCase()
    setLists2(request)
  } else {
    // 5. return error message
    // input is invalid -- show an error message or show no results
    displayNoArticlesMsg()
  }
}

searchInput.addEventListener('input', (event) => {
  // 1. declare and assign the value of the event's target to a variable article whatever is typed in the search bar
  const value = event.target.value

  clearTimeout(timeout)

  timeout = setTimeout(() => {
    search(value)
  }, threshold)
})

// searchBar.addEventListener('keypress', (e) => {
//   e.preventDefault()
//   if (e.key === 'enter') {
//     console.log('coucou ')
//   }
//   // clearTimeout(timeout)
//   // const request = searchInput.value
//   // search(request)
// })

function displayNoArticlesMsg() {
  document.querySelector('.post-group').innerText = 'Aucun article trouvé'
}

const clearButton = document.getElementById('clear')

// clearButton.addEventListener('click', () => {
//   // 1. write a function that removes any previous results from the page
// })

/**
 * Affiche 1 article au bon endroit dans la page/document HTML
 */
function displayArticle(article) {
  const list = document.querySelector('.post-container.container')
  const resultItem = document.createElement('div')

  resultItem.classList.add('result-item')

  const articleTitleQuery = document.createTextNode(article.title)
  const articleDescQuery = document.createTextNode(article.description)
  const articleDateQuery = document.createTextNode(
    article.date.toLocaleDateString()
  )
  const articleAutQuery = document.createTextNode(article.auteurArticles.name)
  const articleImgQuery = document.createElement('img') // new Image()

  articleImgQuery.src = article.image.data

  resultItem.append(
    articleTitleQuery,
    articleDescQuery,
    articleDateQuery,
    articleAutQuery,
    articleImgQuery
  )

  list.appendChild(resultItem)
}

/**
 * Affiche les articles au bon endroit dans la page/document HTML
 */
function displayArticles(articles) {
  articles.forEach(displayArticle)
}

function removeArticles() {
  // je récupère le parent
  const elementToBeEmptied = document.querySelector('.post-group')

  // je supprime le premier enfant à la chaine du parent tant qu'il est existant
  while (elementToBeEmptied.firstChild) {
    elementToBeEmptied.removeChild(elementToBeEmptied.firstChild)
  }
}

function replaceArticles(articles) {
  removeArticles()
  displayArticles(articles)
}

function setLists2(keywords) {
  console.log('Ma requete :', keywords)

  getSearchedArticles(keywords).then(replaceArticles)
}
