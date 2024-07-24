import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonBorderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pokemonList = signal(POKEMON_LIST);

  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life - 1;
  }

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }
}
