import Image from './image.js'

export default class SousSujet {
  ref = ''

  id = ''

  /**
   * Titre de la sous-section
   * @type {String}
   */
  title = ''

  /**
   * Description de la sous-section
   * @type {String}
   */
  description = ''

  /**
   * Image de chapitre
   * @type {Image}
   */
  image = ''

  constructor(ref, id, title, description, image) {
    this.ref = ref
    this.id = id
    this.title = title
    this.description = description
    this.image = image
  }

  static fromDB = (sousSujet) =>
    new SousSujet(
      sousSujet._ref,
      sousSujet._key,
      sousSujet.soustitre,
      sousSujet.sousdesc,
      new Image(sousSujet.image?.asset._ref)
    )
}
