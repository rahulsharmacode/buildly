const structures = {
  react: (folder) => ({
    [`${folder}`]: ["index.jsx"],
    extends: {
      components: ["index.jsx"],
      forms: ["form.jsx"],
      constants: ["index.js"],
      interface: ["index.js"],
      hooks: ["index.js"],
    },
  }),

  next: (folder) => ({
    [`${folder}`]: ["page.jsx"],
    extends: {
      components: ["index.jsx"],
      forms: ["form.jsx"],
      constants: ["index.js"],
      interface: ["index.js"],
      hooks: ["index.js"],
    },
  }),

  express: (folder) => ({
    [`${folder}`]: ["index.js"],
    [`${folder}/router`]: [`${folder}.router.js`],
    [`${folder}/controller`]: [`${folder}.controller.js`],
    [`${folder}/schema`]: [`${folder}.schema.js`],
  }),
};

export { structures };
