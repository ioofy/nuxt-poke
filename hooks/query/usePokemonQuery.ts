export const useGetAllPokemon = () => {
  return useFetch<TPokemon>("https://pokeapi.co/api/v2/pokemon", {
    params: {
      ofsset: 0,
      limit: 10,
    },
  });
};
