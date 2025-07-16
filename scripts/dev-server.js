#!/usr/bin/env node

/**
 * RecoverSups Development Server
 * Advanced live reload and hot reloading for Shopify theme development
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chokidar = require('chokidar');

class DevServer {
  constructor() {
    this.processes = [];
    this.isRunning = false;
    this.config = {
      watchPaths: [
        'assets/**/*',
        'config/**/*',
        'layout/**/*',
        'locales/**/*',
        'sections/**/*',
        'snippets/**/*',
        'templates/**/*'
      ],
      ignorePaths: [
        'node_modules/**',
        '.git/**',
        '.vscode/**',
        '**/*.log',
        '**/.*'
      ],
      shopifyCommand: 'shopify theme serve --live-reload',
      sassCommand: 'sass assets/:assets/ --watch --style=expanded --no-source-map',
      themeCheckCommand: 'theme-check .',
      port: 9292,
      host: '127.0.0.1'
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    };
    
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  async start() {
    this.log('🚀 Starting RecoverSups Development Server...', 'info');
    
    // Check if Shopify CLI is available
    if (!this.checkShopifyCLI()) {
      this.log('❌ Shopify CLI not found. Please install it first.', 'error');
      return;
    }

    // Start file watchers
    this.startFileWatcher();
    
    // Start Shopify theme serve
    await this.startShopifyServe();
    
    // Start SASS watcher
    this.startSassWatcher();
    
    this.isRunning = true;
    this.log('✅ Development server started successfully!', 'success');
    this.log(`🌐 Theme preview: http://${this.config.host}:${this.config.port}`, 'info');
    this.log('👀 Watching for file changes...', 'info');
    
    // Handle process termination
    this.setupProcessHandlers();
  }

  checkShopifyCLI() {
    try {
      const result = spawn('shopify', ['version'], { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  startFileWatcher() {
    const watcher = chokidar.watch(this.config.watchPaths, {
      ignored: this.config.ignorePaths,
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('change', (filePath) => {
      this.log(`📝 File changed: ${filePath}`, 'info');
      this.handleFileChange(filePath);
    });

    watcher.on('add', (filePath) => {
      this.log(`➕ File added: ${filePath}`, 'success');
      this.handleFileChange(filePath);
    });

    watcher.on('unlink', (filePath) => {
      this.log(`🗑️ File removed: ${filePath}`, 'warning');
      this.handleFileChange(filePath);
    });

    watcher.on('error', (error) => {
      this.log(`❌ Watcher error: ${error.message}`, 'error');
    });
  }

  handleFileChange(filePath) {
    const ext = path.extname(filePath);
    
    // Handle different file types
    switch (ext) {
      case '.liquid':
        this.log('🔄 Liquid template changed - Shopify will auto-reload', 'info');
        break;
      case '.scss':
        this.log('🎨 SCSS file changed - Compiling...', 'info');
        // SASS watcher will handle this
        break;
      case '.js':
        this.log('⚡ JavaScript file changed - Reloading...', 'info');
        this.runThemeCheck();
        break;
      case '.json':
        this.log('⚙️ Configuration file changed - Reloading...', 'info');
        break;
      default:
        this.log(`📄 File changed: ${filePath}`, 'info');
    }
  }

  startShopifyServe() {
    return new Promise((resolve, reject) => {
      this.log('🛍️ Starting Shopify theme server...', 'info');
      
      const shopifyProcess = spawn('shopify', ['theme', 'serve', '--live-reload'], {
        stdio: 'inherit',
        cwd: process.cwd()
      });

      shopifyProcess.on('spawn', () => {
        this.log('✅ Shopify theme server started', 'success');
        this.processes.push(shopifyProcess);
        resolve();
      });

      shopifyProcess.on('error', (error) => {
        this.log(`❌ Shopify serve error: ${error.message}`, 'error');
        reject(error);
      });

      shopifyProcess.on('close', (code) => {
        if (code !== 0) {
          this.log(`❌ Shopify serve exited with code ${code}`, 'error');
        }
      });
    });
  }

  startSassWatcher() {
    this.log('🎨 Starting SASS watcher...', 'info');
    
    const sassProcess = spawn('sass', [
      'assets/:assets/',
      '--watch',
      '--style=expanded',
      '--no-source-map'
    ], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    sassProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Compiled')) {
        this.log('🎨 SASS compiled successfully', 'success');
      }
    });

    sassProcess.stderr.on('data', (data) => {
      const error = data.toString();
      this.log(`❌ SASS error: ${error}`, 'error');
    });

    sassProcess.on('spawn', () => {
      this.log('✅ SASS watcher started', 'success');
      this.processes.push(sassProcess);
    });

    sassProcess.on('error', (error) => {
      this.log(`❌ SASS watcher error: ${error.message}`, 'error');
    });
  }

  runThemeCheck() {
    this.log('🔍 Running theme check...', 'info');
    
    const themeCheckProcess = spawn('theme-check', ['.'], {
      stdio: 'pipe',
      cwd: process.cwd()
    });

    themeCheckProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('offenses')) {
        this.log('⚠️ Theme check found issues', 'warning');
      } else {
        this.log('✅ Theme check passed', 'success');
      }
    });

    themeCheckProcess.stderr.on('data', (data) => {
      const error = data.toString();
      this.log(`❌ Theme check error: ${error}`, 'error');
    });
  }

  setupProcessHandlers() {
    const gracefulShutdown = () => {
      this.log('🛑 Shutting down development server...', 'info');
      
      this.processes.forEach(proc => {
        if (proc && !proc.killed) {
          proc.kill('SIGTERM');
        }
      });

      setTimeout(() => {
        this.log('👋 Development server stopped', 'info');
        process.exit(0);
      }, 1000);
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGQUIT', gracefulShutdown);
  }

  async stop() {
    this.isRunning = false;
    this.processes.forEach(proc => {
      if (proc && !proc.killed) {
        proc.kill();
      }
    });
    this.log('🛑 Development server stopped', 'info');
  }
}

// CLI usage
if (require.main === module) {
  const devServer = new DevServer();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
    case undefined:
      devServer.start().catch(error => {
        console.error('Failed to start development server:', error);
        process.exit(1);
      });
      break;
    case 'stop':
      devServer.stop();
      break;
    default:
      console.log('Usage: node dev-server.js [start|stop]');
      process.exit(1);
  }
}

module.exports = DevServer;