import { execSync } from 'child_process';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND_PORT = process.env.BACKEND_PORT || process.env.PORT || '3000';
const SWAGGER_URL = `http://localhost:${BACKEND_PORT}/swagger/json`;
const OUTPUT_FILE = path.join(__dirname, '../src/api/v1.d.ts');

function waitForBackend(maxAttempts = 60): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      const req = http.get(SWAGGER_URL, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          if (attempts >= maxAttempts) {
            reject(new Error(`Backend not available after ${maxAttempts} attempts`));
          } else {
            setTimeout(check, 1000);
          }
        }
      });
      req.on('error', () => {
        if (attempts >= maxAttempts) {
          reject(new Error(`Backend not available after ${maxAttempts} attempts`));
        } else {
          setTimeout(check, 1000);
        }
      });
    };
    check();
  });
}

async function generate() {
  try {
    console.log(`[@onrepeat/types] Waiting for backend at ${SWAGGER_URL}...`);
    await waitForBackend();
    
    console.log('[@onrepeat/types] Generating OpenAPI types...');
    
    // Ensure directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    execSync(`npx openapi-typescript "${SWAGGER_URL}" -o "${OUTPUT_FILE}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    console.log(`[@onrepeat/types] ✅ OpenAPI types generated at ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('[@onrepeat/types] ❌ Failed to generate OpenAPI types:', error);
    process.exit(1);
  }
}

generate();
