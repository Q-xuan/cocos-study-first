import { Layers, Node, UITransform, Vec2 } from 'cc'

export const createUINode = (_name: string = '') => {
  const node = new Node(_name)
  const transform = node.addComponent(UITransform)
  transform.anchorPoint = new Vec2(0, 1)
  node.layer = 1 << Layers.nameToLayer('UI_2D')
  return node
}

export const randomByRange = (start: number, end: number) => {
  return Math.floor(start + (end - start) * Math.random())
}
