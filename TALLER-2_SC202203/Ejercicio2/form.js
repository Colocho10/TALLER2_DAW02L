const enviar = document.querySelector('.enviar')
const overlay = document.querySelector('.recibo-div')
const recibo = document.querySelector('.template-recibo')
const combos = document.querySelectorAll('input[name="combo"]')
const checkbox = document.querySelectorAll('input[class="checkbox"]')
const comDiv = document.querySelector('.comentario-target')
const comInp = document.querySelector('.comentario-input')
const total = document.querySelector('.total-target')
const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
let typing = false

class Pedido {
    constructor(productos){
        this.productos = productos
    }

    getTotal(){
        let aux = 0
        for(let i = 0; i < this.productos.length; i++){
            aux = parseFloat(aux) + parseFloat(this.productos[i].precio)
        }
        return aux
    }
}

const menus = [
    {   nombre: "Super combo",
        precio: 7.25},
    {   nombre: "Combo personal",
        precio: 5.75},
    {   nombre: "Combo nfantil",
        precio: 3.50}
]

const productos = [
    {   nombre: "ensalada",
        precio: 1.50},
    {   nombre: "papa frita",
        precio: 1.20},
    {   nombre: "Pieza grande",
        precio: 1.75},
    {   nombre: "Pieza mediana",
        precio: 1.50},
    {   nombre: "Pieza pequeña",
        precio: 1.25},
    {   nombre: "bebida grande",
        precio: 1.50},
    {   nombre: "bebida mediana",
        precio: 1.25},
    {   nombre: "bebida pequena",
        precio: 1.00},
    {   nombre: "cafe",
        precio: 0.50},
    {   nombre: "postre",
        precio: 1.25}
]

function get_selected_combo(){
    for(let i = 0; i < combos.length; i++){
        if(combos[i].checked == true){
            return i
        }
        continue
    }
}

function actualize_active_checkbox(){
    checkbox.forEach(checkbox=>{
        if(checkbox.checked){
            checkbox.parentNode.classList.add('active-product')
        }else{
            checkbox.parentNode.classList.remove('active-product')
        }
    })
}

function show_total(toShow){
    total.value = formater.format(toShow)
}

function get_selected_poducts_indexes(){
    let aux = [];
    for(let i = 0; i < checkbox.length; i++){
        if(checkbox[i].checked == true){
            aux.push(i)
        }
        continue
    }
    return aux
}

function get_total(comboIndex, productsIndexes){
    let precioMenu = parseFloat(menus[comboIndex].precio)
    let precioProductos = productsIndexes.reduce((prev, ind)=>{
        return prev = parseFloat(prev) + parseFloat(productos[ind].precio)
    }, 0)
    return precioMenu + precioProductos
}

function change_div_text(){
    comDiv.classList.toggle('hidden')
    comInp.classList.toggle('hidden')
    if(typing){
        comDiv.innerHTML = comInp.value
    }else{
        comInp.focus()
    }
    typing = !typing
}

function actualize_active_combo(){
    combos.forEach(combo=>{
        if(combo.checked){
            combo.parentNode.classList.add('active')
        }else{
            combo.parentNode.classList.remove('active')
        }
    })
}



function create_receipt(pedido){
    let temp = recibo.content.cloneNode(true)
    let date = temp.querySelector('.recipt-date')
    let productTarget = temp.querySelector('.productos-recibo')
    let totalTarget = temp.querySelector('.total-recibo').querySelector('.td')


    let elapsed = Date.now()
    let today = new Date(elapsed)
    let dateText = document.createTextNode(today.toLocaleDateString())
    date.appendChild(dateText)


    for(let i = 0; i < pedido.productos.length; i++){
        let div = document.createElement('div')
        div.classList.add('td')
        
        let h3 = document.createElement('h3')
        let h4 = document.createElement('h4')
        let h3Text = document.createTextNode(pedido.productos[i].nombre)
        let h4Text = document.createTextNode(formater.format(pedido.productos[i].precio))
        h3.appendChild(h3Text)
        h4.appendChild(h4Text)

        div.appendChild(h3)
        div.appendChild(h4)

        productTarget.appendChild(div)
    }

    let totalH4 = document.createElement('h4')
    let totalText = document.createTextNode( formater.format(pedido.getTotal()) )
    totalH4.appendChild(totalText)
    totalTarget.appendChild(totalH4)

    return temp
}


window.addEventListener('load', (e)=>{
    actualize_active_combo()
    actualize_active_checkbox()

    let iCombo = get_selected_combo()
    let iProducts = get_selected_poducts_indexes()
    let total = get_total(iCombo, iProducts)
    show_total(total)
})

window.onkeydown = (e)=>{
    if(e.code == "KeyE" && (e.ctrlKey || e.metaKey)){
        change_div_text()
        return false
    }
    if(e.code == "KeyS" && (e.ctrlKey || e.metaKey)){
        if(typing){
            change_div_text()
        }
        return false
    }
}

comDiv.addEventListener('click', (e)=>{
    change_div_text()
})

combos.forEach(element=>{
    let combo = element.parentNode
    combo.addEventListener('click', (e)=>{
        let aux = combo.querySelector('input')
        if(!aux.checked){
            aux.checked = !aux.checked
            actualize_active_combo()
        }

        let iCombo = get_selected_combo()
        let iProducts = get_selected_poducts_indexes()
        let total = get_total(iCombo, iProducts)
        show_total(total)
    })
})

checkbox.forEach(element=>{
    let chbox = element.parentNode
    chbox.addEventListener('click', (e)=>{
        let aux = chbox.querySelector('input')
        aux.checked = !aux.checked
        actualize_active_checkbox()

        let iCombo = get_selected_combo()
        let iProducts = get_selected_poducts_indexes()
        let total = get_total(iCombo, iProducts)
        show_total(total)
    })
})

function addHandlers(f){
    for(var i=0; i<f.elements.length; i++){
        var e = f.elements[i];
        e.onclick = function(){report(this, 'Click');}
        e.onchange = function(){report(this, 'Change');}
        e.onfocus = function(){report(this, 'Focus');}
        e.onblur = function(){report(this, 'Blur');}
        e.onselect = function(){report(this, 'Select')}
    }
    
    
    f.resetbutton.onclick = function(){
        this.form.reset();
        report(this, 'Click');
        return false;
    }
}
addHandlers(document.everything);