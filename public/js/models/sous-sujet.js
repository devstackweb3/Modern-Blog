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

// data : {
//      description: {
//       children: children[]
//       markDefs:[]
//       style: string
//     }[],
//     title: string
//   }
//

// const generateSousSujetHTML = (data) => {
//   const container = document.querySelector('article-container')
//   const contTitle = document.createElement('h2')
//   contTitle.innerHTML(data.title)
//   container.appendChild(contTitle)

//   // const title =
//   // const desc =
// }

// // export default

// // <section>
// //   <h1>title</h1>
// //   <div class="content">
// //     ton contenu
// //     si link <a href=le href correspondant class="strong red">le text</a>
// //   </div>
// // </section>

// // SousSujet est un array d'object de la structure description ( voir ci dessous )
// // SousSujet est une clef dans l'array d'objets de la structure sousSujets

// // function qui va mapper pour chaque sous sujet
// // il faut prendre un sous sujet
// // créer une balise title ( h1 ou h2 ou w/e)

// // la partie plus compliquée consiste a maper sur la clé description

// // description contenant le style a appliquer a tous les children

// //

// // sousSujet : {
// //   description: {
// //     children: children[]
// //     markDefs:[]
// //     style: string
// //   }[],
// //   title: string
// // }

// // children: {
// //   mark: [],
// //   text: string
// // }

// // markDefs: {
// //   blank: boolean,
// //   href: string,
// //   _type: "link"
// // }
