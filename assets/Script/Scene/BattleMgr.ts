import { _decorator, Component, Node } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH, TileMapMgr } from '../Tile/TileMapMgr'
import { createUINode } from '../../Utils'
import levels, { ILevel } from '../../Levels'
import DataMgr from '../../Runtime/DataMgr'
import EventMgr from '../../Runtime/EventMgr'
import { EVENT_ENUM } from '../../Enums'
import { PlayerMgr } from '../Player/PlayerMgr'
const { ccclass, property } = _decorator

@ccclass('BattleMgr')
export class BattleMgr extends Component {
  level: ILevel
  stage: Node

  onLoad() {
    EventMgr.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
  }

  onDestroy() {
    EventMgr.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel)
  }

  start() {
    this.generateStage()
    this.initLevel()
  }

  initLevel() {
    const level = levels[`level${DataMgr.Instance.levelIndex}`]
    if (level) {
      this.clearLevel()

      this.level = level

      DataMgr.Instance.mapInfo = this.level.mapInfo
      DataMgr.Instance.mapRowCount = this.level.mapInfo.length || 0
      DataMgr.Instance.mapColumnCount = this.level.mapInfo[0].length || 0

      this.generateTileMap()
      this.generatePlayer()
    }
  }

  clearLevel() {
    this.stage.destroyAllChildren()
    DataMgr.Instance.reset()
  }

  nextLevel() {
    DataMgr.Instance.levelIndex++
    this.initLevel()
  }

  generateStage() {
    this.stage = createUINode()
    this.stage.setParent(this.node)
    this.stage.setSiblingIndex(2)
  }

  async generateTileMap() {
    const tileMap = createUINode()
    tileMap.setParent(this.stage)
    const tileMapMgr = tileMap.addComponent(TileMapMgr)
    await tileMapMgr.init()
    console.log(tileMap)

    this.adaptPos()
  }

  generatePlayer() {
    const player = createUINode()
    player.setParent(this.stage)
    const playerMgr = player.addComponent(PlayerMgr)
    playerMgr.init()
  }

  adaptPos() {
    const { mapRowCount, mapColumnCount } = DataMgr.Instance
    const disX = (TILE_WIDTH * mapRowCount) / 2
    const disY = (TILE_HEIGHT * mapColumnCount) / 2 + 80

    this.stage.setPosition(-disX, disY)
  }
}
