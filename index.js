/*

The "require" function adds a script by using unpkg,
which takes the main file specified in the package.json
file of the imported package.

Credits to UNPKG - https://unpkg.com/

*/

function require(package) {
  let script = document.createElement("script");
  let importLink = "https://unpkg.com/" + package;
  script.setAttribute("src", importLink);
  document.head.appendChild(script);
}
