var $photoUrl = document.querySelector('.photoUrl');
var $entryImage = document.querySelector('.entry-image');

$photoUrl.addEventListener('input', function (event) {
  event.preventDefault();
  $entryImage.setAttribute('src', event.target.value);
});
