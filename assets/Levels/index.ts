import level1 from 'db://assets/Levels/level1'
import { TILE_TYPE_ENUM } from '../Enums'

export interface ITile {
  src: number | null
  type: TILE_TYPE_ENUM | null
}

export interface ILevel {
  mapInfo: ITile[][]
}

const levels = {
  level1,
}

export default levels
