const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const REGISTRY_BASE_URL = process.env.REGISTRY_BASE_URL || (isLocal ? 'http://localhost:3001' : 'https://formscn.space');

const TEMPLATE_PATH = path.join(__dirname, '../registry.template.json');
const OUTPUT_PATH = path.join(__dirname, '../registry.json');

try {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const output = template.replace(/{{BASE_URL}}/g, REGISTRY_BASE_URL);
  
  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Successfully generated registry.json with base URL: ${REGISTRY_BASE_URL}`);
} catch (error) {
  console.error('Error building registry:', error);
  process.exit(1);
}
