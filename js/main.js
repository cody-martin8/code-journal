// When Photo Url input is filled

var $photoUrl = document.querySelector('.photoUrl');
var $entryImage = document.querySelector('.entry-image');

$photoUrl.addEventListener('input', function inputImage(event) {
  event.preventDefault();
  $entryImage.setAttribute('src', event.target.value);
});

// When New Entry submitted

var $journalEntry = document.getElementById('journal-entry-form');

$journalEntry.addEventListener('submit', function inputJournalEntry(event) {
  event.preventDefault();
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
});

/*
<li class="journal-entry-item">
  <div class="container">
    <div class="row">
      <div class="column-half">
        <img src="" alt="">
      </div>
      <div class="column-half">
        <h2>Star Lord</h2>
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

  var journalImage = document.createElement('img');
  journalImage.setAttribute('src', entry.photoUrl);
  journalImage.setAttribute('alt', entry.title);
  columnDiv.appendChild(journalImage);

  var journalTitle = document.createElement('h2');
  journalTitle.textContent = entry.title;
  columnDivTwo.appendChild(journalTitle);

  var journalWriteUp = document.createElement('p');
  journalWriteUp.textContent = entry.notes;
  columnDivTwo.appendChild(journalWriteUp);

  return listItem;
}

// Upon page reload

var journalList = document.querySelector('#journal-entry-list');

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
}

$entriesNavItem.addEventListener('click', viewEntries);
$newEntry.addEventListener('click', viewNewEntry);
