import axios from "axios";

const API_URL  = "http://localhost:8080";

export const createOrder =async(amount,currency="INR")=>{
        try {
            const {data} =await axios.post(`${API_URL}/create-order`,{amount,currency});
            return data;
        } catch (error) {
            console.error("Error creating order:", error);
    return null;
        }
} 