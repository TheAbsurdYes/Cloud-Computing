import axios from 'axios'

const consumeGeekJokesApi = async () => {
    const response = (await axios.get('https://geek-jokes.sameerkumar.website/api?format=json')).data;
    return response.joke
}

const translateTextFromEnglishToSpanish = async (text) => {
    const response =  (await axios.post('https://libretranslate.de/translate', { params: {
        q: text,
        source: 'en',
        target: 'es',
    }})).data;
    const { translatedText } = response;
    return translatedText;
}

export const apiController = async () => {
    const joke = await consumeGeekJokesApi();
    // const translatedText = await translateTextFromEnglishToSpanish(String.toString(joke));
    return joke;
}