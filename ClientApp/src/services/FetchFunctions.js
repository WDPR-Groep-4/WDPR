import axios from "axios";

export function getVoorstellingen() {
    return axios.get("/api/voorstelling").then((response) => response.data);
}
