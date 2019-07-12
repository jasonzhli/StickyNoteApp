/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/
//localStorage functions
var createItem = function(key, value) {
  var stringifyValue = JSON.stringify(value);
  return window.localStorage.setItem(key,stringifyValue);
}

var updateItem = function(key, value) {
  var stringifyValue = JSON.stringify(value);
  return window.localStorage.setItem(key,stringifyValue);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showNotes = function() {
  $('.card-columns').html('');

  for (var i = 0; i <window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var value = JSON.parse(window.localStorage.getItem(key))[0];
    var date = timeago.format(JSON.parse(window.localStorage.getItem(key))[1]);
    var color = JSON.parse(window.localStorage.getItem(key))[2];
    var colorName;
    if (color === '#F8F9FA') {
      colorName = 'White';
    } else if (color === '#F28B82') {
      colorName = 'Red';
    } else if (color === '#CBF0F8') {
      colorName = 'Blue';
    } else if (color === '#A7FFEB') {
      colorName = 'Teal';
    } else if (color === '#FFF475') {
      colorName = 'Yellow';
    } else if (color === '#E6CAA8') {
      colorName = 'Brown';
    } else if (color === '#E8EAED') {
      colorName = 'Grey';
    }

    var element = 
    `<div>
    <div class="card mb-3 note-card" style="background-color: ${color}">
      <div class="card-body">
        <h5 class="card-title note-title">${key}</h5>
        <div class="note-body">
          <p class=card-text">${value}
        </div>
      </div>
      <div class="row mt-1 wrapper">
        <small class="text-muted ml-4 mb-3">&nbsp;&nbsp;&nbsp;created ${date}</small>
        <div class="footer-buttons">
          <i class="m-1 p-1 edit-delete-buttons" data-feather="edit-2" data-toggle="modal" data-target="#editmodal${i}"></i>
          <i class="delete-note m-1 mr-4 p-1 edit-delete-buttons" data-feather="trash-2"></i>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editmodal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title-name" class="col-form-label">Title:</label>
                <input type="text" class="form-control key2" id="title-name" placeholder="Title" value="${key}">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Note:</label>
                <textarea class="form-control value2" id="message-text" placeholder="Write your note here...">${value}</textarea>
              </div>
              <label class="col-form-label">Color:</label>
              <div class="dropdown">
                <button class="btn-sm m-2 btn-secondary dropdown-toggle drop-down" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  ${colorName}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item white-color" type="button">White</button>
                  <button class="dropdown-item red-color" type="button">Red</button>
                  <button class="dropdown-item blue-color" type="button">Blue</button>
                  <button class="dropdown-item teal-color" type="button">Teal</button>
                  <button class="dropdown-item yellow-color" type="button">Yellow</button>
                  <button class="dropdown-item brown-color" type="button">Brown</button>
                  <button class="dropdown-item grey-color" type="button">Grey</button>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary edit" data-dismiss="modal">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>


    <script>
      feather.replace()
    </script>`;
    $('.card-columns').append(element);
  }
}


var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.key').val('');
  $('.value').val('');
}

$(document).ready(function() {
  showNotes();
  
  $(".card-columns")
  .on("mouseenter", ".note-card", function() {
    $(this).find(".footer-buttons").css("display","flex");
    $(this).find(".edit-delete-buttons").fadeIn();
  })
  .on("mouseleave", ".note-card", function() {
    $(this).find(".edit-delete-buttons").fadeOut(200);
  });


  $(".dropdown-menu").on('click', '.dropdown-item', function(){
    $("#dropdownMenu:first-child").text($(this).text());
    $("#dropdownMenu:first-child").val($(this).text());
    $("#dropdownMenu2:first-child").text($(this).text());
    $("#dropdownMenu2:first-child").val($(this).text()); 
  });


  $('.card-columns').on('click', '.delete-note', function() {
    if (confirm('Delete this note?')) {
      deleteItem(this.parentElement.parentElement.parentElement.getElementsByClassName('note-title')[0].innerHTML);
      showNotes();
    }
  })

  $('.card-columns').on('click', '.edit', function() {
    var date = new Date();
    var color = this.parentElement.parentElement.getElementsByClassName('drop-down')[0].innerHTML;
    color = color.trim();
    if (color === 'White') {
      color = '#F8F9FA';
    } else if (color === 'Red') {
      color = '#F28B82';
    } else if (color === 'Blue') {
      color = '#CBF0F8';
    } else if (color === 'Teal') {
      color = '#A7FFEB';
    } else if (color === 'Yellow') {
      color = '#FFF475';
    } else if (color === 'Brown') {
      color = '#E6CAA8';
    } else if (color === 'Grey') {
      color = '#E8EAED';
    };

    var oldKey = this.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('note-title')[0].innerHTML;
    var keyInput = this.parentElement.parentElement.parentElement.getElementsByClassName('key2')[0].value;
    var valueText = this.parentElement.parentElement.parentElement.getElementsByClassName('value2')[0].value;
    var valueInput = [valueText,date,color];  
 
    if (keyInput === oldKey) {
      updateItem(keyInput, valueInput);
      showNotes();
      document.location.reload()
      
    } else if (keyInput !== oldKey) {
      deleteItem(oldKey);
      createItem(keyInput, valueInput);
      showNotes();
      document.location.reload()
    } 


  })

  $('.create').on('click', function() {
    var date = new Date();
    var color = $("#dropdownMenu:first-child").text();
    console.log(color);
    color = color.trim();
    if (color === 'White') {
      color = '#F8F9FA';
    } else if (color === 'Red') {
      color = '#F28B82';
    } else if (color === 'Blue') {
      color = '#CBF0F8';
    } else if (color === 'Teal') {
      color = '#A7FFEB';
    } else if (color === 'Yellow') {
      color = '#FFF475';
    } else if (color === 'Brown') {
      color = '#E6CAA8';
    } else if (color === 'Grey') {
      color = '#E8EAED';
    };

    if (getKeyInput() !== '' && getValueInput() !== '') {
      var valueInput = [getValueInput(),date,color]; 
      createItem(getKeyInput(),valueInput);
      showNotes();
      resetInputs();
    }
    else {
      alert('key and value must not be blank');
    }
  });


  $('.delete').on('click', function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showNotes();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });


  $('.clear').on('click', function() {
    if (confirm('WARNING: Are you sure you want to clear your wall? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showNotes();
    }
  })
})