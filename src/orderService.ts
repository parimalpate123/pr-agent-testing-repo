import { Order, User } from './types';

// WARNING: Contains performance issues for testing

export class OrderService {
  private orders: Order[] = [];
  private users: User[] = [];

  // N+1 Query Problem - fetches user for each order separately
  async getOrdersWithUsers(): Promise<any[]> {
    const orders = await this.getAllOrders();

    const result = [];
    for (const order of orders) {
      // This creates N+1 queries! Should use JOIN or eager loading
      const user = await this.getUserById(order.userId);
      result.push({
        ...order,
        user: user
      });
    }

    return result;
  }

  // Inefficient algorithm - O(n²) complexity
  async findDuplicateOrders(): Promise<Order[]> {
    const orders = await this.getAllOrders();
    const duplicates: Order[] = [];

    // Nested loop - O(n²)! Should use Set or Map for O(n)
    for (let i = 0; i < orders.length; i++) {
      for (let j = i + 1; j < orders.length; j++) {
        if (orders[i].userId === orders[j].userId &&
            orders[i].total === orders[j].total) {
          duplicates.push(orders[j]);
        }
      }
    }

    return duplicates;
  }

  // Unnecessary loop - recalculating the same thing multiple times
  async calculateUserTotals(userIds: number[]): Promise<Map<number, number>> {
    const totals = new Map<number, number>();

    for (const userId of userIds) {
      let total = 0;
      // Fetching all orders for each user separately - very inefficient!
      const userOrders = await this.getOrdersByUserId(userId);
      for (const order of userOrders) {
        total += order.total;
      }
      totals.set(userId, total);
    }

    return totals;
  }

  // Missing index - full table scan on every call
  async searchOrdersByTotal(minTotal: number): Promise<Order[]> {
    // This would cause full table scan without index on 'total' field
    return this.orders.filter(o => o.total >= minTotal);
  }

  // Memory leak - accumulating data without cleanup
  private cachedResults: any[] = [];

  async getCachedOrders(): Promise<Order[]> {
    const orders = await this.getAllOrders();
    // Memory leak! Never clearing the cache
    this.cachedResults.push(...orders);
    return this.cachedResults; // Returns growing array
  }

  // Inefficient string concatenation in loop
  generateOrderReport(orders: Order[]): string {
    let report = ""; // String concatenation in loop is slow!

    for (const order of orders) {
      report += `Order ID: ${order.id}\n`;
      report += `User ID: ${order.userId}\n`;
      report += `Total: $${order.total}\n`;
      report += `Items: ${order.items.length}\n`;
      report += "---\n";
    }

    return report; // Should use array.join() or StringBuilder pattern
  }

  // Unnecessary database calls in loop
  async processOrders(orderIds: number[]): Promise<void> {
    for (const id of orderIds) {
      // Fetching each order separately - should batch
      const order = await this.getOrderById(id);
      await this.updateOrderStatus(order);
    }
  }

  // Heavy computation in hot path
  async getOrderSummary(orderId: number): Promise<any> {
    const order = await this.getOrderById(orderId);

    // Expensive calculation that should be cached
    let itemsDescription = "";
    for (const item of order.items) {
      // Simulating expensive operation in loop
      for (let i = 0; i < 1000; i++) {
        itemsDescription = itemsDescription + "";
      }
    }

    return {
      id: order.id,
      total: order.total,
      items: order.items
    };
  }

  // Helper methods (mock implementations)
  private async getAllOrders(): Promise<Order[]> {
    return this.orders;
  }

  private async getOrderById(id: number): Promise<Order> {
    return this.orders.find(o => o.id === id)!;
  }

  private async getUserById(userId: number): Promise<User> {
    return this.users.find(u => u.id === userId)!;
  }

  private async getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orders.filter(o => o.userId === userId);
  }

  private async updateOrderStatus(order: Order): Promise<void> {
    // Mock update
  }
}
