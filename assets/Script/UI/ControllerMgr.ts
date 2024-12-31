import { _decorator, Component, Event, Node } from 'cc'
import EventMgr from '../../Runtime/EventMgr'
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enums'
const { ccclass, property } = _decorator

@ccclass('ControllerMgr')
export class ControllerMgr extends Component {
  handleCtrl(event: Event, type: string) {
    EventMgr.Instance.emit(EVENT_ENUM.PLAYER_CTRL, type as CONTROLLER_ENUM)
  }
}
