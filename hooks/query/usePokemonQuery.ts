import { useQuery } from "@tanstack/vue-query";
import { pokemonAPI } from "~/services";

export const useGetAllPokemon = () => {
  return useQuery(
    ["list-pokemon"],
    async () => await pokemonAPI.getListPokemon(),
    { keepPreviousData: true }
  );
};
