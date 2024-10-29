import toast from "react-hot-toast";
import { categories } from "../apis"
import { apiConnector } from "../apiConnector";

const { CATEGORIES_API, CREATE_CATEGORIES_API } = categories;


export async function createCategory(token, formData) {
    console.log(token, formData);
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_CATEGORIES_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE_CATEGORIES_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Category Created Successfully")
    } catch (error) {
      console.log("CREATE_CATEGORIES_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }