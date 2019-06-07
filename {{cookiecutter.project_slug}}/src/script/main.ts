/**
 * Define the greeting text in index.html.
 *
 * @param name greeting name
 */
export function hello(name="World") {
    document.querySelector("#greeting").innerHTML = `Hello, ${name}`
    return
}
