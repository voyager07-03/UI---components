export class Menu{
    static getMenuTemplate(options){
        let logo = options.logo || options.logoHTML;
        let navList = options.navList.map((item)=>{
            return `<li><a href=${item.href} class='menu-link'>${item.title}</a></li>`
        })
        
        return `<div class='menu-container'>
                    <div class='menu-logo'>${logo}</div>
                    <nav class='menu-nav'>
                        <ul class='menu-list'>
                            ${navList.join('')}
                        </ul>
                    </nav>
                </div>`
    }
    constructor(options){
        
        this.$menu = document.querySelector(options.selector);
        this.$menu.innerHTML = Menu.getMenuTemplate(options);

    }

    open(){
        console.log($menu);
    }


}
