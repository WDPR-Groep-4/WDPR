import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import config from "../../../config.json";
import Voorstelling1 from "../medewerker/Voorstelling1.json";
import Voorstelling2 from "../medewerker/Voorstelling2.json";
import Voorstelling3 from "../medewerker/Voorstelling3.json";
import AgendaItem from "./AgendaItem";
import axios from "axios";

export default function AgendaPage() {
    var voorstellingen = [Voorstelling1, Voorstelling2, Voorstelling3];
    document.title = "Agenda" + config.title;
    const [voorstellingEvents, setVoorstellingEvents] = useState([]);

    useEffect(() => {
        getVoorstellingEvents();
    }, []);

    async function getVoorstellingEvents() {
        const response = await axios
            .get("api/voorstellingevent", {
                params: {
                    PageSize: 5,
                },
            })
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            setVoorstellingEvents(response.data);
        }
        console.log(response.data);
        return response.data;
    }

    function voorstellingEventElements() {
        return voorstellingEvents.map((voorstellingEvent) => (
            <AgendaItem
                voorstellingEvent={voorstellingEvent}
                key={voorstellingEvent.id}
            />
        ));
    }

    return (
        <>
            <div style={{ position: "relative", width: "90%", height: "90%" }}>
                <Container
                    sx={{ py: 2, position: "relative", width: "90%", height: "90%" }}
                >
                    <Typography sx={{ fontSize: 42, fontWeight: "medium" }}>
                        Agenda
                    </Typography>
                </Container>
            </div>
            <Container display="flex">
                <div
                    style={{
                        alignContent: "top",
                        height: "300px",
                        position: "relative",
                        justifyContent: "center",
                        display: "block",
                        pt: 10,
                    }}
                >
                    {voorstellingEventElements()}
                </div>
            </Container>
        </>
    );
}

// [
//     {
//         voorstelling: {
//             voorstellingId: 1,
//             titel: "Soldaat van oranje",
//             beschrijving:
//                 "Soldaat van Oranje - De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken. test",
//             leeftijd: 0,
//             genre: "spannend",
//             afbeelding:
//                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwgTVW9Q0515s_Ictfu26EMKLVOacosqk36YQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1c419947164e6fa5decb0504ac194fc5ec7529749865b81cd8ebe0222d9dfa16&ipo=images",
//             banner: "https://www.soldaatvanoranje.nl/wp-content/uploads/2018/12/svo_bombardement_2.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 45,
//         datumBereik: { id: 45, van: "2023-02-07T00:00:00", tot: "2023-02-07T02:00:00" },
//         zaal: 3,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 3,
//             titel: "Charlie and the Chocolate Factory",
//             beschrijving:
//                 "Roald Dahls populairste boek komt tot leven in een spectaculaire musical vol prachtige nummers, een oogstrelend decor en geestig herkenbare personages. Charlie and the Chocolate Factory vertelt het alom bekende verhaal over Charlie die een van de gouden tickets bemachtigt waarmee hij toegang krijgt tot de mysterieuze chocoladefabriek van Willy Wonka. Deze geheimzinnige chocolademaker maakt van de felbegeerde rondleiding een ware beproeving om te bepalen wie zijn opvolger wordt.",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.londonboxoffice.co.uk/images/shows/square-poster/resized/250x250/3465-1481125005-ccfencorexmas16500x5001612.jpg",
//             banner: "https://images0.persgroep.net/rcs/1UqjsoFYdiZ8QJp6SF4Mn6bgg68/diocontent/221247746/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 52,
//         datumBereik: { id: 52, van: "2023-03-18T00:00:00", tot: "2023-03-18T02:00:00" },
//         zaal: 3,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 4,
//             titel: "Charlie and the Chocolate Factory",
//             beschrijving:
//                 "De musical The Bodyguard is gebaseerd op de wereldberoemde film met Whitney Houston en Kevin Costner en brengt het romantische en spannende verhaal van popster Rachel Marron en bodyguard Frank Farmer.",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.eventim.nl/obj/media/NL-eventim/galery/222x222/t/the-bodyguard-artist.jpg",
//             banner: "https://i.ytimg.com/vi/yaaLVagkuvU/maxresdefault.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 60,
//         datumBereik: { id: 60, van: "2023-03-25T00:00:00", tot: "2023-03-25T02:00:00" },
//         zaal: 1,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 3,
//             titel: "Charlie and the Chocolate Factory",
//             beschrijving:
//                 "Roald Dahls populairste boek komt tot leven in een spectaculaire musical vol prachtige nummers, een oogstrelend decor en geestig herkenbare personages. Charlie and the Chocolate Factory vertelt het alom bekende verhaal over Charlie die een van de gouden tickets bemachtigt waarmee hij toegang krijgt tot de mysterieuze chocoladefabriek van Willy Wonka. Deze geheimzinnige chocolademaker maakt van de felbegeerde rondleiding een ware beproeving om te bepalen wie zijn opvolger wordt.",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.londonboxoffice.co.uk/images/shows/square-poster/resized/250x250/3465-1481125005-ccfencorexmas16500x5001612.jpg",
//             banner: "https://images0.persgroep.net/rcs/1UqjsoFYdiZ8QJp6SF4Mn6bgg68/diocontent/221247746/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 51,
//         datumBereik: { id: 51, van: "2023-05-21T00:00:00", tot: "2023-05-21T02:00:00" },
//         zaal: 2,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 1,
//             titel: "Soldaat van oranje",
//             beschrijving:
//                 "Soldaat van Oranje - De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken. test",
//             leeftijd: 0,
//             genre: "spannend",
//             afbeelding:
//                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwgTVW9Q0515s_Ictfu26EMKLVOacosqk36YQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1c419947164e6fa5decb0504ac194fc5ec7529749865b81cd8ebe0222d9dfa16&ipo=images",
//             banner: "https://www.soldaatvanoranje.nl/wp-content/uploads/2018/12/svo_bombardement_2.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 44,
//         datumBereik: { id: 44, van: "2023-06-10T00:00:00", tot: "2023-06-10T02:00:00" },
//         zaal: 2,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 4,
//             titel: "Charlie and the Chocolate Factory",
//             beschrijving:
//                 "De musical The Bodyguard is gebaseerd op de wereldberoemde film met Whitney Houston en Kevin Costner en brengt het romantische en spannende verhaal van popster Rachel Marron en bodyguard Frank Farmer.",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.eventim.nl/obj/media/NL-eventim/galery/222x222/t/the-bodyguard-artist.jpg",
//             banner: "https://i.ytimg.com/vi/yaaLVagkuvU/maxresdefault.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 58,
//         datumBereik: { id: 58, van: "2023-06-17T00:00:00", tot: "2023-06-17T02:00:00" },
//         zaal: 2,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 4,
//             titel: "Charlie and the Chocolate Factory",
//             beschrijving:
//                 "De musical The Bodyguard is gebaseerd op de wereldberoemde film met Whitney Houston en Kevin Costner en brengt het romantische en spannende verhaal van popster Rachel Marron en bodyguard Frank Farmer.",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.eventim.nl/obj/media/NL-eventim/galery/222x222/t/the-bodyguard-artist.jpg",
//             banner: "https://i.ytimg.com/vi/yaaLVagkuvU/maxresdefault.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 56,
//         datumBereik: { id: 56, van: "2023-06-22T00:00:00", tot: "2023-06-22T02:00:00" },
//         zaal: 1,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 2,
//             titel: "Les Misérables",
//             beschrijving:
//                 "Het verhaal over vriendschap, vrijheid en liefde keert terug naar Nederland. Beleef de klassieker nu als nooit tevoren met een geheel nieuw decor en een sterrencast! Frankrijk in een tijd van onrust, armoede en oneerlijkheid. Na 19 jaar gevangenschap lijkt Jean Valjean zijn vrijheid tegemoet te gaan. Javert helpt hem uit de droom en laat hem weten aan welke voorwaarden hij de rest van zijn leven moet voldoen. Om hieraan te ontsnappen verscheurt Jean Valjean zijn vrijlatingsbrief en neemt een nieuwe identiteit aan. Door de jaren heen bewijst hij een goed persoon te zijn en probeert hij zijn verleden achter zich te laten. Lukt het Jean Valjean om uit handen te blijven van de geobserdeerde Javert, die hem koste wat kost wil bestraffen voor het breken met de voorwaarden?",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.eventim.nl/obj/media/NL-eventim/galery/222x222/l/LesMis-artist.jpg",
//             banner: "https://www.degraafencornelissen.nl/images/jcogs_img/cache/Foto-5-1-900x585-c-default_1_-_28de80_-_a04f1c4ee2cc65c8c575d3bfe94d358e41ee03f9.webp",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 50,
//         datumBereik: { id: 50, van: "2023-06-28T00:00:00", tot: "2023-06-28T02:00:00" },
//         zaal: 3,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 2,
//             titel: "Les Misérables",
//             beschrijving:
//                 "Het verhaal over vriendschap, vrijheid en liefde keert terug naar Nederland. Beleef de klassieker nu als nooit tevoren met een geheel nieuw decor en een sterrencast! Frankrijk in een tijd van onrust, armoede en oneerlijkheid. Na 19 jaar gevangenschap lijkt Jean Valjean zijn vrijheid tegemoet te gaan. Javert helpt hem uit de droom en laat hem weten aan welke voorwaarden hij de rest van zijn leven moet voldoen. Om hieraan te ontsnappen verscheurt Jean Valjean zijn vrijlatingsbrief en neemt een nieuwe identiteit aan. Door de jaren heen bewijst hij een goed persoon te zijn en probeert hij zijn verleden achter zich te laten. Lukt het Jean Valjean om uit handen te blijven van de geobserdeerde Javert, die hem koste wat kost wil bestraffen voor het breken met de voorwaarden?",
//             leeftijd: 0,
//             genre: "Musical",
//             afbeelding:
//                 "https://www.eventim.nl/obj/media/NL-eventim/galery/222x222/l/LesMis-artist.jpg",
//             banner: "https://www.degraafencornelissen.nl/images/jcogs_img/cache/Foto-5-1-900x585-c-default_1_-_28de80_-_a04f1c4ee2cc65c8c575d3bfe94d358e41ee03f9.webp",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 46,
//         datumBereik: { id: 46, van: "2023-07-23T00:00:00", tot: "2023-07-23T02:00:00" },
//         zaal: 3,
//     },
//     {
//         voorstelling: {
//             voorstellingId: 1,
//             titel: "Soldaat van oranje",
//             beschrijving:
//                 "Soldaat van Oranje - De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken. test",
//             leeftijd: 0,
//             genre: "spannend",
//             afbeelding:
//                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwgTVW9Q0515s_Ictfu26EMKLVOacosqk36YQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1c419947164e6fa5decb0504ac194fc5ec7529749865b81cd8ebe0222d9dfa16&ipo=images",
//             banner: "https://www.soldaatvanoranje.nl/wp-content/uploads/2018/12/svo_bombardement_2.jpg",
//             prijzenPerRang: null,
//             zaalId: 0,
//             begunstigerOnly: false,
//         },
//         id: 43,
//         datumBereik: { id: 43, van: "2023-08-29T00:00:00", tot: "2023-08-29T02:00:00" },
//         zaal: 2,
//     },
// ];
