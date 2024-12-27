import { ITile } from '../Levels'

class DataMgr {
  mapInfo: Array<Array<ITile>>
  mapRowCount: number
  mapColumnCount: number
}

export const DataMgrInstance = new DataMgr()
