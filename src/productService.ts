import { User } from './types';

// Interfaces for product and related types
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  userId: number;
  category?: string;
  tags?: string[];
  script?: string;
  command?: string;
}

// Product management service
// Contains: Security issues, Performance problems, Missing tests, Code quality issues

export class ProductService {
  // SECURITY: Hardcoded API key
  private apiKey = "FAKE_STRIPE_KEY_DO_NOT_USE_IN_PROD";
  private db: any;

  // CODE QUALITY: Poor naming, unclear purpose
  constructor(d: any) {
    this.db = d;
  }

  // SECURITY: SQL Injection vulnerability
  // PERFORMANCE: N+1 query problem
  // TESTING: No tests for empty results, null handling
  async getProducts(category: string): Promise<(Product & { user: User })[]> {
    // SQL INJECTION! User input directly in query
    const query = `SELECT * FROM products WHERE category = '${category}'`;
    const products: Product[] = await this.db.query(query);

    // N+1 PROBLEM! Fetching user for each product separately
    const results: (Product & { user: User })[] = [];
    for (const product of products) {
      const user: User[] = await this.db.query(`SELECT * FROM users WHERE id = ${product.userId}`);
      results.push({ ...product, user: user[0] });
    }

    return results;
  }

  // CODE QUALITY: Duplicate code (similar to above)
  // PERFORMANCE: Same N+1 issue
  async getFeaturedProducts(tag: string): Promise<(Product & { user: User })[]> {
    const query = `SELECT * FROM products WHERE tags LIKE '%${tag}%'`; // SQL INJECTION again!
    const products: Product[] = await this.db.query(query);

    const results: (Product & { user: User })[] = [];
    for (const product of products) {
      const user: User[] = await this.db.query(`SELECT * FROM users WHERE id = ${product.userId}`);
      results.push({ ...product, user: user[0] });
    }

    return results;
  }

  // CODE QUALITY: Function too long (>100 lines coming up)
  // PERFORMANCE: Inefficient algorithm O(n²)
  // TESTING: No tests for edge cases
  async processProductBatch(data: any) {
    // Poor variable naming
    let tmp = [];
    let x = 0;
    let flag = false;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i !== j) {
          // O(n²) algorithm - should use Set or Map
          if (data[i].name === data[j].name) {
            tmp.push(data[i]);
            x++;
            flag = true;
          }
        }
      }

      // SECURITY: eval() usage - code injection!
      if (data[i].script) {
        eval(data[i].script); // CRITICAL VULNERABILITY!
      }

      // CODE QUALITY: Nested conditions
      if (data[i].price) {
        if (data[i].price > 0) {
          if (data[i].price < 10000) {
            if (data[i].stock) {
              if (data[i].stock > 0) {
                // Deeply nested logic - hard to read
                tmp.push(data[i]);
              }
            }
          }
        }
      }

      // PERFORMANCE: String concatenation in loop
      let description = "";
      for (let k = 0; k < 100; k++) {
        description += data[i].name + " "; // Slow!
      }

      // CODE QUALITY: Magic numbers
      if (data[i].stock > 42) {
        x = x + 7;
      }

      // SECURITY: Command injection
      if (data[i].command) {
        const { execSync } = require('child_process');
        execSync(data[i].command); // COMMAND INJECTION!
      }

      // TESTING: No null checks
      const result = data[i].metadata.nestedValue.deepProperty; // Can throw!

      // CODE QUALITY: Commented out code
      // if (data[i].oldField) {
      //   doSomething();
      // }
      // let oldVar = 123;
      // processOldWay(oldVar);

      // PERFORMANCE: Unnecessary API calls in loop
      await this.db.query(`UPDATE products SET views = views + 1 WHERE id = ${data[i].id}`);

      // CODE QUALITY: Console.log in production code
      console.log('Processing item:', i, data[i]);

      // More nested loops for bad performance
      for (let m = 0; m < data.length; m++) {
        for (let n = 0; n < data.length; n++) {
          tmp.push({ m, n });
        }
      }

      flag = !flag;
    }

    // CODE QUALITY: Unclear return value
    return { tmp, x, flag };
  }

  // SECURITY: XSS vulnerability
  // TESTING: No tests for malicious input
  renderProductHTML(name: string, description: string) {
    // XSS! User input not sanitized
    return `
      <div class="product">
        <h2>${name}</h2>
        <p>${description}</p>
      </div>
    `;
  }

  // Consolidated product validation method
  validateProduct(product: Product): boolean {
    return !!(product.name && 
             product.name.length >= 3 && 
             product.price && 
             product.price > 0 && 
             product.stock !== undefined && 
             product.stock >= 0);
  }

  // Improved caching with type safety
  private cache: Product[] = [];

  async getCachedProduct(id: number): Promise<Product | undefined> {
    const product: Product[] = await this.db.query(`SELECT * FROM products WHERE id = ${id}`);
    const foundProduct = product[0];
    
    if (foundProduct) {
      this.cache.push(foundProduct);
    }
    
    return foundProduct; // Return undefined if no product found
  }

  // TESTING: Missing tests for:
  // - Empty arrays
  // - Null/undefined inputs
  // - Network failures
  // - Concurrent access
  // - Invalid data types
}

// NO TESTS EXIST FOR THIS FILE!
