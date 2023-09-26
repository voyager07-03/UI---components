const getAccordionTemplate = (options) => {
    let title = options.title || 'Accordion';
    let arrowDownSrc = options.arrows.downArrow.src;
    let width = options.arrows.downArrow.width || 'auto';
    let height = options.arrows.downArrow.height || 'auto';
     return  `<div class='accordion-title' data-type='open'>${title} <span class='arrow-icon' data-type='arrow'>${`<img src=${arrowDownSrc} alt='selectArrowUp' style='width:${width}; height:${height}'>` || options.arrows.downArrow.html || '&#9660;'}</span></div>
              <div class='accordion-content'>${options.content || options.contentHTML}</div>`
}
$.accordion = function(selector, options){
    let accordionInterface = {};
    accordionInterface.$el = document.querySelector(selector);
    accordionInterface._render = function(options){
        this.$el.innerHTML = getAccordionTemplate(options);
        accordionInterface._setUp();
    }
    accordionInterface.open = function(){
        this.$el.classList.add('open');
        let arrowUp = options.arrows.upArrow;
        let width = arrowUp.width || 'auto';
        let height = arrowUp.height || 'auto';
        let arrowUpHTML = options.arrows.upArrow.html
        this.$el.querySelector('.accordion-content').style.maxHeight = this.$el.querySelector('.accordion-content').scrollHeight+'px';
        this.$arrow.innerHTML = arrowUp ? `<img src = '${arrowUp.src}' alt='selectArrowUp' style='width:${width}; height:${height};'>`: arrowUpHTML || '&#9650;';
    }
    accordionInterface.close = function(){
        this.$el.classList.remove('open');
        let arrowDown = options.arrows.downArrow;
        let width = arrowDown.width || 'auto';
        let height = arrowDown.height || 'auto';
        let arrowDownHtml = options.arrows.downArrow.html;
        this.$arrow.innerHTML = arrowDown ? `<img src = '${arrowDown.src}' alt='selectArrowDown' style='width:${width}; height:${height};'>`: arrowDownHtml || '&#9660;';
        this.$el.querySelector('.accordion-content').style.maxHeight = '0px';
    }
    accordionInterface.destroy = function(){
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
    
    Object.defineProperty(accordionInterface, 'isOpen', {
        get: function() {
          return this.$el.classList.contains('open');
        }
      });

      accordionInterface.toogle=function(){
        this.isOpen ? this.close(): this.open();
    }

    function clickHandler(e){
        const {type} = e.target.dataset;
        
        if(type == 'open'){

            this.toogle();

        }
    
    
    }

    
    accordionInterface._setUp = function(){

        clickHandler = clickHandler.bind(this);
        this.$el.addEventListener('click', clickHandler);
        this.$arrow = this.$el.querySelector(`[data-type='arrow']`);

    } 

    accordionInterface._render(options);

    return accordionInterface;
};