import { _decorator, Component, Node } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH, TileMapMgr } from '../Tile/TileMapMgr'
import { createUINode } from '../../Utils'
import levels, { ILevel } from '../../Levels'
import { DataMgrInstance } from '../../Runtime/DataMgr'
const { ccclass, property } = _decorator

@ccclass('BattleMgr')
export class BattleMgr extends Component {
  level: ILevel
  stage: Node

  start() {
    this.generateStage()
    this.initLevel()
  }

  initLevel() {
    const level = levels[`level${1}`]
    if (level) {
      this.level = level

      DataMgrInstance.mapInfo = this.level.mapInfo
      DataMgrInstance.mapRowCount = this.level.mapInfo.length || 0
      DataMgrInstance.mapColumnCount = this.level.mapInfo[0].length || 0

      this.generrateTileMap()
    }
  }

  generateStage() {
    this.stage = createUINode()
    this.stage.setParent(this.node)
    this.stage.setSiblingIndex(2)
  }

  async generrateTileMap() {
    const tileMap = createUINode()
    tileMap.setParent(this.stage)
    const tileMapMgr = tileMap.addComponent(TileMapMgr)
    await tileMapMgr.init()
    console.log(tileMap)

    this.adaptPos()
  }

  adaptPos() {
    const { mapRowCount, mapColumnCount } = DataMgrInstance
    const disX = (TILE_WIDTH * mapRowCount) / 2
    const disY = (TILE_HEIGHT * mapColumnCount) / 2

    this.stage.setPosition(-disX, disY)
  }
}
