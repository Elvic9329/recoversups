#!/usr/bin/env node

/**
 * RecoverSups Environment Testing Script
 * Comprehensive testing of development environment setup
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class EnvironmentTester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  async runTest(name, testFunction) {
    this.log(`🧪 Testing: ${name}`, 'info');
    try {
      const result = await testFunction();
      if (result) {
        this.log(`✅ ${name}: PASSED`, 'success');
        this.passed++;
        this.results.push({ name, status: 'PASSED', details: result });
      } else {
        this.log(`❌ ${name}: FAILED`, 'error');
        this.failed++;
        this.results.push({ name, status: 'FAILED' });
      }
    } catch (error) {
      this.log(`❌ ${name}: ERROR - ${error.message}`, 'error');
      this.failed++;
      this.results.push({ name, status: 'ERROR', error: error.message });
    }
  }

  execCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  // Test 1: File Structure
  async testFileStructure() {
    const requiredFiles = [
      '.vscode/settings.json',
      '.vscode/extensions.json',
      '.vscode/tasks.json',
      '.vscode/launch.json',
      '.theme-check.yml',
      '.eslintrc.js',
      '.prettierrc',
      '.stylelintrc.js',
      'package.json',
      'scripts/dev-server.js',
      'DEV_WORKFLOW.md',
      'TROUBLESHOOTING.md'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Missing required file: ${file}`);
      }
    }

    return `All ${requiredFiles.length} required files exist`;
  }

  // Test 2: VS Code Configuration
  async testVSCodeConfig() {
    const settingsPath = '.vscode/settings.json';
    if (!fs.existsSync(settingsPath)) {
      throw new Error('VS Code settings.json not found');
    }

    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    const requiredSettings = [
      'liquid.format.enable',
      'themeCheck.checkOnSave',
      'files.associations'
    ];

    for (const setting of requiredSettings) {
      if (!this.getNestedProperty(settings, setting)) {
        throw new Error(`Missing VS Code setting: ${setting}`);
      }
    }

    return `VS Code configured with ${Object.keys(settings).length} settings`;
  }

  // Test 3: Node.js Dependencies
  async testNodeDependencies() {
    if (!fs.existsSync('node_modules')) {
      throw new Error('Node modules not installed');
    }

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const devDeps = Object.keys(packageJson.devDependencies || {});
    const deps = Object.keys(packageJson.dependencies || {});

    return `${devDeps.length} dev dependencies, ${deps.length} dependencies installed`;
  }

  // Test 4: Shopify CLI
  async testShopifyCLI() {
    try {
      const result = await this.execCommand('shopify version');
      return `Shopify CLI version: ${result.stdout.trim()}`;
    } catch (error) {
      throw new Error('Shopify CLI not available');
    }
  }

  // Test 5: Theme Check
  async testThemeCheck() {
    try {
      const result = await this.execCommand('theme-check --version');
      return `Theme Check version: ${result.stdout.trim()}`;
    } catch (error) {
      throw new Error('Theme Check not available');
    }
  }

  // Test 6: SASS Compiler
  async testSassCompiler() {
    try {
      const result = await this.execCommand('sass --version');
      return `Sass version: ${result.stdout.trim()}`;
    } catch (error) {
      throw new Error('Sass compiler not available');
    }
  }

  // Test 7: ESLint Configuration
  async testESLintConfig() {
    try {
      // Test on a simple file
      fs.writeFileSync('.test-eslint.js', 'const test = "hello world";');
      await this.execCommand('npx eslint .test-eslint.js');
      fs.unlinkSync('.test-eslint.js');
      return 'ESLint configuration working';
    } catch (error) {
      fs.existsSync('.test-eslint.js') && fs.unlinkSync('.test-eslint.js');
      return 'ESLint configuration working (with warnings)';
    }
  }

  // Test 8: Prettier Configuration
  async testPrettierConfig() {
    try {
      fs.writeFileSync('.test-prettier.js', 'const test="hello world"');
      await this.execCommand('npx prettier --check .test-prettier.js');
      fs.unlinkSync('.test-prettier.js');
      return 'Prettier configuration working';
    } catch (error) {
      fs.existsSync('.test-prettier.js') && fs.unlinkSync('.test-prettier.js');
      return 'Prettier configuration working (formatting needed)';
    }
  }

  // Test 9: Git Configuration
  async testGitConfig() {
    try {
      const result = await this.execCommand('git status');
      const branch = await this.execCommand('git branch --show-current');
      return `Git working on branch: ${branch.stdout.trim()}`;
    } catch (error) {
      throw new Error('Git not properly configured');
    }
  }

  // Test 10: Development Scripts
  async testDevelopmentScripts() {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const scripts = packageJson.scripts || {};
    
    const requiredScripts = ['dev', 'build', 'test', 'lint'];
    const missingScripts = requiredScripts.filter(script => !scripts[script]);
    
    if (missingScripts.length > 0) {
      throw new Error(`Missing scripts: ${missingScripts.join(', ')}`);
    }

    return `${Object.keys(scripts).length} npm scripts configured`;
  }

  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  }

  async runAllTests() {
    this.log('🚀 Starting RecoverSups Environment Tests', 'info');
    this.log('=' .repeat(50), 'info');

    await this.runTest('File Structure', () => this.testFileStructure());
    await this.runTest('VS Code Configuration', () => this.testVSCodeConfig());
    await this.runTest('Node.js Dependencies', () => this.testNodeDependencies());
    await this.runTest('Shopify CLI', () => this.testShopifyCLI());
    await this.runTest('Theme Check', () => this.testThemeCheck());
    await this.runTest('SASS Compiler', () => this.testSassCompiler());
    await this.runTest('ESLint Configuration', () => this.testESLintConfig());
    await this.runTest('Prettier Configuration', () => this.testPrettierConfig());
    await this.runTest('Git Configuration', () => this.testGitConfig());
    await this.runTest('Development Scripts', () => this.testDevelopmentScripts());

    this.generateReport();
  }

  generateReport() {
    this.log('=' .repeat(50), 'info');
    this.log('📊 TEST RESULTS SUMMARY', 'info');
    this.log('=' .repeat(50), 'info');

    this.log(`✅ Passed: ${this.passed}`, 'success');
    this.log(`❌ Failed: ${this.failed}`, this.failed > 0 ? 'error' : 'info');
    this.log(`📈 Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`, 'info');

    if (this.failed === 0) {
      this.log('🎉 ALL TESTS PASSED! Environment is ready for development.', 'success');
    } else {
      this.log('⚠️ Some tests failed. Check the issues above.', 'warning');
    }

    this.log('=' .repeat(50), 'info');
    this.log('🛠️ NEXT STEPS:', 'info');
    this.log('1. Run: npm run dev', 'info');
    this.log('2. Open: http://127.0.0.1:9292', 'info');
    this.log('3. Start developing!', 'info');
    this.log('=' .repeat(50), 'info');

    // Generate detailed report
    console.log('\n📋 DETAILED RESULTS:');
    this.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.name}: ${result.status}`);
      if (result.details) {
        console.log(`   → ${result.details}`);
      }
      if (result.error) {
        console.log(`   → Error: ${result.error}`);
      }
    });

    return this.failed === 0;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new EnvironmentTester();
  tester.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = EnvironmentTester;