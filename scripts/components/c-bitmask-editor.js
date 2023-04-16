class BitmaskEditor extends HTMLElement 
{
    connectedCallback()
    {
        console.log("test");
        this.innerHTML = "BITMASK EDITOR!";
    }
}

console.log("test");
customElements.define('bitmask-editor', BitmaskEditor);