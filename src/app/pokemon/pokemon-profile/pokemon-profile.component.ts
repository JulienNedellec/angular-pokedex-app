import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
})
export class PokemonProfileComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemonListResponse = toSignal(
    this.pokemonService.getPokemonList().pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  deletePokemon(pokemonId: number | undefined) {
    if (typeof pokemonId === 'number') {
      this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
        this.router.navigate(['/pokemons']);
      });
    }
  }

  // Notre nouveau Signal avec la réponse HTTP "brute".
  private readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId).pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  // En attente de la réponse HTTP
  readonly loading = computed(() => !this.pokemonResponse());
  // Cas d'erreur HTTP
  readonly error = computed(() => this.pokemonResponse()?.error);
  // Cas de succès HTTP
  readonly pokemon = computed(() => this.pokemonResponse()?.value);
}
