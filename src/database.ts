// Database connection and queries
// WARNING: This file contains intentional security vulnerabilities for testing

export class Database {
  private connectionString = "postgres://FAKE_USER:FAKE_PASSWORD_123@localhost:5432/testdb"; // Hardcoded credentials!

  // SQL Injection vulnerability - user input concatenated directly
  async getUserByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM users WHERE email = '${email}'`; // SQL INJECTION!
    return this.executeQuery(query);
  }

  // Another SQL injection
  async searchUsers(searchTerm: string): Promise<any[]> {
    const sql = "SELECT * FROM users WHERE name LIKE '%" + searchTerm + "%'"; // SQL INJECTION!
    return this.executeQuery(sql);
  }

  // Insecure password storage - plain text!
  async createUser(email: string, password: string, name: string): Promise<void> {
    const query = `INSERT INTO users (email, password, name) VALUES ('${email}', '${password}', '${name}')`; // Plain text password + SQL injection!
    await this.executeQuery(query);
  }

  // Missing authentication check
  async deleteUser(userId: number): Promise<void> {
    // No check if user has permission to delete!
    const query = `DELETE FROM users WHERE id = ${userId}`;
    await this.executeQuery(query);
  }

  // API key exposed
  private apiKey = "FAKE_API_KEY_FOR_TESTING_DO_NOT_USE_123456789"; // Hardcoded API key!

  async makeExternalApiCall(data: any): Promise<any> {
    // Using hardcoded API key
    return fetch('https://api.example.com/endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // No input validation!
    });
  }

  private async executeQuery(sql: string): Promise<any> {
    console.log('Executing:', sql);
    // Mock implementation
    return [];
  }
}
