document.querySelectorAll(".collapsible").forEach(function(btn) {
  btn.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
  });
});


//first click pulls the bar in, second click for expansion
document.addEventListener('DOMContentLoaded', function() {
  var dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;
  var input = dropdown.querySelector('input[type="checkbox"]');
  var label = dropdown.querySelector('label');
  var creditDiv = dropdown.querySelector('.credit');
  var titleDiv = dropdown.querySelector('.title');
  var player = document.querySelector('#player');
  var playPauseBtn = document.querySelector('#playPauseBtn');
  var audioItems = dropdown.querySelectorAll('.audio-item');

  if (!input || !label) return;

  // Handle play/pause button
  playPauseBtn && playPauseBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (player && player.src) player.paused ? player.play() : player.pause();
  });

  // Helper for updating player
  var setTrack = function(src, title, credit) {
    if (player) { player.src = src; player.play(); }
    if (titleDiv) titleDiv.textContent = title;
    if (creditDiv) creditDiv.textContent = credit;
  };

  // Handle audio item selection
  audioItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      setTrack(this.getAttribute('data-src'), this.textContent, this.getAttribute('credit'));
    });
  });

  // audio selection
   dropdown.querySelectorAll('.select').forEach(function(select) {
    var selectLabel = select.querySelector('.select-label');
    if (!selectLabel) return;
    select.classList.add('open');

    selectLabel.addEventListener('click', function(e) {
      e.preventDefault();
      select.classList.toggle('open');
    });

    select.querySelectorAll('.recognise-audio-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        setTrack(this.getAttribute('data-src'), selectLabel.textContent.trim(), this.getAttribute('credit') || this.textContent.trim());
      });
    });
  });

  label.addEventListener('click', function(e) {
    if (playPauseBtn && (e.target === playPauseBtn || playPauseBtn.contains(e.target))) {
      return;
    }
    if (!dropdown.classList.contains('pulled')) {
      e.preventDefault();
      dropdown.classList.add('pulled');
      return;
    }
  });
  input.addEventListener('change', function() {
    if (input.checked) dropdown.classList.add('pulled');
    else dropdown.classList.remove('pulled');
  });

  // Update icon when audio plays/pauses
  if (player) {
    player.addEventListener('play', function() { playPauseBtn.classList.add('playing'); });
    ['pause', 'ended'].forEach(function(e) { player.addEventListener(e, function() { playPauseBtn.classList.remove('playing'); }); });
  }

  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('pulled');
    }
    var info = document.querySelector('.info');
    if (info && info.classList.contains('expanded') && !info.contains(e.target)) {
      info.classList.remove('expanded');
      document.body.classList.remove('no-scroll');
    }
  });

  // Expand .info drawer on touch
  var info = document.querySelector('.info');
  [document.querySelector('.handle'), document.querySelector('.info-content')].forEach(function(el) {
    el && el.addEventListener('touchstart', function() { info.classList.add("expanded"); });
  });
});

