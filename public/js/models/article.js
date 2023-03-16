import Author from './author.js'
import Image from './image.js'
import tableOfContentImg from './tableOfContentImg.js'
import SousSujet from './sous-sujet.js'

export default class Article {
  ref = ''

  /**
   * Identifiant unique de l'article
   * @type {Number}
   */
  id = -1

  /**
   * Titre de l'article
   * @type {String}
   */
  title = ''

  description = ''
  date = ''

  /**
   * Slug unique de l'article
   * @type {String}
   */
  slug = ''

  author = ''

  /**
   * @type {Image}
   */
  image = null

  /**
   * @type {Image}
   */
  tableOfContentImg = null

  /**
   * @param {}
   */

  constructor(
    ref,
    id,
    title,
    description,
    date,
    author,
    image,
    slug,
    tableOfContentImg,
    sousSujets
  ) {
    this.ref = ref
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.author = author
    this.image = image
    this.slug = slug
    this.tableOfContentImg = tableOfContentImg
    this.sousSujets = sousSujets
  }

  static fromDB = (dbArticle) =>
    new Article(
      dbArticle._ref,
      dbArticle._id,
      dbArticle.title,
      dbArticle.description,
      dbArticle.date,
      dbArticle.auteurArticles.map(Author.fromDB)[0],
      Image.fromDB({ ...dbArticle.image, asset: dbArticle.image.image.asset }),
      dbArticle.slug?.current,
      Image.fromDB({
        ...dbArticle.tableOfContentImg,
        asset: dbArticle.tableOfContentImg.image.asset,
      }),
      dbArticle.sous_sujets?.map(SousSujet.fromDB)
    )
}
