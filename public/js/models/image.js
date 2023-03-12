export default class Image {
  ref = ''
  id = ''
  name = ''
  tag = []
  asset = null

  static Asset = class {
    ref = ''
    id = ''
    extension = ''
    name = ''
    path = ''
    url = ''

    constructor(ref, id, extension, name, path, url) {
      this.ref = ref
      this.id = id
      this.extension = extension
      this.name = name
      this.path = path
      this.url = url
    }

    //clefs que renvoie Sanity

    // {
    //   _ref: String;
    //   _id: String;
    //   extension: String;
    //   originalFileName: String;
    //   path: String;
    //   url: String;
    //   chausette: String;
    //   blabla: String;
    // }

    //ternary | si dbImageAsset existant -> retourne new this(dbImageAsset...) sinon retourne new this()
    static fromDB = (dbImageAsset) =>
      dbImageAsset
        ? new this(
            dbImageAsset._ref,
            dbImageAsset._id,
            dbImageAsset.extension,
            dbImageAsset.originalFilename,
            dbImageAsset.path,
            dbImageAsset.url
          )
        : new this()
  }

  constructor(ref, id, name, tag, asset) {
    this.ref = ref
    this.id = id
    this.name = name
    this.tag = tag
    this.asset = asset
  }

  static fromDB = (dbImage) =>
    new Image(
      dbImage._ref,
      dbImage._id,
      dbImage.name,
      dbImage.tag,
      Image.Asset.fromDB(dbImage.asset)
    )
}
