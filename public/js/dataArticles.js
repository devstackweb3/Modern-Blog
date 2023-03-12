import { getArticleBySlug } from './queries.js'
import ImageModel from './models/image.js'

function fetchDataArticle() {
  const params = new URLSearchParams(location.search)
  const slug = params.get('slug')

  // "?slug"

  // "?slug" => split par rapport à ?

  // il va nous retourner un array ["", "slug"]

  // selectionne le dernier item ici le 2eme

  return getArticleBySlug(slug)
}

// return new Promise((resolve, reject) => {
//   fetch(URL)
//     .then((data) => data.json())
//     .then((data) => {
//       //FIXME need to fetch only the selected article
//       const result = data.result.find((e) => e.slug.current === slug)

//       console.log(result)

//       // result === selected article

//       if (result.length === 0) {
//         displayNoTableContentMsg()
//       } else {
//         const sousSujets = result.sous_sujets

//         const sujetsNode = sousSujets.map((s) => {
//           const element = document.createElement('h2')
//           element.innerHTML = s.soustitre
//           return element
//         })

//         console.log(sujetsNode)

//         const subjectContainer =
//           document.getElementsByClassName('subjects_table')

//         const mobileSubjectContainer = document.getElementsByClassName(
//           'mobile_subjects_table'
//         )

//         for (const container of subjectContainer) {
//           for (const sujet of sousSujets) {
//             const element = document.createElement('h2')
//             element.innerHTML = sujet.soustitre
//             container.appendChild(element)
//           }
//         }

//playground

// const date = new Date()

// console.log(date.getTime())

// const obj = {
//   date: 1234343535,
//   pseudo: 'michel',
//   email: 'michel@',
// }

// 1234
// ""
// bolean: true / false
//true
//false
// Date:

// const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// const ventes = [
//   { model: 'nike', client: 'michel' },
//   { model: 'addidas', client: 'patrick' },
//   { model: 'nike', client: 'sophie' },
//   { model: 'balanciaga', client: 'martine' },
// ]

// const nikeOrders = ventes.filter((e) => e.model === 'nike')
// e représente l'item de chaque valeur du tableau sélectionné -> ventes.filter
// ca représente l'item sur lequel il est en train d'itérer => il commence sur le premier et termine sur le dernier

// const newArray = [0,2,4,6,8,10]

// for(const number of array){
//   const updatedNumber = number * 2
//   newArray.push(updatedNumber)
// }

// // const stringArray = ['1', '2', '3']

// // const arrayObj = [
// //   { pseudo: 'michel', email: 'dfdsfsfsdf@gmail.com' },
// //   { pseudo: 'patrick', email: 'adasdaldkjad' },
// // ]

// function multiply(chiffre) {
//   const result = chiffre * 3
//   return result
// }

// multiply

// function dataMultiply() {
//   const dataArray = array.map((number) => multiply(number))
//                    // array.map(multiply) a utiliser plus tard
//   return dataArray
// }

// console.log(dataMultiply())

// //se référer array[i] | array[2] = 2

//OBJET = PRIMITIVE DATA (nb, string, boolean, date)
// } // REALISER UN DIAGRAME REPRESENTATIF POUR MIEUX COMPRENDRE LES FONCTIONNEMENTS DES BOUCLES
//   resolve(result)
// })
// .catch(reject)
// })

// const articleData = await new Promise((resolve, reject) => {
// fetch(URL)
//   .then((data) => data.json())
//   .then((data) => {
//     //FIXME need to fetch only the selected article
//     const result = data.result.find((e) => e.slug.current === slug)

//
//     resolve(result)
//   })
//   .catch(reject)
// })

//generateArticleHTML(articleData)

//
// }

function displayNoTableContentMsg() {
  document.querySelector('.card-table').innerText =
    'Pas de sujets secondaires à afficher'
}

fetchDataArticle()
  .then((article) => {
    generateArticleHTML(article)
  })
  .catch(console.error)

/**
 * Version raccourcie
 * 

fetchDataArticle()
  .then(generateArticleHTML)
  .catch(console.error)

*/

/**
 * @param {Article} article - l'article à afficher sur la page
 */
function generateArticleHTML(article) {
  //genere HTML
  const container = document.querySelector('.article-content')

  // on vide le contenu de l'ancien article
  container.innerHTML = ''

  const articleNode = document.createElement('article')

  const headerNode = generateArticleHeaderHTML(article)
  articleNode.appendChild(headerNode)

  // const sponsorNode = null
  // articleNode.appendChild(sponsorNode)

  const tableOfContentNode = generateArticleTableOfContentHTML(article)
  articleNode.appendChild(tableOfContentNode)
  // articleNode.appendChild(generateArticleTableOfContentHTML(article))

  generateArticleContentHTML(article, articleNode)

  container.appendChild(articleNode)

  generateSousSujetsHTML(article)
}

// ;<div>{article && <Article />}</div>

// function atome() {
//   // je fais une chose
// }

// function molécule() {
//   functionAtome()
//   functionAtome()
//   functionAtome()
//   functionAtome()
//   functionAtome()
// }

function generateArticleHeaderHTML(article) {
  const headerNode = document.createElement('header')

  headerNode.classList.add('article-header')

  // une image img.article-image
  const imgNode = new Image()
  imgNode.src = article.image.asset.url
  imgNode.classList.add('article-image')
  headerNode.appendChild(imgNode)

  // les tags div.tags
  // const tags = null

  // le titre h1#article-title
  const titleNode = document.createElement('h1')
  titleNode.id = 'article-title'
  titleNode.innerText = article.title
  headerNode.appendChild(titleNode)

  // l'auteur div.author-row
  const authorNode = document.createElement('div')
  authorNode.classList.add('author-row')

  const authorLinkNode = document.createElement('a')
  authorLinkNode.href = `/author.html?id=${article.author.id}`
  authorLinkNode.innerText = article.author.name || 'Anonymous'

  authorNode.appendChild(authorLinkNode)
  headerNode.appendChild(authorNode)

  return headerNode
}

function generateArticleTableOfContentHTML(article) {
  const tableOfContentNode = document.createElement('div')

  tableOfContentNode.classList.add('card-table-parent')
  tableOfContentNode.classList.add('mobile-table')

  const imgTableNode = new Image()
  imgTableNode.src = article.tableOfContentImg.asset.url
  const imgSideBarTableNode = imgTableNode.cloneNode()

  imgTableNode.classList.add('card-main-pic-resume')
  imgSideBarTableNode.classList.add('card-pic-resume')

  const cardHeader = document.createElement('div')
  cardHeader.classList.add('card-header-table')

  const sideBarImageContainer =
    document.getElementsByClassName('card-header-table')

  sideBarImageContainer[0].appendChild(imgSideBarTableNode)

  cardHeader.innerHTML = `<div class="card-table-cover" style="background-image: url('')"></div>
  <img class="card-main-pic-resume" src="" alt="tableContentImg" />`
  cardHeader.appendChild(imgTableNode)

  tableOfContentNode.appendChild(cardHeader)

  const cardSubject = document.createElement('div')
  cardSubject.classList.add('card-main-sub-subjects')
  cardSubject.innerHTML = `<div class="card-section-table">
                              <div class="card-main-content-table">
                                <div class="card-table-of-content">TABLE DES MATIERES</div>
                                <div class="subjects_table">

                                </div>
                              </div>
      
                            </div>`
  tableOfContentNode.appendChild(cardSubject)

  return tableOfContentNode
}

//
//   article: Article
//   articleNode: HTMLNode
//

function generateArticleContentHTML(article, articleNode) {
  const sousSujets = article.sousSujets

  const container = document.createElement('div')
  container.style.padding = '16px'

  container.classList.add('card-table-parent')

  for (const sujet of sousSujets) {
    const title = document.createElement('h2')
    const text = document.createElement('p')
    title.innerHTML = sujet.title
    text.innerHTML = sujet.description
    container.appendChild(title)
    container.appendChild(text)
  }
  console.log(article)
  articleNode.appendChild(container)
}

//créer une fonction qui va gérer l'affichage des sous sujets qui prend en parametre un article
//dans la fonction on doit récupérer depuis l'object "article" les clés "sousSujets"
// maper sur les sousSujets
function generateSousSujetsHTML(article) {
  //selecteur de tes container
  const sousSujets = article.sousSujets
  const containers = document.getElementsByClassName('subjects_table')
  for (const container of containers) {
    for (const sujet of sousSujets) {
      const element = document.createElement('h2')
      element.innerHTML = sujet.title
      container.appendChild(element)
    }
  }
}
