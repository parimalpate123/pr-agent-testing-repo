import { Order } from './types';

// WARNING: This code has NO tests! QE Agent should catch missing test coverage

export class PaymentService {
  // No error handling for empty array!
  calculateTotal(items: { price: number; quantity: number }[]): number {
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }
    return total;
  }

  // No null check! What if order is null/undefined?
  processPayment(order: Order, cardNumber: string): boolean {
    if (cardNumber.length === 16) {
      return true;
    }
    return false;
  }

  // No validation of discount range!
  applyDiscount(amount: number, discountPercent: number): number {
    return amount * (1 - discountPercent / 100);
  }

  // Division by zero possible!
  calculateAverageOrderValue(orders: Order[]): number {
    const total = orders.reduce((sum, order) => sum + order.total, 0);
    return total / orders.length; // What if orders.length is 0?
  }

  // No error handling for API failures
  async chargeCreditCard(amount: number, cardNumber: string): Promise<boolean> {
    const response = await fetch('https://payment-api.example.com/charge', {
      method: 'POST',
      body: JSON.stringify({ amount, cardNumber })
    });

    const data = await response.json();
    return data.success;
  }

  // No boundary checking for negative amounts
  refundPayment(amount: number): boolean {
    if (amount > 0) {
      return true;
    }
    return false;
  }

  // Array access without bounds checking
  getFirstItem(items: any[]): any {
    return items[0]; // What if array is empty?
  }

  // No timeout handling
  async waitForPaymentConfirmation(orderId: number): Promise<boolean> {
    // Infinite loop potential if payment never confirms!
    while (true) {
      const status = await this.checkPaymentStatus(orderId);
      if (status === 'confirmed') {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Missing error handling for network failures
  private async checkPaymentStatus(orderId: number): Promise<string> {
    const response = await fetch(`https://api.example.com/status/${orderId}`);
    return response.text();
  }

  // No validation of input format
  parseCardNumber(input: string): string {
    return input.replace(/\s/g, ''); // What about non-numeric characters?
  }

  // Async function without proper error handling
  async processBatchPayments(orders: Order[]): Promise<void> {
    for (const order of orders) {
      await this.processPayment(order, "1234567890123456");
      // What if one fails? No rollback, no error handling!
    }
  }

  // Date handling without timezone consideration
  isPaymentExpired(paymentDate: Date): boolean {
    const now = new Date();
    const daysDiff = (now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff > 30;
  }

  // String manipulation without safety checks
  maskCardNumber(cardNumber: string): string {
    return '**** **** **** ' + cardNumber.substring(12); // What if length < 16?
  }
}

// NO TESTS FILE EXISTS!
// tests/paymentService.test.ts is missing
// Should test:
// - Empty array handling
// - Null/undefined inputs
// - Boundary values (0, negative, very large numbers)
// - Network failures
// - Timeout scenarios
// - Invalid card numbers
// - Concurrent payment processing
