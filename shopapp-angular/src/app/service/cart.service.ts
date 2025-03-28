import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cart: Map<number, number> = new Map();   
    // Dùng Map để lưu trữ giỏ hàng: key là id sản phẩm. value là số lượng
    constructor(private productService: ProductService) {
        // lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
        const storedCart = localStorage.getItem('cart');
        if(storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
        }
    }
    addToCart(productId: number, quantity: number = 1): void {
        debugger
        if(this.cart.has(productId)) {
            // nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên quantity
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        }else {
            // nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số
            // lượng là quantity
            this.cart.set(productId, quantity);
        }
        // sau khi thay đổi giỏ hàng lưu nó vào localStorage
        this.saveCartToLocalStorage();
    }

    getCart(): Map<number, number> {
        return this.cart;
    }
    // lưu giỏ hàng vào localStorage
    saveCartToLocalStorage():void {
        debugger
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
    // Hàm xóa dữ liệu giỏ hàng và cập nhật Local Storage
    clearCart(): void {
        this.cart.clear();   //Xóa toàn bộ dữ liệu trong giỏ hàng
        this.saveCartToLocalStorage()   // Lưu giỏ hàng mới vào Local Storage(trống)
    }

}