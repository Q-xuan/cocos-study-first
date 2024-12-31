import Singleton from '../Base/Singleton'
import { ITile } from '../Levels'

export default class DataMgr extends Singleton {
  static get Instance() {
    return super.GetInstance<DataMgr>()
  }

  mapInfo: Array<Array<ITile>>
  mapRowCount: number = 0
  mapColumnCount: number = 0
  levelIndex: number = 1

  reset() {
    this.mapInfo = []
    this.mapRowCount = 0
    this.mapColumnCount = 0
  }
}
