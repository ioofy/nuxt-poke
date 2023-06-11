import { CoreAPI } from "../core";

class PokemonService extends CoreAPI {
  async getListPokemon() {
    return await this.fetch<TPokemon>("/pokemon?offset=20&limit=20");
  }
}

export default new PokemonService();
