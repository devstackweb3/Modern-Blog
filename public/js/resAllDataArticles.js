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

function addAuthorArticle({ auteurArticles: [author] }) {
  const authorRef = author._ref
  const authorName = authorRef.name

  return authorName
}

function generateImageArticleHTML(article) {
  //une image img.article-image
  const imgNode = new Image()
  imgNode.src = article.image.asset.url
  return imgNode
}

function displayNoArticlesMsg() {
  document.querySelector('.post-container.container').innerText =
    "Pas d'articles à afficher."
}

function isCategory(category) {
  const cats = ['ETH', 'ADA']

  return cats.includes(category)
}

async function fetchData() {
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

  //meme chose plus lisible (selon moi)
  // const fetchResult = await fetch(URL)
  //   .then((data) => data.json())
  //   .then(({ result }) => result)
  //   //.then((data) => resolve(data.result)) c'est la meme chose qu'au dessus
  //   .catch(reject)

  // return fetchResult
}

fetchData().then((articles) => {
  if (articles.length > 0) {
    console.log(articles.length)
    articles.forEach(addArticleToHtml)
  } else {
    displayNoArticlesMsg()
  }
})

// let result

// const backResult = await fetch(URL) // => object json

// const parseToJson = backResult.json() // => object javascript

// result = parseToJson

//FONCTIONNEMENT JSON DATA
//front utilise des objets => transforme en JSON => envoie au back

//ton back retourne un objet => arrive au front en json => tu transforme dans ton front ce json en objet

/* 

fetch(URL) {
        .then((res) => res.json()) //recupere le json et le transforme en JS ici
        .then(({ result }) => { //il applique une fonction sur l'object js qu'il a transformé au dessus ( result = objet transformé a la ligne du dessus)
          // get the list element, and the first item
          let list = document.querySelector("ul");
          let firstListItem = document.querySelector("ul li");

          if (result.length > 0) {
            // remove the placeholder content
            list.removeChild(firstListItem);

            result.forEach((pet) => {
              // create a list element for each pet
              let listItem = document.createElement("li");

              // add the pet name as the text content
              listItem.textContent = pet?.name;

              // add the item to the list
              list.appendChild(listItem);
            });

            let pre = document.querySelector("pre");
            // add the raw data to the preformatted element
            pre.textContent = JSON.stringify(result, null, 2);
          }
        })
        .catch((err) => console.error(err));
      }
*/

// Logique Boutons slices

// const osef = [1,2,3,4,5,6,7,8,9]

// const currentslice = 0

// quand currentslice = 0, tu es au début et donc tu n affiches pas la fleche de gauche

// currentslice + 2

// osef.slice(7, 9)

// [1,2,3]

// const currentFirstItem = 0

// sur sanity fetch moi les élement de 0 à 2

// tu check si tu es firstItem 0 tu n affiches pas la fleche de gauche

// si tu cliques sur la fleche de droite tu fais currentFirstItem + 3 et tu lui demande de fetch les items de 3 à 5
