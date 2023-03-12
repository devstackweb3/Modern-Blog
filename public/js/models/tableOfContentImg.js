export default class Img {
  ref = ''
  id = ''
  name = ''
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

  constructor(ref, id, name, asset) {
    this.ref = ref
    this.id = id
    this.name = name
    this.asset = asset
  }

  static fromDB = (dbImage) =>
    new Img(
      dbImage._ref,
      dbImage._id,
      dbImage.name,
      Img.Asset.fromDB(dbImage.asset)
    )
}
