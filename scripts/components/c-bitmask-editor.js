class BitmaskEditor extends HTMLElement 
{
    connectedCallback()
    {
        this.innerHTML = "BITMASK EDITOR!";
    }
}

customElements.define('bitmask-editor', BitmaskEditor);