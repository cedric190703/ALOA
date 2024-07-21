const { spawn } = require('child_process');
const { join } = require('path');

// Start the frontend
const frontend = spawn('npm', ['run', 'dev'], {
    cwd: join(__dirname, 'app-frontend'),
    stdio: 'inherit',
    shell: true,
});

// Start the backend
const backend = spawn('cross-env', ['node', '--env-file=config.env', 'server'], {
    cwd: join(__dirname, 'app-backend'),
    stdio: 'inherit',
    shell: true,
});