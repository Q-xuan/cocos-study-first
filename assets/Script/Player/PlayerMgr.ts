import { _decorator, animation, Animation, AnimationClip, Component, Sprite, SpriteFrame, UITransform } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileMapMgr'
import ResourceMgr from '../../Runtime/ResourceMgr'
import { CONTROLLER_ENUM, EVENT_ENUM, PARAME_NAME_ENUM } from '../../Enums'
import EventMgr from '../../Runtime/EventMgr'
import { PlayerStateMachine } from './PlayerStateMachine'
const { ccclass, property } = _decorator

@ccclass('PlayerMgr')
export class PlayerMgr extends Component {
  x: number = 0
  y: number = 0
  targetX: number = 0
  targetY: number = 0
  private readonly speed = 1 / 10
  fsm: PlayerStateMachine
  async init() {
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const transform = this.node.getComponent(UITransform)
    transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)

    this.fsm = this.addComponent(PlayerStateMachine)
    await this.fsm.init()
    this.fsm.setParams(PARAME_NAME_ENUM.IDLE, true)

    EventMgr.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this)
  }

  update() {
    this.updateXY()
    this.node.setPosition(this.x * TILE_WIDTH - TILE_WIDTH * 1.5, -this.y * TILE_HEIGHT * 1.5)
  }

  updateXY() {
    if (this.targetX < this.x) {
      this.x -= this.speed
    } else if (this.targetX > this.x) {
      this.x += this.speed
    } else if (this.targetY < this.y) {
      this.y -= this.speed
    } else if (this.targetY > this.y) {
      this.y += this.speed
    }

    if (Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1) {
      this.x = this.targetX
      this.y = this.targetY
    }
  }

  move(inputDirection: CONTROLLER_ENUM) {
    if (inputDirection === CONTROLLER_ENUM.TOP) {
      this.targetY--
    } else if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
      this.targetY++
    } else if (inputDirection === CONTROLLER_ENUM.LEFT) {
      this.targetX--
    } else if (inputDirection === CONTROLLER_ENUM.RIGHT) {
      this.targetX++
    } else if (inputDirection === CONTROLLER_ENUM.TURNLEFT) {
      this.fsm.setParams(PARAME_NAME_ENUM.TURNLEFT, true)
    } else if (inputDirection === CONTROLLER_ENUM.TURNRIGHT) {
      this.fsm.setParams(PARAME_NAME_ENUM.TURNRIGHT, true)
    }
  }

  // async render() {
  //   const sprite = this.addComponent(Sprite)
  //   sprite.sizeMode = Sprite.SizeMode.CUSTOM

  //   const transform = this.node.getComponent(UITransform)
  //   transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)

  //   const spriteFrames = await ResourceMgr.Instance.loadDir('texture/player/idle/top')
  //   const animationComponent = this.addComponent(Animation)

  //   const animationClip = new AnimationClip()

  //   const track = new animation.ObjectTrack() // 创建一个向量轨道
  //   track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame') // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
  //   const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [ANIMATION_SPEED * index, item])
  //   track.channel.curve.assignSorted(frames)

  //   // 最后将轨道添加到动画剪辑以应用
  //   animationClip.addTrack(track)

  //   animationClip.duration = frames.length * ANIMATION_SPEED // 整个动画剪辑的周期
  //   animationClip.wrapMode = AnimationClip.WrapMode.Loop
  //   animationComponent.defaultClip = animationClip
  //   animationComponent.play()
  // }
}
