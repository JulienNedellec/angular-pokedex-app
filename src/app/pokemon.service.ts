import { Injectable } from '@angular/core';
import { PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // Retourne la liste de tous les Pokémons.

  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  // Retourne un Pokémon en fonction de son identifiant.

  getPokemonById(id: number) {
    const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);

    if (pokemon) {
      throw new Error("Pokémon non trouvé avec l'identifiant " + id);
    }

    return pokemon;
  }

  // Retourne la liste des types valides pour un Pokémon.

  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
    ];
  }
}
