

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cad')) ?? []
const setLocalStorage = (dbcad) => localStorage.setItem("db_cad", JSON.stringify(dbcad))

const deletecad = (index) => {
    const dbcad = readcad()
    dbcad.splice(index, 1)
    setLocalStorage(dbcad)
}

const updatecad = (index, cad) => {
    const dbcad = readcad()
    dbcad[index] = cad
    setLocalStorage(dbcad)
}

const readcad = () => getLocalStorage()

const createcad = (cad) => {
    const dbcad = getLocalStorage()
    dbcad.push (cad)
    setLocalStorage(dbcad)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}



const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('codigo').dataset.index = 'new'
}

const savecad = () => {
    debugger
    if (isValidFields()) {
        const cad = {
            codigo: document.getElementById('codigo').value,
            nome: document.getElementById('nome').value,
            sexo: document.getElementById('sexo').value,
            idade: document.getElementById('idade').value
        }
        const index = document.getElementById('codigo').dataset.index
        if (index == 'new') {
            createcad(cad)
            updateTable()
            closeModal()
        } else {
            updatecad(index, cad)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (cad, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableC>tbody').appendChild(newRow)
    
}
const createRow2 = (cad, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
     
    `
    document.querySelector('#tableC2>tbody').appendChild(newRow)
    
}

const createRow3 = (cad, index) => {
    const newRow = document.createElement('tr')
    if (cad.idade>65){
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
        <td>idoso</td>
    ` 
    document.querySelector('#tableC3>tbody').appendChild(newRow)
    
}
else if(cad.idade>24)
{
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
        <td>adulto</td>
    `
    
    document.querySelector('#tableC3>tbody').appendChild(newRow)
    
}
else if(cad.idade>15)
{
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
        <td>juvenil</td>
    `
    
    document.querySelector('#tableC3>tbody').appendChild(newRow)
    
}
else{
    newRow.innerHTML = `
        <td>${cad.codigo}</td>
        <td>${cad.nome}</td>
        <td>${cad.sexo}</td>
        <td>${cad.idade}</td>
        <td>infantil</td>
    `
    
    document.querySelector('#tableC3>tbody').appendChild(newRow)
    
}

}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableC>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbcad = readcad()
    clearTable()
    dbcad.forEach(createRow)
    dbcad.forEach(createRow2)
    dbcad.forEach(createRow3)
}

const fillFields = (cad) => {
    document.getElementById('codigo').value = cad.codigo
    document.getElementById('nome').value = cad.nome
    document.getElementById('sexo').value = cad.sexo
    document.getElementById('idade').value = cad.idade
    document.getElementById('codigo').dataset.index = cad.index
}

const editcad = (index) => {
    const cad = readcad()[index]
    cad.index = index
    fillFields(cad)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editcad(index)
        } else {
            const cad = readcad()[index]
            const response = confirm(`Deseja realmente excluir o cadastro ${cad.codigo}`)
            if (response) {
                deletecad(index)
                updateTable()
            }
        }
    }
}

updateTable()


document.getElementById('cadastrarC')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', savecad)

document.querySelector('#tableC>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)