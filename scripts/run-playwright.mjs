import { spawn, spawnSync } from 'node:child_process';
import http from 'node:http';

const isWindows = process.platform === 'win32';
const npx = isWindows ? 'npx.cmd' : 'npx';
const env = {
  ...process.env,
  PLAYWRIGHT_BROWSERS_PATH: '.playwright-browsers',
};

function waitForServer(url, timeoutMs = 60_000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(url, (response) => {
        response.resume();
        resolve();
      });

      request.on('error', () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}`));
          return;
        }
        setTimeout(check, 500);
      });
    };

    check();
  });
}

function stopProcessTree(child) {
  if (!child.pid) {
    return;
  }

  if (isWindows) {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    return;
  }

  child.kill('SIGTERM');
}

const server = spawn(npx, ['vite', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  env,
  stdio: ['ignore', 'inherit', 'inherit'],
});

try {
  await waitForServer('http://127.0.0.1:4173');
  const testRun = spawn(npx, ['playwright', 'test', '--reporter=list'], {
    env,
    stdio: 'inherit',
  });

  const exitCode = await new Promise((resolve) => {
    testRun.on('exit', (code) => resolve(code ?? 1));
  });

  stopProcessTree(server);
  process.exit(exitCode);
} catch (error) {
  console.error(error);
  stopProcessTree(server);
  process.exit(1);
}
