/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('journal-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', dataJSON);
});
