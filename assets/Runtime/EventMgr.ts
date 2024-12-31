import Singleton from '../Base/Singleton'

interface IEvent {
  func: Function
  ctx?: unknown
}

export default class EventMgr extends Singleton {
  static get Instance() {
    return super.GetInstance<EventMgr>()
  }

  private eventDic: Map<string, Array<IEvent>> = new Map()

  on(eventName: string, func: Function, ctx?: unknown) {
    if (this.eventDic.has(eventName)) {
      this.eventDic.get(eventName)?.push({ func, ctx })
    } else {
      this.eventDic.set(eventName, [{ func, ctx }])
    }
  }

  off(eventName: string, func: Function) {
    if (this.eventDic.has(eventName)) {
      const index = this.eventDic.get(eventName)?.findIndex(v => v.func === func)
      index > -1 && this.eventDic.get(eventName)?.splice(index, 1)
    }
  }

  emit(eventName: string, ...params: unknown[]) {
    if (this.eventDic.has(eventName)) {
      this.eventDic.get(eventName)?.forEach(({ func, ctx }) => {
        ctx ? func.apply(ctx, params) : func(params)
      })
    }
  }

  clear() {
    this.eventDic.clear()
  }
}
