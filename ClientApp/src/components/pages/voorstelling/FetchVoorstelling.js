import axios from "axios";

export async function fetchVoorstelling(setIsLoading, setError, setVoorstellingEvent, id) {
    try {
        const response = await axios.get(`/api/voorstelling/event/${id}`).catch((err) => {
            console.log(err);
            setIsLoading(false);
            setError(true);
        });
        setVoorstellingEvent(response.data);
        setIsLoading(false);
    } catch {
        console.log("error");
        setIsLoading(false);
        setError(true);
    }
}
