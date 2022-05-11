export interface Relation {
  id?: string
  groupId: string
  name: string
  comment: string
  code: string
  columns?: any[]
}

export interface Develop {
  relation: Relation
}
