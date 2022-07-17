import {useState} from "react";


export const useGetId = () => {
    const [getId,setGetId] = useState(null)

    return {getId}
}