export namespace CommonType {
  export interface TreeParams {
    treeCode: string
    nodeCode?: string
    rootName?: string
    treeId?: number
  }

  type TransferType = 0 | 1

  export interface TransferParams {
    chinese: string
    type: TransferType
  }
}
