const getRelatedCards = async (thema) => {
    const response = await fetch('../infoCards/' + thema + ".json");
    const data = await response.json();
    return data;
}

export default getRelatedCards;