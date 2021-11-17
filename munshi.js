/* 
  Copyright (c) 2021-present squik

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/*
  Some portions of the following code were used with the help of UNPKG
    > Website - https://unpkg.com/
    > Github - https://github.com/mjackson/unpkg
*/

let munshi = {
  Package: class {
    constructor(name, opts) {
      this.script = document.createElement("script");
      this.name = name;
      this.opts = { ...opts };
      this.doc = this.opts.doc;
      this.link = this.opts.file ? name : this.opts.middleware(this.name);
    }

    // initialises script source and extra attributes
    init = () => {
      this.script.setAttribute("src", this.link);
      this.script.setAttribute("type", this.opts.type);

      let { attributes } = this.opts;
      if (attributes)
        for (let attr in Object.keys(attributes))
          this.script.setAttribute(attr, attributes[attr]);
    };

    // appends to document, that is to say importing it
    import = () => {
      this.doc.appendChild(this.script);
    };
  },
  config: {
    middleware: (name) => "https://unpkg.com/" + name,
    importLoc: document.head,
    type: "application/javascript",

    useMiddleware: function (middleware) {
      this.middleware = middleware;
      return this;
    },
    setImportLoc: function (loc) {
      this.importLoc = loc;
      return this;
    },
    setType: function (type) {
      this.type = type;
      return this;
    },
  },
};

const require = (package, attributes) => {
  if (!package) throw new Error("Package name not specified.");

  let isFile = { ...attributes }["file"];
  if (typeof attributes === "object") delete attributes.file;

  let pkg = new munshi.Package(package, {
    type: munshi.config.type,
    middleware: munshi.config.middleware,
    doc: munshi.config.importLoc,
    file: isFile,
    attributes: { ...attributes },
  });

  pkg.init();
  pkg.import();
};
