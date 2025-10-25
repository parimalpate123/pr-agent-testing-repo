# PR Agent Testing Repository

This repository contains sample TypeScript code with intentional issues to test the PR Agent's capabilities.

## Test Branches

Each branch demonstrates different types of issues that specific agents should catch:

### 1. `test/security-issues` - Security Agent Test
**Issues to catch:**
- SQL injection vulnerabilities
- Hardcoded credentials
- Missing authentication checks
- Insecure password storage
- Missing input validation

### 2. `test/performance-issues` - Performance Agent Test
**Issues to catch:**
- N+1 query problems
- Inefficient algorithms (O(n²) instead of O(n))
- Missing database indexes
- Unnecessary loops
- Memory leaks

### 3. `test/missing-tests` - QE Agent Test
**Issues to catch:**
- No unit tests
- Missing edge case handling
- No error handling tests
- Missing integration tests

### 4. `test/code-quality` - Code Guru Quality Agent Test
**Issues to catch:**
- Code duplication
- Poor naming conventions
- Large functions (>100 lines)
- Missing documentation
- Complex nested logic

### 5. `test/comprehensive` - Comprehensive Agent Test
**Issues to catch:**
- Mixed issues from all categories
- Tests the comprehensive multi-perspective review

## Usage

1. Create PRs from each test branch to `main`
2. Comment `@agent [type]` to test specific agents
3. Comment `@agent comprehensive` to test full multi-perspective review

## Baseline (main branch)

The main branch contains clean, simple code as a baseline for comparison.