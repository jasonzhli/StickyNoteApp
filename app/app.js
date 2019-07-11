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

        // after note-card: style="max-width: 18rem; min-width: 10rem"
var showNotes = function() {
  $('.card-columns').html('');

  for (var i = 0; i <window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var value = JSON.parse(window.localStorage.getItem(key))[0];
    var date = timeago.format(JSON.parse(window.localStorage.getItem(key))[1]);
    var color = JSON.parse(window.localStorage.getItem(key))[2];
    var element = 
    `<div class="card mb-3 note-card" style="background-color: ${color}">
      <div class="card-body">
        <h5 class="card-title note-title">${key}</h5>
        <div class="note-body">
          <p class=card-text">${value}
        </div>
      </div>
      <div class="row mt-1 wrapper">
        <small class="text-muted ml-4 mb-3">&nbsp;&nbsp;&nbsp;created ${date}</small>
        <div class="footer-buttons">
          <i class="m-1 p-1 edit-delete-buttons" data-feather="edit-2"></i>
          <i class="delete-note m-1 mr-4 p-1 edit-delete-buttons" data-feather="trash-2"></i>
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
  // showDatabaseContents();
  showNotes();
  
  $(".card-columns")
  .on("mouseenter", ".note-card", function() {
    $(this).find(".footer-buttons").css("display","flex");
    $(this).find(".edit-delete-buttons").fadeIn();
  })
  .on("mouseleave", ".note-card", function() {
    // $(this).find(".footer-buttons").css("display","none");
    $(this).find(".edit-delete-buttons").fadeOut(200);
  });

  // $(document).on('mouseenter', '.note-card', function () {
  //       $(this).find(":icon").show();
  //   }).on('mouseleave', '.note-card', function () {
  //       $(this).find(":icon").hide();
  //   });

  $(".dropdown-menu").on('click', '.dropdown-item', function(){
      // console.log($("#dropdownMenu:first-child").text());

      $("#dropdownMenu:first-child").text($(this).text());
      $("#dropdownMenu:first-child").val($(this).text());

   });

  $('.delete-note').on('click',function() {
    // console.log(this.parentElement.getElementsByTagName('strong')[0].innerHTML);
    console.log(this);
    console.log(this.parentElement.parentElement);
    // location.reload(true);
    // showDatabaseContents();
    // showNotes();
  })

  $('.create').on('click', function() {
    var date = new Date();
    var color = $("#dropdownMenu:first-child").text();
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
    }

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
      var valueInput = [getValueInput(),date,color]; // try
      console.log(valueInput);
      createItem(getKeyInput(),valueInput);
      showNotes();
      resetInputs();
    }
    else {
      alert('key and value must not be blank');
    }
  })
// });

  $('.update').on('click', function() {
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

  $('.delete').on('click', function() {
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

  $('.reset').on('click', function() {
    resetInputs();
  })

  $('.clear').on('click', function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      // showDatabaseContents();
      showNotes();
    }
  })
})