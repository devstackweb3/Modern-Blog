import { PROJECT_ID, DATASET } from './config.js'

import Article from './models/article.js'
import Author from './models/author.js'
import Image from './models/image.js'

/**
 * Retourne un tableau d'articles (objet Article)
 */
export function getArticles() {
  // TODO
}

/**
 * Retour 1 article (objet Article)
 */
export function getArticleById(id) {
  // TODO
}

/**
 * Retourne 1 article qui match le slug ou null
 *
 * @param {String} slug - le slug de l'article à retrouver
 *
 * @return {Promise<Article>} une promesse contenant l'article retrouvé ou null si aucun article n'a été trouvé
 */
export async function getArticleBySlug(slug) {
  // sanitiser l'input
  const sanitizedSlug = JSON.stringify(slug) // à changer

  // construction de la requete auprès de sanity
  const QUERY = encodeURIComponent(
    `*[_type == "article" && slug.current == ${sanitizedSlug}][0]{
      _id,
      title,
      date,
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
    }`
  )

  // construction de l'endpoint à contacter
  const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-10-21/data/query/${DATASET}?query=${QUERY}`

  // envoi et récupération du résultat de la requête
  return new Promise((resolve, reject) => {
    fetch(URL) // '{ success: true, errorMessage: null, result: [ { ARTICLE1 }, { ARTICLE2 }, ...ETC ]}'
      .then((response) => response.json()) // { success: true, errorMessage: null, result: [ { slug: { current: '' }, title: '' }, { ARTICLE2 }, ...ETC ]}
      .then(({ result }) => {
        if (!result) {
          resolve(null)
        } else {
          const article = Article.fromDB(result)

          resolve(article)
        }
      })
      .catch(reject)
  })
}

/**
 * Retourne un tableau d'articles (objet Article)
 */
export async function getSearchedArticles(keywords) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const image = new Image(1, 'vincent-profile-picture', null)
      const author = new Author(1, 'Vincent', image)
      resolve([
        new Article(
          1,
          'Top 10 montres',
          '',
          new Date('05/17/2022'),
          author,
          image
        ),
        new Article(
          2,
          'top 10 crypto',
          '',
          new Date('11/09/2018'),
          author,
          image
        ),
      ])
    }, 1500)
  })
}
