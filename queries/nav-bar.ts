import axios from 'axios'
import { BASE_URL } from '@constants/index'

export const GET_CHILDREN_NAVIGATION = async (g?: Object, e?: any) => {
  const res = await axios.get(BASE_URL + `/catalog/categories/tree`, e)
  return res.data
}
