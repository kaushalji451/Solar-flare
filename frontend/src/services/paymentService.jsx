import axios from "axios";

export const createOrder =async(amount,currency="INR")=>{
        try {
            const {data} =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-order`,{amount,currency});
            return data;
        } catch (error) {
            console.error("Error creating order:", error);
    return null;
        }
} 