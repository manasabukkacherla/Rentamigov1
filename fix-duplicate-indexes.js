const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Path to the models directory
const modelsDir = path.join(__dirname, 'backend', 'src', 'models');
const commercialDir = path.join(modelsDir, 'commercial');

// Function to process a file
async function processFile(filePath) {
  try {
    // Read the file content
    const content = await readFileAsync(filePath, 'utf8');
    
    // Check if the file has propertyId in schema with unique: true AND also has an index
    const hasPropertyIdUnique = content.includes('propertyId: { type: String, required: true, unique: true }') || 
                            content.includes('propertyId: { type: String, unique: true }');
                            
    const hasPropertyIdIndex = content.includes('Schema.index({ propertyId: 1 }');
    
    // If both conditions are true, remove the duplicate index
    if (hasPropertyIdUnique && hasPropertyIdIndex) {
      console.log(`Fixing duplicate index in ${filePath}`);
      
      // Replace the index line with a commented version
      const updatedContent = content.replace(
        /(\w+Schema)\.index\(\{ propertyId: 1 \}.*\);/g, 
        '// $1.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index'
      );
      
      // Write the updated content back to the file
      await writeFileAsync(filePath, updatedContent, 'utf8');
      console.log(`Fixed ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Function to process all files in a directory recursively
async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else if (stat.isFile() && (filePath.endsWith('.ts') || filePath.endsWith('.js'))) {
      // Process TypeScript and JavaScript files
      await processFile(filePath);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting to fix duplicate indexes...');
    await processDirectory(modelsDir);
    console.log('Completed fixing duplicate indexes!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the script
main(); 