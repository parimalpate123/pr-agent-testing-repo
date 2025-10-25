// Authentication service
// WARNING: Contains security vulnerabilities for testing

import * as crypto from 'crypto';

export class AuthService {
  private jwtSecret = "my-super-secret-key-123"; // Hardcoded JWT secret!

  // Weak password validation
  validatePassword(password: string): boolean {
    return password.length >= 4; // Too weak! Should be at least 8 characters
  }

  // Insecure token generation
  generateToken(userId: number): string {
    // Using predictable token generation
    return `token_${userId}_${Date.now()}`; // Not cryptographically secure!
  }

  // No rate limiting on login attempts
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // No rate limiting - vulnerable to brute force attacks!
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error(`User not found: ${email}`); // Information disclosure!
    }

    // Direct password comparison - should use constant-time comparison
    if (user.password === password) { // Timing attack vulnerability!
      return {
        token: this.generateToken(user.id),
        user: user
      };
    }

    throw new Error('Invalid password'); // Different error messages leak information
  }

  // Eval usage - code injection vulnerability
  async executeUserScript(userCode: string): Promise<any> {
    return eval(userCode); // CRITICAL: Code injection vulnerability!
  }

  // Command injection
  async runSystemCommand(command: string): Promise<string> {
    const { execSync } = require('child_process');
    return execSync(command).toString(); // Command injection!
  }

  // XSS vulnerability - no sanitization
  renderUserProfile(username: string): string {
    return `<div class="profile">
      <h1>Welcome ${username}</h1>
    </div>`; // XSS vulnerability - user input not sanitized!
  }

  // Insecure random number generation
  generateResetCode(): string {
    return Math.floor(Math.random() * 1000000).toString(); // Not cryptographically secure!
  }

  private async getUserByEmail(email: string): Promise<any> {
    // Mock implementation
    return {
      id: 1,
      email: email,
      password: 'password123' // Plain text password!
    };
  }
}
