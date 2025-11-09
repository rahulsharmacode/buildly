const templates = {
  react: {
    // Main folder file
    "index.jsx": (name) =>
      `import React from "react";

export default function ${name}() {
  return <div>${name} component loaded</div>;
}
`,
    // Components
    "components/index.jsx": (name) =>
      `import React from "react";

export default function ${name}Component() {
  return <div>${name} component loaded</div>;
}
`,

    // Forms
    "forms/form.jsx": (name) =>
      `import React, { useState } from "react";

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
    "constants/index.js": (name) =>
      `export const ${name.toUpperCase()} = {
  key: "${name}",
  value: "example"
};
`,

    // Interface
    "interface/index.js": (name) =>
      `export const ${name}Interface = {
  id: "",
  name: "",
  createdAt: new Date()
};
`,

    // Hooks
    "hooks/index.js": (name) =>
      `import { useState, useEffect } from "react";

export function use${name}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState("Hello from hook");
  }, []);

  return { state, setState };
}
`,
  },

  next: {
    // page folder file
    "page.jsx": (name) =>
      `import React from "react";

export default function ${name}() {
  return <div>${name} component loaded</div>;
}
`,
    // Components
    "components/index.jsx": (name) =>
      `import React from "react";

export default function ${name}Component() {
  return <div>${name} component loaded</div>;
}
`,

    // Forms
    "forms/form.jsx": (name) =>
      `import React, { useState } from "react";

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
    "constants/index.js": (name) =>
      `export const ${name.toUpperCase()} = {
  key: "${name}",
  value: "example"
};
`,

    // Interface
    "interface/index.js": (name) =>
      `export const ${name}Interface = {
  id: "",
  name: "",
  createdAt: new Date()
};
`,

    // Hooks
    "hooks/index.js": (name) =>
      `import { useState, useEffect } from "react";

export function use${name}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState("Hello from hook");
  }, []);

  return { state, setState };
}
`,
  },

  express: {
    "index.js": (name) =>
      `export const ${name} = (req, res) => {
  res.send("${name} route working");
};
`,

    "*.router.js": (name) =>
      `import { Router } from "express";
import * as controller from "../controller/${name}.controller.js";

const router = Router();

router.get("/", controller.${name});

export default router;
`,

    "*.controller.js": (name) =>
      `export const ${name} = (req, res) => {
  res.json({ message: "${name} controller" });
};
`,

    "*.schema.js": () =>
      `export const schema = {
  type: "object",
  properties: {}
};
`,
  },
};

export { templates };
