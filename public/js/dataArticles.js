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

  // generateTableOfContentHTML(article)

  // call la fonction qui genere le contenu ici
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
  titleNode.id = 'article-target-title'
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

  const containerClass = ['card-table-parent', 'article-container']

  container.classList.add(...containerClass)

  generateArticleTableContentHTML(article, container)

  articleNode.appendChild(container)
}

//créer une fonction qui va gérer l'affichage des sous sujets qui prend en parametre un article
//dans la fonction on doit récupérer depuis l'object "article" les clés "sousSujets"
// maper sur les sousSujets
function generateTableOfContentHTML(article) {
  console.log(article)
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

// une fonction qui génere la table des matiere

// une fonction qui genere l'article

// data : {
//      description: {
//       children: children[]
//       markDefs:[]
//       style: string
//     }[],
//     title: string
//   }
//

// sousSujet : {
//   description: {
//     children: children[]
//     markDefs:[]
//     style: string
//   }[],
//   title: string
// }[]

//une fonction qui va mapper sous la clé sousSujet et appeller pour chacun la fonction ci desous

//container = le container parent, celui ou on veut mettre l'article

const generateArticleTableContentHTML = (article, container) => {
  console.log(article)
  const sousSujets = article.sousSujets
  for (const sousSujet of sousSujets) {
    generateSousSujetHTML(sousSujet, container)
  }
}

const generateSousSujetHTML = (sousSujet, container) => {
  const contTitle = document.createElement('h2') //devient référence à un élément du DOM "h2"

  contTitle.innerHTML = sousSujet.title //assignation d'une clef avec innerHTML
  //contTitle.innerHTML(data.title) //appel d'une fonction avec innerHTML
  container.appendChild(contTitle)

  const containerSujet = document.createElement('p')

  //    sousDesc structure: {
  //     children: children[]
  //     markDefs:[]
  //     style: string
  //    }

  const description = sousSujet.description
  for (const sousDesc of description) {
    const style = sousDesc.style

    let styleHeaderPush //valeur indéfinie le lecteur continue à lire et interpréter styleHeaderPush comme l'équivalent de chaque case jusqu'à la valeur d'attribution trouvée
    switch (style) {
      case 'h1':
        styleHeaderPush = document.createElement('h1')
        break
      case 'h2':
        styleHeaderPush = document.createElement('h2')
        break
      case 'h3':
        styleHeaderPush = document.createElement('h3')
        break
      case 'normal':
        styleHeaderPush = document.createElement('p')
        break
      default:
        styleHeaderPush = document.createElement('p')
        break
    }

    // if (style === 'h1') {
    //   styleHeaderPush === document.createElement('h1')
    // } else if (style === 'h2') {
    //   styleHeaderPush === document.createElement('h2')
    // } else if (style === 'h3') {
    //   styleHeaderPush === document.createElement('h3')
    // } else if (style === 'normal') {
    //   styleHeaderPush === document.createElement('p')
    // }

    const children = sousDesc.children
    for (const child of children) {
      const createSpan = document.createElement('span')
      const text = child.text

      createSpan.innerHTML = text

      styleHeaderPush.appendChild(createSpan)
    }

    containerSujet.appendChild(styleHeaderPush)

    //  il faut récupérer le style ( clé .style)
    // check si c'est un h1, h2, h3, normal ( vérifier les possibilités)
    // en fonction du style génerer une balise html en conséquence

    // une fois cette balise créée
    // tu dois maper sur les children
    // chaque élément aura cette structure:
    // {
    //   mark: [],
    //   text: String,
    //   _key: String,
    //   _type: string
    // }

    // tu dois pour chaque élément pousser le contenu de la clé .text dans la balise que tu as crée plus haut
    // si probleme, tu peux pour chaque clée .text les mettre dans une nouvelle balise span, que tu pousseras dans ta balise h1,h2 etc que tu as créé a l'étape juste au dessus

    // une fois fait, tu dois pousser ta balise crée plus haut dans ton container containerSujet
  }

  container.appendChild(containerSujet)

  // const desc =
}

const generateSousDescHTML = (sousDesc) => {}

// SPREAD OPERATOR JAVASCRIPT
// const array1 = [1,2,3,4]

// const array2 = [5,6,7,8]

// const array3 = [array1, array2]
//array3 === [[1,2,3,4], [5,6,7,8]]

// USAGE DU SPREAD OPERATOR QUI PERMET DE
// const array4 = [...array1, ...array2]
//array4 === [1,2,3,4,5,6,7,8]

//DISPLAY SIMILAR ARTICLES

let PROJECT_ID = '0867l6ks'
let DATASET = 'production'

function addArticleToHtml({
  _id,
  slug,
  category,
  description,
  title,
  image,
  date,
  auteurArticles: [author],
}) {
  // 1 - Récupérer la balise dans laquelle on va mettre les articles
  // 2 - Insérer l'article dans la balise
  const container = document.querySelector('.post-container.container')
  const articleContainer = document.createElement('div')
  const imageArticle = image.image.asset.url
  const authorName = author.surname + ' ' + author.name

  articleContainer.classList.add('post-box')
  articleContainer.classList.add(category.toLowerCase())

  articleContainer.innerHTML = `<a href="article.html?slug=${slug.current}">
    <div class="post-form">
     
        <img src="${imageArticle}" alt="" class="post-img" id="article-img"/>
        <h2 class="category">${category.toLowerCase()}</h2>
      <div class="post-title" id="article-title">
        ${title}
      </div>
      <span class="post-date" id="article-date">12 Feb 2022</span>
      <p class="post-description" id="article-desc">${description}</p>
      <!-- Profile-->
      <div class="profile">
          <img src="img/profile-1.jpg" alt="" class="profile-img" id="authorImg">
          <span class="profile-name" id="author">${authorName}</span>
      </div>
    </div>
  </a>`

  container.appendChild(articleContainer)
}

async function fetchDataResArticle() {
  let QUERY = encodeURIComponent(
    `*[_type == "article"]{
      _id,
      title,
      date,
      category,
      description,
      slug,
      sous_sujets,
      tag,
      image->{
        _id, title, tag, image{ asset-> }
      },
      tableOfContentImg->{
        _id, title, image{ asset-> }
      },
      auteurArticles[]->{
        _id, name, surname, job, biography, experience, socials, image{ _id, title, tag, asset-> }
      },
    }` // ACHTUNG fait référence au "name:" dans articles.ts || '*[_type == "article" && name == "eth" && date > "2022-01-01"]'
  )

  const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-10-21/data/query/${DATASET}?query=${QUERY}`

  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((data) => data.json())
      .then(({ result }) => {
        console.log(result)
        resolve(result)
      })
      //.then((data) => resolve(data.result)) c'est la meme chose qu'au dessus
      .catch(reject)
  })
}

fetchDataResArticle().then((articles) => {
  if (articles.length > 0) {
    console.log(articles.length)
    articles.forEach(addArticleToHtml)
  } else {
    displayNoArticlesMsg()
  }
})
