import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-show-api-info',
  standalone: true,
  imports: [HttpClientModule, CardModule, CommonModule, PaginatorModule],
  templateUrl: './show-api-info.component.html',
  styleUrls: ['./show-api-info.component.css'],
})
export class ShowApiInfoComponent implements OnInit {
  pokemons: any[] = [];
  pokemonDetails: any[] = [];
  totalPokemons: number = 0; // Total de pokemones disponibles
  pageSize: number = 10; // Número de pokemones por página
  currentPage: number = 0; // Página actual (basada en offset)

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    const offset = this.currentPage * this.pageSize;
    this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=${offset}`)
      .subscribe(
        (response: any) => {
          this.pokemons = response.results;
          this.totalPokemons = response.count; // Total de pokemones
          this.fetchPokemonDetails();
        },
        (error) => {
          console.error('Error fetching pokemons:', error);
        }
      );
  }

  fetchPokemonDetails() {
    this.pokemonDetails = []; // Limpiar detalles antes de cargar nuevos
    const requests = this.pokemons.map((pokemon) =>
      this.http.get(pokemon.url).toPromise()
    );

    Promise.all(requests)
      .then((detailsArray: any[]) => {
        this.pokemonDetails = detailsArray.map((details) => ({
          name: details.name,
          image: details.sprites.front_default,
          abilities: details.abilities.map((a: any) => a.ability.name).join(', '),
        }));
      })
      .catch((error) => {
        console.error('Error fetching pokemon details:', error);
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.page; // Actualizar la página actual
    this.fetchPokemons(); // Volver a cargar los pokemones para la nueva página
  }
}