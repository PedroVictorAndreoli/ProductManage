import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule para usar ngModel

interface Product {
  id: number;
  descricao: string;
  preco: number;
  dataValidade: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:5110/api/Produto')
      .subscribe(
        (data) => {
          this.products = data;
          this.filteredProducts = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.descricao.toLowerCase().includes(this.searchText.toLowerCase())
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
          this.fetchProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
  }

  createItem(): void {
    this.router.navigate(['/create']);
  }
}
