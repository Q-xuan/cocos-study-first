import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from './TileMapMgr'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = TileMgr
 * DateTime = Fri Dec 27 2024 16:19:01 GMT+0800 (中国标准时间)
 * Author = qxuan
 * FileBasename = TileMgr.ts
 * FileBasenameNoExtension = TileMgr
 * URL = db://assets/Script/Tile/TileMgr.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('TileMgr')
export class TileMgr extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  start() {
    // [3]
  }

  init(spriteFrame: SpriteFrame, i: number, j: number) {
    const sprite = this.node.addComponent(Sprite)
    const transform = this.getComponent(UITransform)
    sprite.spriteFrame = spriteFrame

    transform.setContentSize(TILE_WIDTH, TILE_HEIGHT)

    this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
