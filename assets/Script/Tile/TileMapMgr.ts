import { _decorator, Component, log, resources, SpriteFrame } from 'cc'
import { createUINode, randomByRange } from '../../Utils'
import { TileMgr } from './TileMgr'
import DataMgr from '../../Runtime/DataMgr'
import ResourceMgr from '../../Runtime/ResourceMgr'
const { ccclass, property } = _decorator

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapMgr')
export class TileMapMgr extends Component {
  async init() {
    const spriteFrams = await ResourceMgr.Instance.loadDir('texture/tile/tile')
    const { mapInfo } = DataMgr.Instance
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const item = column[j]
        if (item.src === null || item.type === null) continue

        let number = item.src
        if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
          number += randomByRange(0, 4)
        }

        const imgSrc = `tile (${number})`
        const node = createUINode()
        const spriteFrame = spriteFrams.find(v => v.name === imgSrc) || spriteFrams[0]
        const tileMgr = node.addComponent(TileMgr)
        tileMgr.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }
}
