(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};


          var currentAlbum = Fixtures.getAlbum();



  // @desc Buzz object audio file
 //@type {Object}

          var currentBuzzObject = null;



  // @function setSong
  // @desc Stops currently playing song and loads new audio file as currentBuzzObject
  // @param {Object} song


    var setSong = function(song) {
    if (currentBuzzObject) {
        stopSong(SongPlayer.currentSong);
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    SongPlayer.currentSong = song;
 };

 //@function playSong
 //@desc plays song and sets song.playing to true so album.html changes play/pause icon
 //@param {Object} song
 var playSong = function(song) {
               currentBuzzObject.play();
               song.playing = true;
           }

//@function stopsong
//@desc stop currentBuzzObject and set songplaying to null
//@param {object} song

var stopSong = function(song) {
  currentBuzzObject.stop();
  song.playing = null;
}


// @function getSongIndex
// @des gets the song index so we can then manipulate
// @param {Object} song

 var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
  };

/**
* @desc Active song object from list of songs
* @type {Object}
*/


SongPlayer.currentSong = null;



// @function play
//@desc Play current or new song
//@param {Object} song


        SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
     } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
    }
 };

 // @function pause
 //@desc Pause current song
 //@param {Object} song

     SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
     };


     SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
             stopSong(SongPlayer.currentSong);

           } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
 };
      SongPlayer.next = function () {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
          if (currentSongIndex === currentAlbum.songs.length) {
            stopSong(SongPlayer.currentSong);
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
      };


 return SongPlayer;
}

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
