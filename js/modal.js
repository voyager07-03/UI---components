Element.prototype.appendAfter=function(element){
    element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons=[]){
    if(buttons.length==0){
        return;
    }
    const footerWrap = document.createElement('div');
    footerWrap.classList.add('modal-footer');

    buttons.forEach((btn)=>{
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add(`${btn.styleСlass}`||'');
        $btn.onclick  = btn.handler;
        footerWrap.appendChild($btn);
    })

    return footerWrap;
}



function _createModal(options){
    const modalHTML = document.createElement('div');
    modalHTML.classList.add('modalA');
    modalHTML.insertAdjacentHTML('afterbegin', 
    `
    <div class="modal-background" data-close="true">
        <div class="modal-body" style="width:${options.width || 'auto'}; height:${options.height || 'auto'}">
            <div class="modal-header">
                <h3 class="modal-title">${options.title || ''}</h3>
               ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>`:''} 
            </div>
        <div class="modal-content" data-content>
               ${options.content||''}
            </div>
        </div>
    </div>`
   )
   const footer = _createModalFooter(options.footerButtons);
   footer.appendAfter(modalHTML.querySelector('[data-content]'));
   document.body.appendChild(modalHTML);
    return modalHTML;
}


$.modal=function(options){
    const ANIMATION_SPEED = options.animationSpeed || '300';
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    let modalInterface = {
        open(){

            if(destroyed){
                return;
            }
            !closing && $modal.classList.remove('close');
           !closing && $modal.classList.add('open');
        },
        close(){
            closing=true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(()=>{
                $modal.classList.remove('hide');
                $modal.classList.add('close');
            }, ANIMATION_SPEED);
            closing=false;
        },
    }

    const listener = (e)=>{
        if(e.target.dataset.close){
            modalInterface.close();
        }
    }

    $modal.addEventListener('click', listener)
    return Object.assign(modalInterface,{destroy(){
        $modal.parentNode.removeChild($modal);
        $modal.removeEventListener('click', listener)
        destroyed = true;
    }},{setContent(html){
        $modal.querySelector('[data-content]').innerHTML=html;
    }});
}