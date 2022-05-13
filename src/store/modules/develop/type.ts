export interface Relation {
  id?: number
  copyId?: number
  groupId: string
  name: string
  comment: string
  code: string
}

export interface Develop {
  relation: Relation
}
