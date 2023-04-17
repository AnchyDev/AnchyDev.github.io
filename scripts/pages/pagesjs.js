class PageDefinitions
{
    static pages = {
        0: { name: "home", nice_name: "Home", href: "./pages/home.html" },
        1: { name: "bit-editor", nice_name: "Bit Editor", href: "./pages/biteditor.html", scripts: [ "./scripts/components/c-bitmask-editor.js" ] },
        2: { name: "contact", nice_name: "Contact", href: "./pages/contact.html" }
    }
}

class PageContainer extends HTMLElement 
{
    _currentPageIndex = 0;

    getPage(index)
    {
        return PageDefinitions.pages[index];
    }
    async loadPageContent(index)
    {
        let href = this.getPage(index).href;
        let content = await fetch(href).then(response => response.text());
        
        return content;
    }
    async loadPage(index)
    {
        let page = this.getPage(index);

        window.location.hash = "#" + page.name;
        let content = await this.loadPageContent(index);
        let scripts = PageDefinitions.pages[index].scripts;

        for(let script in scripts)
        {
            let scriptId = "script-" + page.name;
            if(document.querySelector("#" + scriptId))
            {
                // Don't re-add script if it already exists.
                continue;
            }
            let scriptSrc = scripts[script];
            let scriptTag = document.createElement('script');
            scriptTag.type = "text/javascript";
            scriptTag.src = scriptSrc;
            scriptTag.id = scriptId;
            document.head.appendChild(scriptTag);
        }

        this.innerHTML = content;
    }

    getIndexFromHash()
    {
        let hash = window.location.hash;

        for(let pageIndex in PageDefinitions.pages)
        {
            let page = PageDefinitions.pages[pageIndex];
            if(hash === "#"+ page.name)
            {
                return pageIndex;
            }
        }

        return null;
    }

    connectedCallback()
    {
        window.addEventListener("hashchange", () => { this.loadPage(this.getIndexFromHash()); });

        let pageIndex = this.getIndexFromHash();

        if(pageIndex)
        {
            this._currentPageIndex = pageIndex;
        }

        this.loadPage(this._currentPageIndex);
    }
}

customElements.define('page-container', PageContainer);