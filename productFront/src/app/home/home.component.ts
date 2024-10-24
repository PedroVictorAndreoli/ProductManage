import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importando Router
import { Observable } from 'rxjs';

interface Product {
  id: number;
  descricao: string;
  preco: number;
  dataValidade: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Adicione HttpClientModule aqui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private http: HttpClient, private router: Router) {} // Injetando Router

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:5110/api/Produto')
      .subscribe(
        (data) => {
          this.products = data;
          console.log('Products fetched:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  editItem(productId: number): void {
    this.router.navigate(['/create', productId]); 
  }

  
  deleteItem(productId: number): void {
    this.http.delete(`http://localhost:5110/api/Produto/${productId}`)
      .subscribe(
        () => {
          console.log(`Product with ID ${productId} deleted successfully.`);
          // Atualiza a lista de produtos após a exclusão
          this.fetchProducts(); 
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
  }

  createItem(): void {
    this.router.navigate(['/create']); // Redirecionando para a rota de criação
  }
}
