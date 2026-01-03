import axios from "axios"

const api = "http://localhost:2603/products"

export const fetchProducts = async () => {
    try {
        const response  = await axios.get(api)
        console.log("res ", response);

    } catch (error) {
        console.log(error);
    }
}