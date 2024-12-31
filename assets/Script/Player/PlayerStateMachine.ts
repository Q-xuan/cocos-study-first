import { AnimationClip, Component, _decorator, Animation, SpriteFrame } from 'cc'
import { FSM_PARAMS_TYPE_ENUM, PARAME_NAME_ENUM } from '../../Enums'
import State from '../../Base/State'
const { ccclass, property } = _decorator

type ParamsValueType = number | boolean

export interface IParamsValue {
  type: FSM_PARAMS_TYPE_ENUM
  value: ParamsValueType
}

export const getInitParamsTrigger = () => {
  return {
    type: FSM_PARAMS_TYPE_ENUM.TRIGGER,
    value: false,
  }
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {
  private _currentState: State = null
  params: Map<string, IParamsValue> = new Map()
  stateMachines: Map<string, State> = new Map()
  animationComponent: Animation
  waitingList: Array<Promise<SpriteFrame[]>> = []

  getParams(paramsName: string) {
    if (this.params.has(paramsName)) {
      return this.params.get(paramsName).value
    }
  }

  setParams(paramsName: string, value: ParamsValueType) {
    if (this.params.has(paramsName)) {
      this.params.get(paramsName).value = value
      this.run(paramsName)
    }
  }

  get currentState() {
    return this._currentState
  }

  set currentState(newState) {
    this._currentState = newState
    this._currentState.play()
  }

  async init() {
    this.animationComponent = this.addComponent(Animation)
    this.initParams()
    this.initStateMachines()

    await Promise.all(this.waitingList)
  }

  initParams() {
    this.params.set(PARAME_NAME_ENUM.IDLE, getInitParamsTrigger())
    this.params.set(PARAME_NAME_ENUM.TURNLEFT, getInitParamsTrigger())
    this.params.set(PARAME_NAME_ENUM.TURNRIGHT, getInitParamsTrigger())
  }

  initStateMachines() {
    this.stateMachines.set(
      PARAME_NAME_ENUM.IDLE,
      new State(this, 'texture/player/idle/top', AnimationClip.WrapMode.Loop),
    )
    this.stateMachines.set(PARAME_NAME_ENUM.TURNLEFT, new State(this, 'texture/player/turnleft/top'))
    this.stateMachines.set(PARAME_NAME_ENUM.TURNRIGHT, new State(this, 'texture/player/turnright/top'))
  }

  run(paramsName: string) {
    this.currentState = this.stateMachines.get(paramsName)
    // switch (this.currentState) {
    //   case this.stateMachines.get(PARAME_NAME_ENUM.TURNLEFT):
    //   case this.stateMachines.get(PARAME_NAME_ENUM.TURNRIGHT):
    //   case this.stateMachines.get(PARAME_NAME_ENUM.IDLE):
    //     if (this.params.get(PARAME_NAME_ENUM.TURNRIGHT)) {
    //       this.currentState = this.stateMachines.get(PARAME_NAME_ENUM.TURNRIGHT)
    //     } else if (this.params.get(PARAME_NAME_ENUM.TURNLEFT)) {
    //       this.currentState = this.stateMachines.get(PARAME_NAME_ENUM.TURNLEFT)
    //     } else if (this.params.get(PARAME_NAME_ENUM.IDLE)) {
    //       this.currentState = this.stateMachines.get(PARAME_NAME_ENUM.IDLE)
    //     }
    //     break
    //   default:
    //     this.currentState = this.stateMachines.get(PARAME_NAME_ENUM.IDLE)
    // }
  }
}
