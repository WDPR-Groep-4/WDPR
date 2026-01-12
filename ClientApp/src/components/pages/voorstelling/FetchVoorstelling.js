import axios from "axios";

export async function fetchVoorstelling(setIsLoading, setError, setVoorstellingEvent, id) {
    try {
        const response = await axios.get(`/api/voorstelling/event/${id}`);
        if (response && response.data && typeof response.data === 'object') {
            setVoorstellingEvent(response.data);
            setIsLoading(false);
        } else {
             throw new Error("Invalid response data");
        }
    } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(true);
    }
}
