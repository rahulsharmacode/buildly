import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["index.js"], // your main CLI file
    bundle: true,
    platform: "node", // Node.js CLI
    target: ["node16"], // or your Node.js version
    outfile: "dist/index.js",
    sourcemap: true,
    banner: {
      js: "", // make it executable
    },
    external: ["inquirer", "commander"], // leave external dependencies unbundled if you want
  })
  .then(() => {
    console.log("✅ Build completed successfully!");
  })
  .catch(() => process.exit(1));
