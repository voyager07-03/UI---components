

const getSelectTemplate = (options) =>{

    let txt = options.placeholder || 'Выберите элемент';
    let arrowDownSrc = options.arrows.downArrow.src;
    let width = options.arrows.downArrow.width || 'auto';
    let height = options.arrows.downArrow.height || 'auto';
    const selectItems = options.data.map(option=>{ 

        let cls = '';

        if(option.id == options.selectedId){
            txt = option.value;
            cls = 'selected';
        }        
        return `<li class='select-item ${cls}' data-type='option' data-id = ${option.id}>${option.value}</li>`})
 
    return  `<div class='select-backdrop' data-type='backdrop'></div>
                <div class="select-input" data-type="input">
                    <span class="select-input-content" data-type='value'>${txt || 'Выбрать элемент'}</span>
                    <span class="select-input-arrow" data-type='arrow' style='pointer-events:none;'>
                        ${`<img src=${arrowDownSrc} alt='selectArrowUp' style='width:${width}; height:${height}'>` || options.arrows.downArrow.html || '&#9660;'}
                    </span>
                </div>
                <div class="select-dropdown">
                    <ul class="select-list">
                        ${selectItems.join('')}
                    </ul>
                </div>`
}

$.select = function(selector, options){

    let selectInterface = {};


    selectInterface.$el = document.querySelector(selector);
    selectInterface.options = options;
    this.selectedId = selectInterface.options.selectedId || null;
    console.log(this.selectedId);
    

    selectInterface.open = function(){

        let arrowUp = options.arrows.upArrow;
        let width = arrowUp.width || 'auto';
        let height = arrowUp.height || 'auto';
        let arrowUpHTML = options.arrows.upArrow.html
        this.$el.classList.add('open');
        this.$arrow.innerHTML = arrowUp ? `<img src = '${arrowUp.src}' alt='selectArrowUp' style='width:${width}; height:${height};'>`: arrowUpHTML || '&#9650;';

    }
    selectInterface.close = function(){
        let arrowDown = options.arrows.downArrow;
        let width = arrowDown.width || 'auto';
        let height = arrowDown.height || 'auto';
        let arrowDownHtml = options.arrows.downArrow.html;
        this.$el.classList.remove('open');
        this.$arrow.innerHTML = arrowDown ? `<img src = '${arrowDown.src}' alt='selectArrowDown' style='width:${width}; height:${height};'>`: arrowDownHtml || '&#9660;';
    }

    selectInterface.destroy = function(e){
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }

    Object.defineProperty(selectInterface, 'isOpen', {
        get: function() {
          return this.$el.classList.contains('open');
        }
      });

      Object.defineProperty(selectInterface, 'currentSelected', {
        get: function() {
          return this.options.data.find(item=>item.id == this.selectedId);
        }
      });

    selectInterface.toogle=function(){
        this.isOpen ? this.close(): this.open();
    }

    selectInterface.select = function(id){
        this.selectedId = id;
        this.$value.textContent = this.currentSelected.value;
        this.$el.querySelectorAll(`[data-type='option']`).forEach((el)=>el.classList.remove('selected')); 
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');
        this.options.onSelect ? this.options.onSelect(this.currentSelected) : null
    }
        
    function clickHandler(e){
        const {type} = e.target.dataset;
        
        if(type == 'input'){

            this.toogle();

        }else if(type=='option'){
            const id = e.target.dataset.id;
            this.select(id);
        }else if(type=='backdrop'){
          selectInterface.close();
        }
    
    
    }

    selectInterface._setUp = function(){

        clickHandler = clickHandler.bind(this);
        this.$el.addEventListener('click', clickHandler);
        this.$arrow = this.$el.querySelector(`[data-type='arrow']`);
        this.$value = this.$el.querySelector(`[data-type='value']`);
    } 
    
    selectInterface._render = function(){
        this.$el.classList.add('select');
        this.$el.innerHTML = getSelectTemplate(this.options);
        selectInterface._setUp();
    }
    
    selectInterface._render();

    return selectInterface;
}