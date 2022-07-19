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
