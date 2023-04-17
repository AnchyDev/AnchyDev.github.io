/*
    Name: Pageify
    Description: Allows you to create your website as a single-page application (SPA).
    Author: AnchyDev
    Version: 1.0.0
*/

const pagesMetaData = "./pages.meta";

class PageHandler extends HTMLElement
{
    _pages = [];

    getLandingPage()
    {
        for(let pageIndex in this._pages)
        {
            let page = this._pages[pageIndex];

            if(page.isLanding)
            {
                return page;
            }
        }

        console.error("Failed to find a landing page, ensure one of the pages is marked as the landing page.")

        return null;
    }

    parseHashOrDefault()
    {
        let hash = window.location.hash;

        if(!hash)
        {
            let landingPage = this.getLandingPage();
            if(!landingPage)
            {
                return null;
            }

            window.location.hash = `#${landingPage.hashName}`;
        }

        return window.location.hash;
    }

    loadPages(metadata)
    {
        this._pages = JSON.parse(metadata);
    }

    async getMetadata()
    {
       let response = await fetch(pagesMetaData);
       
       if(!response.ok)
       {
        console.error(`Received invalid response '${response.statusText}' when accessing pages metadata at '${pagesMetaData}'.`);
        return null;
       }

       let content = await response.text();

       if(!content)
       {
        console.error(`There was an error when reading '${pagesMetaData}', it may be null or empty.`)
        return null;
       }

       return content;
    }

    getPageFromHash(urlHash)
    {
        for(let pageIndex in this._pages)
        {
            let page = this._pages[pageIndex];

            if(`#${page.hashName}` === urlHash)
            {
                return page;
            }
        }

        return null;
    }

    async getPageContent(page)
    {
        let pageResponse = await fetch(page.href);
        if(!pageResponse.ok)
        {
            console.error(`Received invalid response '${pageResponse.statusText}' when accessing page content at '${page.hashName}'.`);
            return null;
        }

        return await pageResponse.text();
    }

    injectPageContent(page, content)
    {
        this.innerHTML = content;

        for(let script in page.scripts)
        {
            let scriptName = `script-${page.hashName}-${script}`;

            let scriptElement = this.querySelector(scriptName);
            if(scriptElement)
            {
                // Script element already exists.
                continue;
            }

            scriptElement = document.createElement("script");
            scriptElement.id = `script-${page.hashName}-${script}`;
            scriptElement.src = page.scripts[script];

            document.head.appendChild(scriptElement);
        }
    }

    async navigateTo(urlHash)
    {
        let page = this.getPageFromHash(urlHash);
        if(!page)
        {
            console.error(`There was an issue fetching page for url hash '${urlHash}', it may not exist.`); 
            return;
        }

        let pageContent = await this.getPageContent(page);
        if(!pageContent)
        {
            console.error(`There was an issue fetching page content for page '${page.hashName}', it may be null or empty.}`);
            return;
        }

        this.injectPageContent(page, pageContent);
    }

    async connectedCallback()
    {
        let metaData = await this.getMetadata();
        if(!metaData)
        {
            return;
        }

        this.loadPages(metaData);
        
        let urlHash = this.parseHashOrDefault();
        await this.navigateTo(urlHash);

        window.addEventListener("hashchange", () => 
        { 
            this.navigateTo(window.location.hash);
        });
    }
}

customElements.define("pages-container", PageHandler);