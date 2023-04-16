class PageDefinitions
{
    static pages = {
        0: { name: "home", nice_name: "Home", href: "./pages/home.html" },
        1: { name: "bit-editor", nice_name: "Bit Editor", href: "./pages/biteditor.html" },
        2: { name: "contact", nice_name: "Contact", href: "./pages/contact.html" }
    }
}

class PageContainer extends HTMLElement 
{
    _currentPageIndex = 0;

    getPage(index)
    {
        return PageDefinitions.pages[index].href;
    }
    async loadPageContent(index)
    {
        var href = this.getPage(index);
        var content = await fetch(href).then(response => response.text());
        
        return content;
    }
    async loadPage(index)
    {
        var content = await this.loadPageContent(index);
        this.innerHTML = content;
    }

    connectedCallback()
    {
        this.loadPage(this._currentPageIndex);
    }
}

class PageMenu extends HTMLElement
{
    async loadMenu()
    {
        var innerHtml = '<div class="menu">';
        for(var index in PageDefinitions.pages)
        {
            var page = PageDefinitions.pages[index];
            innerHtml += '<div id="page-' + page.name + '" class="menu-item">' + page.nice_name + '</div>';
        }
        innerHtml += '</div>';
        this.innerHTML = innerHtml;
    }

    registerClickEvents()
    {
        for(let index in PageDefinitions.pages)
        {
            let page = PageDefinitions.pages[index];
            let menuButton = document.getElementById("page-" + page.name);
            if(!menuButton)
            {
                continue;
            }

            menuButton.addEventListener("click", function() {
                document.getElementsByTagName("page-container")[0].loadPage(index);
            });
        }
    }

    connectedCallback()
    {
        this.loadMenu();
        this.registerClickEvents();
    }
}

customElements.define('page-container', PageContainer);
customElements.define('page-menu', PageMenu);