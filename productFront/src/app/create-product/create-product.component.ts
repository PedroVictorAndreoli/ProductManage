import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importando ReactiveFormsModule

interface Product {
  id: number;
  descricao: string;
  preco: number;
  dataValidade: string;
}

interface ProductNoId {
  descricao: string;
  preco: number;
  dataValidade: string;
}

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule], // Adicionando ReactiveFormsModule aqui
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializando o formulário
    this.productForm = this.fb.group({
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      dataValidade: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obter o ID do produto da rota
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id; // Convertendo para número
        this.loadProduct(this.productId); // Carregar o produto para edição
      }
    });
  }

  loadProduct(productId: number): void {
    this.http.get<Product>(`http://localhost:5110/api/Produto/${productId}`)
      .subscribe(
        (product) => {
          this.productForm.patchValue(product); // Preenchendo o formulário com os dados do produto
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
  }

  saveProduct(): void {
    const product: Product = {
      id: this.productId!,
      descricao: this.productForm.value.descricao,
      preco: this.productForm.value.preco,
      dataValidade: this.productForm.value.dataValidade,
    };

    if (this.productId) {
      this.http.put(`http://localhost:5110/api/Produto`, product)
        .subscribe(
          () => {
            console.log('Product updated successfully.');
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
    } else {
      const product: ProductNoId = {
        descricao: this.productForm.value.descricao,
        preco: this.productForm.value.preco,
        dataValidade: this.productForm.value.dataValidade,
      };
  
      this.http.post(`http://localhost:5110/api/Produto`, product)
        .subscribe(
          () => {
            console.log('Product created successfully.');
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
    }
  }
}
