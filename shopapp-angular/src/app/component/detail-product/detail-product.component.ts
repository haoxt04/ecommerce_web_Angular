import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { environment } from '../../environment/environment';
import { ProductImage } from '../model/product.image';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: false,
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private categoryService: CategoryService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    // Lấy productId từ URL      
    debugger
    // this.cartService.clearCart();
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.productId = +idParam;
    }
    
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {            
          // Lấy danh sách ảnh sản phẩm và thay đổi URL
          debugger  
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              product_image.imageUrl = `${environment.apiBaseUrl}/products/images/${product_image.imageUrl}`;
            });
          }            
          debugger
          this.product = response
          // Bắt đầu với ảnh đầu tiên
          this.showImage(0);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching detail:', error);
        }
      });    
    } else {
      console.error('Invalid productId:', idParam);
    }      
  }
  showImage(index: number): void {
    debugger
    if (this.product && this.product.product_images && 
        this.product.product_images.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ        
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }        
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }
  thumbnailClick(index: number) {
    debugger
    // Gọi khi một thumbnail được bấm
    this.currentImageIndex = index; // Cập nhật currentImageIndex
  }  
  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }      
  addToCart(): void {
    debugger
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      // Xử lý khi product là null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }    
      
  increaseQuantity(): void {
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  buyNow(): void {
    this.router.navigate(['/orders']);
  }    

}
