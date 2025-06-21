const fs = require('fs');
const path = require('path');

const propertyTypesDir = path.join(__dirname, '../frontend/src/components/updatedpropertyForms/property-types');

// Get all TypeScript files in the property-types directory
const files = fs.readdirSync(propertyTypesDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(propertyTypesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old MediaUpload import with new ResidentialPropertyMediaUpload
  content = content.replace(
    /import MediaUpload from "\.\.\/MediaUpload"/,
    'import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload"'
  );

  // Add propertyId state if not present
  if (!content.includes('const [propertyId, setPropertyId]')) {
    const statePattern = /const \[.*?, set.*?\] = useState.*?\n/;
    const lastStateMatch = content.match(new RegExp(statePattern, 'g'));
    if (lastStateMatch) {
      const lastState = lastStateMatch[lastStateMatch.length - 1];
      content = content.replace(
        lastState,
        lastState + '  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);\n'
      );
    }
  }

  // Update handleSubmit function to set propertyId
  content = content.replace(
    /if \(response\.data\.success\) {[^}]*}/,
    `if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.propertyId);
          toast.success('Property listing created successfully!');
          setFormData({...initialFormData} as FormData);
        }`
  );

  // Replace MediaUpload component with ResidentialPropertyMediaUpload
  content = content.replace(
    /<MediaUpload[\s\S]*?\/>/,
    `<ResidentialPropertyMediaUpload
                propertyType="${file.toLowerCase().replace('.tsx', '').replace(/^(sell|lease)/, '')}"
                propertyId={propertyId}
                value={formData.media}
                onChange={(media) => setFormData(prev => ({ ...prev, media }))}
              />`
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});

console.log('All property type components have been updated!'); 