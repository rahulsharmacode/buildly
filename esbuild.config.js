import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["index.js"], // main CLI file
    bundle: true,
    platform: "node",
    target: ["node16"], // or node22
    outfile: "dist/index.js",
    sourcemap: true,
    format: "esm", // <--- important for ESM
    banner: {
      js: "", // makes it executable
    },
    external: ["inquirer", "commander", "fs", "path"], // leave these unbundled
  })
  .then(() => {
    console.log("✅ Build completed successfully!");
  })
  .catch(() => process.exit(1));
