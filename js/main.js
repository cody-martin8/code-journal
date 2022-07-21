// When Photo Url input is filled

var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $photoUrl = document.querySelector('.photoUrl');
var $entryImage = document.querySelector('.entry-image');
var journalList = document.querySelector('#journal-entry-list');

$photoUrl.addEventListener('input', function inputImage(event) {
  event.preventDefault();
  $entryImage.setAttribute('src', event.target.value);
});

// When New Entry or Edited Entry is submitted

var $journalEntry = document.getElementById('journal-entry-form');

$journalEntry.addEventListener('submit', function inputJournalEntry(event) {
  event.preventDefault();
  if (data.editing === null) {

    // New Entries
    var journalEntry = {};
    for (var i = 0; i < event.target.length - 1; i++) {
      journalEntry[event.target[i].className] = event.target[i].value;
    }
    journalEntry.entryId = data.nextEntryId;
    journalList.prepend(renderJournalEntry(journalEntry));
    data.nextEntryId++;
    data.entries.unshift(journalEntry);
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $journalEntry.reset();
    viewEntries();
  } else {

    // Edited Entries
    data.editing.title = event.target[0].value;
    data.editing.photoUrl = event.target[1].value;
    data.editing.notes = event.target[2].value;

    for (var n = 0; n < data.entries.length; n++) {
      if (data.editing.entryId === data.entries[n].entryId) {
        data.entries[n] = data.editing;
        var journalItem = document.querySelectorAll('li.journal-entry-item');
        journalItem[n].replaceWith(renderJournalEntry(data.entries[n]));
      }
    }
    data.editing = null;
    viewEntries();
  }
});

/*
<li class="journal-entry-item" data-entry-id="#">
  <div class="container">
    <div class="row">
      <div class="column-half">
        <img src="" alt="">
      </div>
      <div class="column-half">
        <div class="entry-heading">
          <h2>Star Lord</h2>
          <a href="#"><i class="fa-solid fa-pen"></i></a>
        </div>
        <p>Star-Lord</p>
        <p></p>
      </div>
    </div>
  </div>
</li>
*/

function renderJournalEntry(entry) {
  var listItem = document.createElement('li');
  listItem.className = 'journal-entry-item';
  listItem.setAttribute('data-entry-id', entry.entryId);

  var containerDiv = document.createElement('div');
  containerDiv.className = 'container';
  listItem.appendChild(containerDiv);

  var rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  containerDiv.appendChild(rowDiv);

  var columnDiv = document.createElement('div');
  columnDiv.className = 'column-half';
  rowDiv.appendChild(columnDiv);

  var columnDivTwo = document.createElement('div');
  columnDivTwo.className = 'column-half';
  rowDiv.appendChild(columnDivTwo);

  var entryHeadingDiv = document.createElement('div');
  entryHeadingDiv.className = 'entry-heading';
  columnDivTwo.appendChild(entryHeadingDiv);

  var journalImage = document.createElement('img');
  journalImage.setAttribute('src', entry.photoUrl);
  journalImage.setAttribute('alt', entry.title);
  columnDiv.appendChild(journalImage);

  var journalTitle = document.createElement('h2');
  journalTitle.textContent = entry.title;
  entryHeadingDiv.appendChild(journalTitle);

  var editIconLink = document.createElement('a');
  editIconLink.setAttribute('href', '#');
  entryHeadingDiv.appendChild(editIconLink);

  var editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pen';
  editIconLink.appendChild(editIcon);

  var journalWriteUp = document.createElement('p');
  journalWriteUp.textContent = entry.notes;
  columnDivTwo.appendChild(journalWriteUp);

  return listItem;
}

// Upon page reload

window.addEventListener('DOMContentLoaded', function loadJournal() {
  for (var i = 0; i < data.entries.length; i++) {
    journalList.appendChild(renderJournalEntry(data.entries[i]));
  }

  if (data.view === 'entry-form') {
    $entryForm[0].className = 'page';
    $entryForm[1].className = 'page hidden';
  }
  if (data.view === 'entries') {
    $entryForm[0].className = 'page hidden';
    $entryForm[1].className = 'page';
  }

});

// Navigation functions

var $entriesNavItem = document.querySelector('.tab');
var $entryForm = document.querySelectorAll('.page');
var $newEntry = document.querySelector('.new-button');

function viewNewEntry() {
  if (data.view === 'entries') {
    $entryForm[0].className = 'page';
    $entryForm[1].className = 'page hidden';
  }
  data.view = 'entry-form';
}

function viewEntries() {
  if (data.view === 'entry-form') {
    $entryForm[0].className = 'page hidden';
    $entryForm[1].className = 'page';
  }
  data.view = 'entries';
  $journalEntry.reset();
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryFormHeader.textContent = 'New Entry';
  $deleteEntryButton.className = 'delete-entry-button hidden';
  $buttons.className = 'button';
}

$entriesNavItem.addEventListener('click', viewEntries);
$newEntry.addEventListener('click', viewNewEntry);

// Edit functions

var $entryFormHeader = document.querySelector('#journal-entry-form h1');
var $deleteEntryButton = document.querySelector('.delete-entry-button');
var $buttons = document.querySelector('.button');

journalList.addEventListener('click', function editEntry(event) {
  if (event.target.matches('.entry-heading i')) {
    $entryFormHeader.textContent = 'Edit Entry';
    viewNewEntry();
  }
  var idNumber = event.target.closest('.journal-entry-item');
  for (var i = 0; i < data.entries.length; i++) {
    if (idNumber.dataset.entryId === String(data.entries[i].entryId)) {
      data.editing = data.entries[i];
    }
  }
  $title.value = data.editing.title;
  $photoUrl.value = data.editing.photoUrl;
  $entryImage.setAttribute('src', $photoUrl.value);
  $notes.value = data.editing.notes;
  $deleteEntryButton.className = 'delete-entry-button';
  $buttons.className = 'button edit';
});

// Delete entry functions

var $overlay = document.querySelector('.overlay');
var $popUpWrapper = document.querySelector('.delete-entry-pop-up-wrapper');
var $cancelButton = document.querySelector('.cancel-button');
// var $confirmDeleteButton = document.querySelector('.confirm-delete-button');

function deleteEntry() {
  $overlay.className = 'overlay on';
  $popUpWrapper.className = 'delete-entry-pop-up-wrapper on';
}

function cancelDelete() {
  $overlay.className = 'overlay off';
  $popUpWrapper.className = 'delete-entry-pop-up-wrapper off';
}

// function confirmDelete() {

// }

$deleteEntryButton.addEventListener('click', deleteEntry);
$cancelButton.addEventListener('click', cancelDelete);
