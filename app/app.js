/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/
var keyID = 0;
//localStorage functions
var createItem = function(key, value) {
  keyID++;
  return window.localStorage.setItem(key, value);
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

// var showDatabaseContents = function() {
//   $('tbody').html('');

//   for (var i = 0; i < window.localStorage.length; i++) {
//     var key = window.localStorage.key(i);
//     $('tbody').append(`<tr><td>${key}</td><td>${window.localStorage.getItem(key)}</td></tr>`)
//   }
// }

// div class="note h-auto rounded-lg p-2 m-1 bg-info text-white" style="width: 250px"
        // <button type="button" class="delete-note btn-xs btn-danger m-1 mr-4"><small>Delete</small></button>
        // <button type="button" class="btn-xs btn-primary m-1" data-toggle="modal" data-target="#exampleModal"><small>Edit</small></button>

var showNotes = function() {
  $('.card-columns').html('');

  for (var i = 0; i <window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var element = 
    `<div class="card bg-light mb-3" style="max-width: 18rem; min-width: 10rem">
      <div class="card-body">
        <h5 class="card-title">${key}</h5>
        <div class="note-body">
          <p class=card-text">${window.localStorage.getItem(key)}
        </div>
      </div>
      <div class="row mt-1 footer-buttons">
        <i class="m-1 p-1 edit-delete-buttons" data-feather="edit-2"></i>
        <i class="delete-note m-1 mr-4 p-1 edit-delete-buttons" data-feather="trash-2"></i>
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
  // showDatabaseContents();
  showNotes();

  $(".dropdown-menu").on('click', '.dropdown-item', function(){

      $("#dropdownMenu:first-child").text($(this).text());
      $("#dropdownMenu:first-child").val($(this).text());

   });

  $('.delete-note').click(function() {
    // console.log(this.parentElement.getElementsByTagName('strong')[0].innerHTML);
    console.log(this);
    console.log(this.parentElement.parentElement);
    // location.reload(true);
    // showDatabaseContents();
    // showNotes();
  })

  $('.create').click(function() {
    console.log(getKeyInput());
    if (getKeyInput() !== '' && getValueInput() !== '') {
      // if (keyExists(getKeyInput())) {
      //   if(confirm('key already exists in database, do you want to update instead?')) {
      //     updateItem(getKeyInput(), getValueInput());
      //     showDatabaseContents();
      //   }
      //   // createItem(keyID);
      //   showNotes();
      //   resetInputs();
      // }
      createItem(getKeyInput(),getValueInput());
      showNotes();
      resetInputs();
    }
    else {
      alert('key and value must not be blank');
    }
  })
// });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        // showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key and value must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        // showDatabaseContents();
        showNotes();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  })

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      // showDatabaseContents();
      showNotes();
    }
  })
})