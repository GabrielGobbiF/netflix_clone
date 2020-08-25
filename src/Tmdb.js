const API_KEY = '6376b22b39feadf1fa0646925db75eb2';
const API_BASE = 'https://api.themoviedb.org/3';


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default {
    getHomelist: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?with_network=213&language=pt-BR&api_key=${API_KEY}`),

            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/tv?with_genres=28&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/tv?with_genres=35&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/tv?with_genres=37&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/tv?with_genres=10749&language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/tv?with_genres=99&language=pt-BR&api_key=${API_KEY}`),
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    break;
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;
    }
}