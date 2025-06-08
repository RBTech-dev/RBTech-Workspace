import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'rbtech-simple-component',
  templateUrl: './simple-component.component.html',
  styleUrls: ['./simple-component.component.scss'],
})
export class SimpleComponentComponent {
  private readonly httpClient = inject(HttpClient);

  public randomPokedexNumber = this.getRandomNumber(1, 1025);
  public randomPokemon = toSignal(
    this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${this.randomPokedexNumber}`,
    ),
    { initialValue: null },
  );

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
