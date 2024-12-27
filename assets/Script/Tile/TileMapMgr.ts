import { _decorator, Component, resources, SpriteFrame } from 'cc'
import { createUINode } from '../../Utils'
import { TileMgr } from './TileMgr'
import { DataMgrInstance } from '../../Runtime/DataMgr'
const { ccclass, property } = _decorator

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapMgr')
export class TileMapMgr extends Component {
  async init() {
    const spriteFrams = await this.loadRes()
    const { mapInfo } = DataMgrInstance
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const item = column[j]
        if (item.src === null || item.type === null) continue

        const imgSrc = `tile (${item.src})`
        const node = createUINode()
        const spriteFrame = spriteFrams.find(v => v.name === imgSrc) || spriteFrams[0]
        const tileMgr = node.addComponent(TileMgr)
        tileMgr.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }

  loadRes() {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir('texture/tile/tile', SpriteFrame, (err, assets) => {
        if (err) {
          reject(err)
          return
        }
        resolve(assets)
      })
    })
  }
}
