
loadCategories(drawCategory, loadItems);   // da fare dopo caricamento categorie
//loadTasks(addItem);


function loadItems()  {
  loadTasks(addItem);
}


function addCategory()  {
  var categoryName = document.getElementById('newCategory').value;

  if (categoryName.trim().length > 0)   {
    saveCategory(categoryName, drawCategory);
  }
}

function drawCategory(dataReceived)  {
  if (dataReceived !== undefined)   {
    var container = document.createElement('div');

    container.className = 'col-md-4';

    container.innerHTML = getCategoryTemplate(dataReceived);

    var app = document.querySelector('#app');
    var rowToAppend = app.lastElementChild;

    if (rowToAppend.children.length == 3)  {
      rowToAppend = document.createElement('div');

      rowToAppend.classList.add('row');
      app.appendChild(rowToAppend);

      container.classList.add('offset-md-4');
    }
    
    rowToAppend.appendChild(container);

    if (rowToAppend.children.length == 2)  {
      rowToAppend.firstElementChild.classList.replace('offset-md-4', 'offset-md-2');
    }

    if (rowToAppend.children.length == 3)  {
      rowToAppend.firstElementChild.classList.remove('offset-md-2');
    }

    document.getElementById('newCategory').value = '';

    $(".sortable-list").sortable({
      connectWith: ".sortable-list",
      cursor: "move",
      placeholder: "ui-state-highlight",
      dropOnEmpty: true,
      receive: function(event, ui)  {
        console.log(ui);
        console.log(ui.item);
      },
      /*
      update: function( event, ui ) {
        var draggedElement = ui.item;
        var listTarget = event.target;
        
        console.log('draggedElement', draggedElement[0].dataset);
        console.log('targetElement', listTarget.dataset);
      ;}
      */
  }).disableSelection();
  }
}

function editItem(elementToEdit)  {
  var myInput = $(elementToEdit).children('input');
  if (myInput.length == 0)  {
    var mySpan = $(elementToEdit).children('span');
    // creo l'elemento (jquery)
    var myInput = $('<input type="text" value="">');
    // rimpiazzo
    mySpan.replaceWith(myInput);
    // guadagno automaticamente il focus
    myInput.trigger('focus');
  } else {
    // altro modo per creare elementi in jquery (obsoleto)
    // mySpan = $(document.createElement('span'));
    // modo corretto di creare oggetti
    mySpan = $('<span>');
    // imposto il valore dell'input come text del tag span
    mySpan.text(myInput.val());
    // rimpiazzo l'input con lo span
    myInput.replaceWith(mySpan);
  }
}

function getCategoryTemplate(data)  {
  return `<div class="category card">
      <div class="card-header bg-primary text-white">
          <h2>${data.description}</h2>
      </div>

      <ul class="sortable-list" data-id-category="${data.id}">
      </ul>
  </div>`;
}

function addItem(data) {
  //console.log(data)
  if (data !== undefined && 'description' in data) {
    var itemText = data.description;

    if (itemText.trim().length !== 0) {
      var itemList = document.getElementById('nonCategorizzati');
      var newItem = document.createElement('li');

      newItem.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
      newItem.setAttribute('data-id', data.id);
      newItem.setAttribute('data-category', data.id_category == null ? 0 : data.id_category );
      // elemento span
      var spanElement = document.createElement('span');
      spanElement.innerText = itemText;

      // elemento div contenente i bottoni
      var buttons = document.createElement('div');

      buttons.innerHTML = '<button type="button" class="btn btn-warning btn-sm" onclick="editItem(this.parentNode.parentNode)"><i class="fas fa-pen-to-square"></i></button>'
        + '<button type="button" class="btn btn-danger btn-sm" onclick="deleteItem(this.parentNode.parentNode)"><i class="fas fa-trash-alt"></i></button>';

      newItem.appendChild(spanElement);
      newItem.appendChild(buttons);

      itemList.appendChild(newItem);
    }
  }
}