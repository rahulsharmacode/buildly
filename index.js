#!/usr/bin/env node
import inquirer from "inquirer";
import { promises as fs } from "fs";
import { Command } from "commander";
import path from "path";
import { structures } from "./constant/structure.js";
import { templates } from "./constant/template.js";

const program = new Command();
program
  .name("react") // this is the CLI tool name
  .version("1.0.0")
  .description("React component generator CLI");

// "g" command
program
  .command("g <name>") // <name> = component name
  .description("Generate a component or folder")
  .option("--react", "Generate React component structure")
  .option("--next", "Generate Next.js folder structure")
  .option("--express", "Generate Express.js folder structure")
  .option("--no-extend", "Ignore extened folders files")

  .action((name, option) => {
    const componentPath = path.join(process.cwd(), name);
    console.log(name, option);
    createFile(name, option);
  });

const createFile = async (name, option) => {
  if (Object.keys(option)?.length >= 1) {
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

const userInputs = async () => {
  const answer = inquirer.prompt([
    {
      type: "list",
      name: "extension",
      message: "Choose a extension:",
      choices: ["JavaScript", "TypeScript"],
    },
    {
      type: "expand",
      name: "template",
      message: "Boiler template:",
      choices: [
        { key: "y", name: "Yes", value: "yes" },
        { key: "n", name: "No", value: "no" },
      ],
    },
  ]);
  return answer;
};

async function createStructure(
  type,
  folderName,
  extend = false,
  fileInfo = { extension: "JavaScript", template: "yes" }
) {
  const base = structures[type](folderName);

  // 1. Create main folder structure
  for (const folder in base) {
    if (folder === "extends") continue;

    const files = base[folder];
    const fullFolderPath = path.join(process.cwd(), folder);

    await fs.mkdir(fullFolderPath, { recursive: true });

    for (const file of files) {
      const fileName =
        fileInfo.extension === "JavaScript" ? file : file.replace(".j", ".t");
      const filePath = path.join(fullFolderPath, fileName);
      const content = getTemplate(type, file, folderName);
      await fs.writeFile(filePath, fileInfo.template == "yes" ? content : "");
    }
  }

  // 2. Extended structure inside folderName
  if (extend && base.extends) {
    for (const extraFolder in base.extends) {
      const files = base.extends[extraFolder];

      // Build: <folderName>/<extraFolder>
      const fullFolderPath = path.join(process.cwd(), folderName, extraFolder);

      await fs.mkdir(fullFolderPath, { recursive: true });

      for (const file of files) {
        const fileName =
          fileInfo.extension === "JavaScript" ? file : file.replace(".j", ".t");
        const filePath = path.join(fullFolderPath, fileName);
        const content = getTemplate(type, file, folderName, extraFolder);
        await fs.writeFile(filePath, fileInfo.template == "yes" ? content : "");
      }
    }
  }
}

function getTemplate(type, file, folderName, contentType = "") {
  const t = templates[type];
  if (!t) return "";

  // Build key: "components/index.jsx" or "forms/form.jsx"
  const key = contentType ? `${contentType}/${file}` : file;

  // Exact match
  if (t[key]) return t[key](folderName);

  // Wildcard match like *.router.js
  for (const pattern of Object.keys(t)) {
    if (pattern.startsWith("*") && file.endsWith(pattern.replace("*", ""))) {
      return t[pattern](folderName);
    }
  }

  return ""; // fallback empty file
}

const executeReact = (name, option, fileInfo) => {
  createStructure("react", name, option.extend, fileInfo);
};

const executeNext = (name, option, fileInfo) => {
  createStructure("next", name, option.extend, fileInfo);
};

const executeExpress = (name, option, fileInfo) => {
  createStructure("express", name, option.extend, fileInfo);
};

program.parse(process.argv);
