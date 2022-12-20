function checkLeegVeld(form, setError, isLoginIn) {
    const formData = form.current;

    let dataArray = [];

    if (!isLoginIn) {
        dataArray = [
            { name: "voornaam", value: formData["voornaam"].value },
            { name: "email", value: formData["email"].value },
            { name: "wachtwoord", value: formData["wachtwoord"].value },
            { name: "herhaalWachtwoord", value: formData["herhaalWachtwoord"].value },
        ];
    } else {
        dataArray = [
            { name: "email", value: formData["email"].value },
            { name: "wachtwoord", value: formData["wachtwoord"].value },
        ];
    }

    // checken of er lege velden zijn
    const emptyFields = dataArray.filter((field) => field.value === "");
    if (emptyFields.length > 1) {
        setError(
            "Vul de volgende velden in: " +
                emptyFields.map((field) => field.name).join(", ")
        );
        return true;
    } else if (emptyFields.length === 1) {
        setError("Vul het volgende veld in: " + emptyFields[0].name);
        return true;
    }
    return false;
}

export default checkLeegVeld;
