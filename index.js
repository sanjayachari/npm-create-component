#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

// Function to generate component template
const componentTemplate = (name, isTS) => `
import React from "react";
import "./${name}.css";

const ${name} = () => {
  return <div className="${name.toLowerCase()}">${name} Component</div>;
};

export default ${name};
`;

// Function to generate styles template
const stylesTemplate = (name) => `
.${name.toLowerCase()} {
  /* Add your styles here */
}
`;

function createComponent(componentPath) {
  if (!componentPath) {
    console.error("❌ Please provide a component path!");
    console.log("Example: create-component components/Home.jsx");
    process.exit(1);
  }

  const absolutePath = path.join(process.cwd(), componentPath);
  const ext = path.extname(componentPath); // Get file extension (.jsx or .tsx)
  const fileName = path.basename(componentPath, ext); // Extract component name
  const dirPath = path.dirname(absolutePath); // Extract directory path

  // Validate extension
  if (![".jsx", ".tsx"].includes(ext)) {
    console.error("❌ Invalid file extension! Use .jsx or .tsx");
    process.exit(1);
  }

  // Ensure directories exist
  fs.ensureDirSync(dirPath);

  // Create component and CSS files
  fs.writeFileSync(path.join(dirPath, `${fileName}${ext}`), componentTemplate(fileName, ext === ".tsx"));
  fs.writeFileSync(path.join(dirPath, `${fileName}.css`), stylesTemplate(fileName));

  console.log(`✅ Component '${fileName}${ext}' created successfully at '${dirPath}'!`);
}

// Get the component path from command-line arguments
const componentPath = process.argv[2];
createComponent(componentPath);
