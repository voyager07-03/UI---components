
const myModal = $.modal({
    title:"My modal",
    closable:true,
    content:`<p>no pain</p>
            <p>no gain</p>`,
    width:"700px",
    height:'500px',
    footerButtons:[{text:'button1',styleСlass:'btn', handler(){console.log('clicked on btn1'); myModal.close()}},{text:'button2',styleСlass:'btn',handler(){console.log('clicked on btn1')}}],
    animationSpeed:'',
});


const mySelect = $.select('#select',{
    placeholder:'Выберите элемент',
    data:[{id:1, value:'A'},
          {id:2, value:'B'},  
          {id:3, value:'C'},  
          {id:4, value:'D'},  
          {id:5, value:'F'},  
        ],
    selectedId: 2,
    onSelect(item){
        return item;
    },
    arrows:{
        upArrow:{
            src:'arrowUp.svg',
            html:'',
        },
        downArrow:{
            src:'arrowDown.svg',
            html:'',
            width: '40px;',
            height: '20px',
        }}
});


const validattion = $.validattion({
    form: document.querySelector('.form'),
    parameters: [{mask:'@', required: true, textError:'ffff', id:'name',}, {mask:'e', textError:'fffff', id:'phone', required: true}],

})

const accordion = $.accordion('.accordion',{
    title: 'Accordion1',
    arrows:{
        upArrow:{
            src:'arrowUp.svg',
            html:'',
        },
        downArrow:{
            src:'arrowDown.svg',
            html:'',
            width: '40px;',
            height: '20px',
        }},
    content:`<p>ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
             <p>ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>
             <p>ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</p>`,
});

