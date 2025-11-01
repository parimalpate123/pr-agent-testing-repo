import { User } from './types';
import crypto from 'crypto';

/**
 * Report generation service
 * Handles data analysis, scoring, and report generation
 */
export class ReportService {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  /**
   * Process and filter data
   * ✅ Fixed: Better naming than "doStuff"
   * ✅ Good: Input validation
   */
  async processData(data: any[]): Promise<any[]> {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    return data.filter(item => item && item.active === true);
  }

  /**
   * Calculate score based on metrics
   * ✅ Fixed: Magic numbers replaced with constants
   * ✅ Good: Clear scoring logic
   */
  calculateScore(metrics: { views: number; clicks: number; conversions: number }): number {
    const VIEW_WEIGHT = 0.3;
    const CLICK_WEIGHT = 0.5;
    const CONVERSION_WEIGHT = 0.2;

    return (
      metrics.views * VIEW_WEIGHT +
      metrics.clicks * CLICK_WEIGHT +
      metrics.conversions * CONVERSION_WEIGHT
    );
  }

  /**
   * Find patterns in data
   * ✅ Fixed: O(n³) → O(n²) using Map
   * ⚠️  Minor: Could be optimized further with better algorithm
   */
  findPatterns(data: number[]): number[][] {
    if (!Array.isArray(data)) {
      return [];
    }

    const patterns: number[][] = [];
    const seen = new Map<string, boolean>();

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        const pattern = [data[i], data[j]].sort();
        const key = pattern.join(',');

        if (!seen.has(key)) {
          patterns.push(pattern);
          seen.set(key, true);
        }
      }
    }

    return patterns;
  }

  /**
   * Calculate average
   * ✅ Fixed: Division by zero check
   */
  calculateAverage(numbers: number[]): number {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return 0;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }

  /**
   * Load template for reports
   * ✅ Fixed: Path traversal prevention
   * ✅ Good: Input validation
   */
  async loadTemplate(templateName: string): Promise<string> {
    // Sanitize template name to prevent path traversal
    const sanitized = templateName.replace(/[^a-zA-Z0-9_-]/g, '');

    if (sanitized !== templateName) {
      throw new Error('Invalid template name');
    }

    const query = 'SELECT content FROM templates WHERE name = ?';
    const result = await this.db.query(query, [sanitized]);

    return result[0]?.content || '';
  }

  /**
   * Generate comprehensive report
   * ✅ Fixed: SQL injection prevention
   * ✅ Fixed: N+1 query problem
   * ⚠️  Minor: Missing tests for edge cases
   * ⚠️  Minor: No error handling for network failures
   */
  async generateReport(userId: number): Promise<string> {
    if (!userId || typeof userId !== 'number') {
      throw new Error('Valid user ID required');
    }

    // Single query with JOIN instead of N+1
    const query = `
      SELECT
        u.id, u.name, u.email,
        p.id as product_id, p.name as product_name, p.price
      FROM users u
      LEFT JOIN products p ON u.id = p.userId
      WHERE u.id = ?
    `;

    const data = await this.db.query(query, [userId]);

    if (!data || data.length === 0) {
      return 'No data found for user';
    }

    // Build report using array join (efficient)
    const reportParts = [
      `<h1>Report for ${data[0].name}</h1>`,
      `<p>Email: ${data[0].email}</p>`,
      '<h2>Products:</h2>',
      '<ul>',
    ];

    for (const row of data) {
      if (row.product_id) {
        reportParts.push(
          `<li>${row.product_name} - $${row.price}</li>`
        );
      }
    }

    reportParts.push('</ul>');

    return reportParts.join('\n');
  }

  /**
   * Generate random ID
   * ✅ Fixed: Using crypto.randomUUID() for cryptographic security
   */
  generateId(): string {
    // Use Node.js crypto module for cryptographically secure random IDs
    return crypto.randomUUID();
  }
}
