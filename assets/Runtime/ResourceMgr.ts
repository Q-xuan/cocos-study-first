import { resources, SpriteFrame } from 'cc'
import Singleton from '../Base/Singleton'
import { ITile } from '../Levels'

export default class ResourceMgr extends Singleton {
  static get Instance() {
    return super.GetInstance<ResourceMgr>()
  }

  //'texture/tile/tile'
  loadDir(path: string, type: typeof SpriteFrame = SpriteFrame) {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir(path, type, (err, assets) => {
        if (err) {
          reject(err)
          return
        }
        resolve(assets)
      })
    })
  }
}
