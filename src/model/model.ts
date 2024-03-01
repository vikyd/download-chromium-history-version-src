export interface Os {
  val: string
  file: string
}

export interface VerPos {
  ver: string
  pos: string
  href: string
}

export type VerPosMap = Record<string, string>
