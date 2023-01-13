import axios from "axios";

export async function fetchVoorstelling(setIsLoading, setError, setVoorstelling, id) {
    try {
        const response = await axios.get(`/api/voorstelling/${id}`).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setError(true);
        });
        setVoorstelling(response.data);
        setIsLoading(false);
    } catch {
        console.log("error");
        setIsLoading(false);
        setError(true);
    }
}
