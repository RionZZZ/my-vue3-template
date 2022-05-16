export interface Relation {
  id?: number
  copyId?: number
  groupId: string
  name: string
  comment: string
  code: string
  [propName: string]: any
}

export interface Develop {
  relation: Relation
}
