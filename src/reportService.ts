// Report generation service
// Mixed issues for comprehensive agent testing

export class ReportService {
  // SECURITY: Hardcoded password
  private adminPassword = "FAKE_ADMIN_PASSWORD_123";

  // CODE QUALITY: Poorly named function, unclear purpose
  async doStuff(data: any, opts: any): Promise<any> {
    // TESTING: No validation of inputs
    let result: any;

    // PERFORMANCE: Inefficient filtering - multiple passes
    const filtered1 = data.filter((x: any) => x.active);
    const filtered2 = filtered1.filter((x: any) => x.verified);
    const filtered3 = filtered2.filter((x: any) => x.premium);

    // CODE QUALITY: Deep nesting
    if (opts) {
      if (opts.format) {
        if (opts.format === 'pdf') {
          if (opts.detailed) {
            if (opts.includeCharts) {
              // 5 levels deep!
              result = await this.generateDetailedPDF(filtered3);
            }
          }
        }
      }
    }

    return result;
  }

  // CODE QUALITY: Magic numbers everywhere
  calculateScore(metrics: any) {
    let score = 0;

    if (metrics.views > 1000) {
      score += 50;
    }

    if (metrics.clicks > 100) {
      score += 25;
    }

    if (metrics.conversion > 5) {
      score += 75;
    }

    return score * 1.15 + 32;
  }

  // PERFORMANCE: O(n³) algorithm!
  findPatterns(data: any[]): any[] {
    const patterns = [];

    // Triple nested loop - terrible performance!
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < data.length; k++) {
          if (data[i].value === data[j].value && data[j].value === data[k].value) {
            patterns.push([i, j, k]);
          }
        }
      }
    }

    return patterns;
  }

  // SECURITY: Path traversal vulnerability
  async loadTemplate(templateName: string): Promise<string> {
    const fs = require('fs');
    // Path traversal! User could access any file
    const path = `./templates/${templateName}`;
    return fs.readFileSync(path, 'utf8');
  }

  // TESTING: Division by zero not handled
  calculateAverage(values: number[]): number {
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length; // What if values.length === 0?
  }

  // CODE QUALITY: Massive function with everything mixed together
  async generateReport(userId: number, startDate: Date, endDate: Date, options: any) {
    console.log('Generating report...'); // Production console.log

    // Poor variable names
    let tmp1: any;
    let tmp2: any;
    let tmp3: any;
    let flag = false;
    let count = 0;

    // SECURITY: SQL injection
    const userData = await this.query(`SELECT * FROM users WHERE id = ${userId}`);

    // PERFORMANCE: N+1 queries
    const activities = await this.query(`SELECT * FROM activities WHERE user_id = ${userId}`);
    for (const activity of activities) {
      const details = await this.query(`SELECT * FROM activity_details WHERE activity_id = ${activity.id}`);
      tmp1 = details;
    }

    // CODE QUALITY: Duplicate code block
    if (options.includeMetrics) {
      const metrics = await this.query(`SELECT * FROM metrics WHERE user_id = ${userId}`);
      tmp2 = metrics.filter((m: any) => m.value > 0);
    }

    if (options.includeStats) {
      const stats = await this.query(`SELECT * FROM stats WHERE user_id = ${userId}`);
      tmp3 = stats.filter((s: any) => s.value > 0); // Same logic as above!
    }

    // PERFORMANCE: String concatenation in loop
    let reportHTML = "";
    for (let i = 0; i < 1000; i++) {
      reportHTML += "<div>Row " + i + "</div>";
    }

    // CODE QUALITY: Commented out debug code
    // console.log('Debug:', tmp1, tmp2, tmp3);
    // debugger;
    // let oldDebugVar = 123;

    // TESTING: No null checks
    const result = userData.profile.settings.preferences.theme; // Can crash!

    // SECURITY: Using insecure random
    const reportId = Math.floor(Math.random() * 1000000);

    // CODE QUALITY: TODO comments in production
    // TODO: Fix this properly
    // HACK: Quick fix for demo
    // FIXME: This is broken

    return {
      id: reportId,
      user: userData,
      data: tmp1,
      metrics: tmp2,
      stats: tmp3,
      html: reportHTML,
      flag: flag,
      count: count
    };
  }

  // Helper (mock)
  private async query(sql: string): Promise<any> {
    return [];
  }

  private async generateDetailedPDF(data: any): Promise<any> {
    return {};
  }
}

// Issues summary for this file:
// SECURITY: 3 issues (hardcoded password, SQL injection, path traversal)
// PERFORMANCE: 4 issues (O(n³), N+1, string concat, multiple filters)
// TESTING: 3 issues (no null checks, no validation, division by zero)
// CODE QUALITY: 10+ issues (naming, nesting, duplication, magic numbers, etc.)
