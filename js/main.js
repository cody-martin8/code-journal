var $photoUrl = document.querySelector('.photoUrl');
var $entryImage = document.querySelector('.entry-image');

$photoUrl.addEventListener('input', function inputImage(event) {
  event.preventDefault();
  $entryImage.setAttribute('src', event.target.value);
});

var $journalEntry = document.getElementById('journal-entry-form');

$journalEntry.addEventListener('submit', function inputJournalEntry(event) {
  event.preventDefault();
  var journalEntry = {};
  for (var i = 0; i < event.target.length - 1; i++) {
    journalEntry[event.target[i].className] = event.target[i].value;
  }
  journalEntry.entryId = data.entryId;
  data.nextEntryId++;
  data.entries.unshift(journalEntry);
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $journalEntry.reset();
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

// test function with data.entries[i]

window.addEventListener('DOMContentLoaded', function loadJournal() {
  var journalList = document.querySelector('#journal-entry-list');
  for (var i = 0; i < data.entries.length; i++) {
    journalList.appendChild(renderJournalEntry(data.entries[i]));
  }
});
