import { Relation, Data, BusinessForm } from '@/views/develop/type'

export interface Develop {
  relation: Relation
  data: Data
  business: { form: BusinessForm, module: BusinessForm }
}
