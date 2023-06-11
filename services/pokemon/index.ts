import { CoreAPI } from "../core";

class PokemonService extends CoreAPI {
  async getListPokemon() {
    return await this.fetch<TPokemon>("/pokemon", "GET", {
      params: {
        offset: 0,
        limit: 20,
      },
    });
  }
}

export default new PokemonService();
