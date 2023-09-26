
$.validattion = function(options){
    
    function domFilter(collection){
        const requiredInputs = [];
        for(let i = 0; i<collection.length; i++){
            const item = collection[i];
            const isRequired = options.parameters.some(parameter => item.id == parameter.id && parameter.required);
            if (isRequired) {
                requiredInputs.push(item);
              }
        }
        return requiredInputs;
    }

    let result = true;

    const validationObject = {
    
        getInputs(){
          this.$inputs = options.form.querySelectorAll('input');
          this.$requiredInputs = domFilter(this.$inputs);
        },


        createError($input, txtError){
            
            let label = document.createElement('label');
            $input.classList.add('error');
            label.innerText = txtError;
            label.classList.add('errorLabel');
            $input.before(label);

        },
        

        verification(){
        this.removeError();
        for(let i = 0; i<this.$requiredInputs.length; i++){
                
                let item = this.$requiredInputs[i];
                let mask = options.parameters.find((parameter=>item.id == parameter.id)).mask;
                let txtError = options.parameters.find((parameter=>item.id == parameter.id)).textError;
                console.log(mask);
                if (!item.value.includes(mask)) {
                    this.createError(item, txtError);
                }
                console.log(i);
            }
        },


        removeError() {
            console.log(this.$requiredInputs);
            this.$requiredInputs.forEach((item) => {
              if (item.classList.contains('error')) { 
                let label = item.previousElementSibling;
                label.remove();
                item.classList.remove('error');
              }
            });
          }
          

        

    }

    function submitHandler(e){
        
        e.preventDefault();
        validationObject.getInputs();
        validationObject.verification();


    }

    validationObject._setUp = function(){
        options.form.addEventListener('submit', submitHandler);
    }

    validationObject._setUp();

    return validationObject;
     
}