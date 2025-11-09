#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.js
var import_inquirer = __toESM(require("inquirer"), 1);
var import_fs = require("fs");
var import_commander = require("commander");
var import_path = __toESM(require("path"), 1);

// constant/structure.js
var structures = {
  react: (folder) => ({
    [`${folder}`]: ["index.jsx"],
    extends: {
      components: ["index.jsx"],
      forms: ["form.jsx"],
      constants: ["index.js"],
      interface: ["index.js"],
      hooks: ["index.js"]
    }
  }),
  next: (folder) => ({
    [`${folder}`]: ["page.jsx"],
    extends: {
      components: ["index.jsx"],
      forms: ["form.jsx"],
      constants: ["index.js"],
      interface: ["index.js"],
      hooks: ["index.js"]
    }
  }),
  express: (folder) => ({
    [`${folder}`]: ["index.js"],
    [`${folder}/router`]: [`${folder}.router.js`],
    [`${folder}/controller`]: [`${folder}.controller.js`],
    [`${folder}/schema`]: [`${folder}.schema.js`]
  })
};

// constant/template.js
var templates = {
  react: {
    // Main folder file
    "index.jsx": (name) => `import React from "react";

export default function ${name}() {
  return <div>${name} component loaded</div>;
}
`,
    // Components
    "components/index.jsx": (name) => `import React from "react";

export default function ${name}Component() {
  return <div>${name} component loaded</div>;
}
`,
    // Forms
    "forms/form.jsx": (name) => `import React, { useState } from "react";

export default function ${name}Form({ onSubmit }) {
  const [values, setValues] = useState({});

  const handleChange = (e) =>
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) onSubmit(values);
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="example" onChange={handleChange} placeholder="Enter value" />
      <button type="submit">Submit</button>
    </form>
  );
}
`,
    // Constants
    "constants/index.js": (name) => `export const ${name.toUpperCase()} = {
  key: "${name}",
  value: "example"
};
`,
    // Interface
    "interface/index.js": (name) => `export const ${name}Interface = {
  id: "",
  name: "",
  createdAt: new Date()
};
`,
    // Hooks
    "hooks/index.js": (name) => `import { useState, useEffect } from "react";

export function use${name}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState("Hello from hook");
  }, []);

  return { state, setState };
}
`
  },
  next: {
    // page folder file
    "page.jsx": (name) => `import React from "react";

export default function ${name}() {
  return <div>${name} component loaded</div>;
}
`,
    // Components
    "components/index.jsx": (name) => `import React from "react";

export default function ${name}Component() {
  return <div>${name} component loaded</div>;
}
`,
    // Forms
    "forms/form.jsx": (name) => `import React, { useState } from "react";

export default function ${name}Form({ onSubmit }) {
  const [values, setValues] = useState({});

  const handleChange = (e) =>
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) onSubmit(values);
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="example" onChange={handleChange} placeholder="Enter value" />
      <button type="submit">Submit</button>
    </form>
  );
}
`,
    // Constants
    "constants/index.js": (name) => `export const ${name.toUpperCase()} = {
  key: "${name}",
  value: "example"
};
`,
    // Interface
    "interface/index.js": (name) => `export const ${name}Interface = {
  id: "",
  name: "",
  createdAt: new Date()
};
`,
    // Hooks
    "hooks/index.js": (name) => `import { useState, useEffect } from "react";

export function use${name}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState("Hello from hook");
  }, []);

  return { state, setState };
}
`
  },
  express: {
    "index.js": (name) => `export const ${name} = (req, res) => {
  res.send("${name} route working");
};
`,
    "*.router.js": (name) => `import { Router } from "express";
import * as controller from "../controller/${name}.controller.js";

const router = Router();

router.get("/", controller.${name});

export default router;
`,
    "*.controller.js": (name) => `export const ${name} = (req, res) => {
  res.json({ message: "${name} controller" });
};
`,
    "*.schema.js": () => `export const schema = {
  type: "object",
  properties: {}
};
`
  }
};

// index.js
var program = new import_commander.Command();
program.name("react").version("1.0.0").description("React component generator CLI");
program.command("g <name>").description("Generate a component or folder").option("--react", "Generate React component structure").option("--next", "Generate Next.js folder structure").option("--express", "Generate Express.js folder structure").option("--no-extend", "Ignore extened folders files").action((name, option) => {
  const componentPath = import_path.default.join(process.cwd(), name);
  console.log(name, option);
  createFile(name, option);
});
var createFile = async (name, option) => {
  var _a;
  if (((_a = Object.keys(option)) == null ? void 0 : _a.length) >= 1) {
    const fileInfo = await userInputs();
    if (option.react) {
      executeReact(name, option, fileInfo);
    }
    if (option.next) {
      executeNext(name, option, fileInfo);
    }
    if (option.express) {
      executeExpress(name, option, fileInfo);
    }
  }
};
var userInputs = async () => {
  const answer = import_inquirer.default.prompt([
    {
      type: "list",
      name: "extension",
      message: "Choose a extension:",
      choices: ["JavaScript", "TypeScript"]
    },
    {
      type: "expand",
      name: "template",
      message: "Boiler template:",
      choices: [
        { key: "y", name: "Yes", value: "yes" },
        { key: "n", name: "No", value: "no" }
      ]
    }
  ]);
  return answer;
};
async function createStructure(type, folderName, extend = false, fileInfo = { extension: "JavaScript", template: "yes" }) {
  const base = structures[type](folderName);
  for (const folder in base) {
    if (folder === "extends") continue;
    const files = base[folder];
    const fullFolderPath = import_path.default.join(process.cwd(), folder);
    await import_fs.promises.mkdir(fullFolderPath, { recursive: true });
    for (const file of files) {
      const fileName = fileInfo.extension === "JavaScript" ? file : file.replace(".j", ".t");
      const filePath = import_path.default.join(fullFolderPath, fileName);
      const content = getTemplate(type, file, folderName);
      await import_fs.promises.writeFile(filePath, fileInfo.template == "yes" ? content : "");
    }
  }
  if (extend && base.extends) {
    for (const extraFolder in base.extends) {
      const files = base.extends[extraFolder];
      const fullFolderPath = import_path.default.join(process.cwd(), folderName, extraFolder);
      await import_fs.promises.mkdir(fullFolderPath, { recursive: true });
      for (const file of files) {
        const fileName = fileInfo.extension === "JavaScript" ? file : file.replace(".j", ".t");
        const filePath = import_path.default.join(fullFolderPath, fileName);
        const content = getTemplate(type, file, folderName, extraFolder);
        await import_fs.promises.writeFile(filePath, fileInfo.template == "yes" ? content : "");
      }
    }
  }
}
function getTemplate(type, file, folderName, contentType = "") {
  const t = templates[type];
  if (!t) return "";
  const key = contentType ? `${contentType}/${file}` : file;
  if (t[key]) return t[key](folderName);
  for (const pattern of Object.keys(t)) {
    if (pattern.startsWith("*") && file.endsWith(pattern.replace("*", ""))) {
      return t[pattern](folderName);
    }
  }
  return "";
}
var executeReact = (name, option, fileInfo) => {
  createStructure("react", name, option.extend, fileInfo);
};
var executeNext = (name, option, fileInfo) => {
  createStructure("next", name, option.extend, fileInfo);
};
var executeExpress = (name, option, fileInfo) => {
  createStructure("express", name, option.extend, fileInfo);
};
program.parse(process.argv);
//# sourceMappingURL=index.js.map
