import axios from "axios"
import config from "../config/config"

export const fetchKebun = async()=>{
    try {
        const res = await axios.get(`${config.base_url}`,{
            params:{
                where:'1=1',
                outFields:'*',
                f:'Geojson',
            },
            headers:{
                Authorization:'Bearer mzFcMRqhxzPAoRJavp2MJhpXDEFmwN5TTyYQ76_IAjz4Mm_Nunp_1pQ0U0nJNr9PfcPbLTg_n3nOCNUlI60DUbciaL3ppnFsSCvcRNq5Bq_6Y5eJRkqA7PZkfLNzCxcf0AeuGTaKoIsYFZZ5bos-QjoRVUUb0wnJ9WdPFCAbl9uQLNZo4VsuQwl172xXf6Xp'
            }
        })
        return res.data;
    } catch (error) {
        console.error('Error Fetch Kebun :',error);
        throw error;        
    }
}