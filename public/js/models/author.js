import Image from './image.js'

export default class Author {
  ref = ''
  id = ''
  name = ''
  image = null
  biography = ''
  socials = null
  surname = ''
  job = ''
  experience = null
  contact = null

  constructor(
    ref,
    id,
    name,
    image,
    biography,
    socials,
    surname,
    job,
    experience,
    contact
  ) {
    this.ref = ref
    this.id = id
    this.name = name
    this.image = image
    this.biography = biography
    this.socials = socials
    this.surname = surname
    this.job = job
    this.experience = experience
    this.contact = contact
  }

  static fromDB = (dbAuthor) =>
    new Author(
      dbAuthor._ref,
      dbAuthor._id,
      dbAuthor.name,
      Image.fromDB(dbAuthor.image),
      dbAuthor.biography,
      dbAuthor.socials,
      dbAuthor.surname,
      dbAuthor.job,
      dbAuthor.experience,
      dbAuthor.contact
    )
}
