var newReleaseSubmit = document.querySelector('.addRelease');
var newReleaseObject = {};

newReleaseSubmit.onclick = function() {
  console.log("release submitted");

  newReleaseObject.albumName = document.querySelector('.albumName').value;
  newReleaseObject.artistName = document.querySelector('.artist').value;
  newReleaseObject.rating = document.querySelector('.rating').value;
  newReleaseObject.isVA = document.querySelector('.VA').value;
  newReleaseObject.recordLabel = document.querySelector('.recordLabel').value;
  newReleaseObject.year = document.querySelector('.year').value;
  newReleaseObject.genre = document.querySelector('.genre').value;
  newReleaseObject.review = document.querySelector('.review').value;
}