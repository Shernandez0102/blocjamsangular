(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};


          var currentAlbum = Fixtures.getAlbum();


          var getSongIndex = function(song) {
               return currentAlbum.songs.indexOf(song);
           };

          /**
          * @desc Active song object from list of songs
          * @type {Object}
          */







          SongPlayer.currentSong = null;

          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;


          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */

    var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
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
          return SongPlayer;
     };

     SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;

           } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
 };

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
