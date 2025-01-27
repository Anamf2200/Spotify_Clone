// let currentSong = new Audio();
// let songs;
// let currFolder;
// // let api = fetch(`https://api.deezer.com/search?q=eminem`);
// // let convert = api.json();
// // console.log(convert)

// async function fetchAlbum() {
//         try {
//           const response = await fetch('http://127.0.0.1:8080/https://api.deezer.com/album/302127', {
//             method: 'GET',
//             headers: {
//               'Origin': 'http://127.0.0.1:5500',
//               'X-Requested-With': 'XMLHttpRequest'
//             }
//           });
      
//           const data = await response.json();
          
//           console.log('Album:', data);
//          let albumData= data.tracks
//         //  console.log(albumData)
//         let track=albumData.data
//         console.log(track)
//      track.forEach(tr => {
//         console.log(tr.preview)
      
        
//      });
    
    
//         } catch (error) {
//           console.error('Error fetching album:', error);
//         }
//       }
   
//       fetchAlbum();
  


// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getsongs(folder) {
//     currFolder = folder;
//     let a = await fetch(`/${folder}/`);
//     let response = await a.text();
//     // console.log(response)
//     let div = document.createElement('div');
//     div.innerHTML = response;
//     // console.log(div)
//     let as = div.getElementsByTagName('a');
//     // console.log(as)
//     songs = []
//     // Show all the songs in the playlist
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         // console.log(element)
//         if (element.href.endsWith('.mp3')) {
//             songs.push(decodeURIComponent(element.href.split(`/${folder}/`)[1]));

//         }
       

//     }

//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
//     songUL.innerHTML = ""

//     for (const song of songs) {
//         // let cleaned = decodeURI(song).replaceAll('%20', "")
//         let cleaned = decodeURIComponent(song).replace('%20', " ");


//         // console.log(cleaned)
//         songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="/img/music.svg" alt="">
//                             <div class="info">
//                                 <div> ${cleaned}</div>
//                                 <div>Harry</div>
//                             </div>
//                             <div class="playnow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="/img/play.svg" alt="">
//                             </div> </li>`;
//     }







//     //Attach an event listener to each song

//     Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach((e => {

//         e.addEventListener('click', element => {
//             const songName = e.querySelector('.info').firstElementChild.innerHTML.trim();
//             // console.log('Selected Song:', songName);
//             playMusic(songName);

//         })

//     }))








//     return (songs)

// }
// const playMusic = (track, pause = false) => {
//     const encodedTrack = encodeURIComponent(track); // Encode the track
//     currentSong.src = `/${currFolder}/` + encodedTrack;
//     if (!pause) {
//         currentSong.play();
//         play.src = '/img/pause.svg';
//     }
//     // const filePath = '/songs/' + encodedTrack;

//     // console.log('Playing:', filePath); // Debug the file path
//     // var currentSong = new Audio(encodedTrack);


//     document.querySelector('.songinfo').innerHTML = decodeURI(encodedTrack);
//     document.querySelector('.songtime').innerHTML = '00:00/00:00';

// }





// async function DisplayAlbums() {
//     let a = await fetch(`/songs/`);
//         let response = await a.text();
//     let div = document.createElement('div');
//     div.innerHTML = response;
//     let anchor = div.getElementsByTagName('a');
//     let CardContianer = document.querySelector('.cardContainer');
//     let anchors = Array.from(anchor); // Convert HTMLCollection to Array

//     for (let index = 0; index < anchors.length; index++) {
//         const e = anchor[index];

//         if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
//             let folder = e.href.split('/').slice(-1)[0];      

//             if (folder === "songs") {
//                 // console.log("Skipping base songs folder");
//                 continue;
//             }

//             try {
//                 let response = await fetch(`/songs/${folder}/info.json`);
//                 let data = await response.json();
//                 // console.log(folder);

//                 // Append the new card to the CardContainer
//                 CardContianer.innerHTML += `
//                     <div data-folder="${folder}" class="card">
//                         <div class="play">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" color="black">
//                                 <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
//                             </svg>
//                         </div>
//                         <img src="/songs/${folder}/cover.jpeg" alt="${folder}">
//                         <h2>${data.title}</h2>
//                         <p>${data.Description}</p>
//                     </div>
//                 `;
//             } catch (error) {
//                 console.error(`Error fetching /songs/${folder}/info.json:`, error);
//             }
//         }
//     }
//        //load the playlist whenever the card is clicked

//     Array.from(document.getElementsByClassName("card")).forEach(e => {

//         // console.log(e)
//         e.addEventListener('click', async item => {
//             console.log(item,item.currentTarget.dataset)
            
//             songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
          
            
// playMusic(songs[0])
//         })

//     })
// }







// async function main() {
//     // Get the songs
//     await getsongs("songs/angrymood"); 
//     playMusic(songs[0], true); // Automatically play the first song


//     //Display all the albums on the page
//     await DisplayAlbums();




//     // attach an event listener to play,next and previous

//     play.addEventListener('click', () => {
//         if (currentSong.paused) {
//             currentSong.play();
//             play.src = "/img/pause.svg"
//         }
//         else {
//             currentSong.pause();
//             play.src = "/img/play.svg"

//         }
//     })

//     //Listen for update time


//     currentSong.addEventListener('timeupdate', () => {

//         // console.log(currentSong.currentTime, currentSong.duration)
//         document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
//         document.querySelector('.circle').style.left = (currentSong.currentTime) / (currentSong.duration) * 100 + '%';



//     })

//     //Add an event listener to seekbar

//     document.querySelector('.seekbar').addEventListener('click', (e) => {

//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
//         document.querySelector('.circle').style.left = percent + '%'
//         currentSong.currentTime = (currentSong.duration) * percent / 100;
//     })

//     //Add an event listener for hamburger
//     document.querySelector('.hamburger').addEventListener('click', () => {
//         document.querySelector('.left').style.left = "0";
//     })

//     //Add an event listener for close button
//     document.querySelector('.close').addEventListener('click', () => {
//         document.querySelector('.left').style.left = "-120%";

//     })



//     // Add an event listener to the Previous button

//     previous.addEventListener("click", () => {
//         currentSong.pause()
//         console.log("Previous clicked")

//         let index = songs.indexOf(decodeURI(((currentSong.src.split('/').slice(-1)))))
//         if ((index - 1) >= 0) {
//             playMusic(songs[index - 1])
//         }
//     })

//     // Add an event listener to next
//     next.addEventListener("click", () => {
//         currentSong.pause()
//         console.log("Next clicked")
//         let index = songs.indexOf(decodeURI(((currentSong.src.split('/').slice(-1)))))
//         if ((index + 1) < songs.length) {
//             playMusic(songs[index + 1])
//         }
//     })

//     //Add an event to range
//     document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
//         console.log('Setting value to', e.target.value, '/100')

//         currentSong.volume = parseInt(e.target.value) / 100
//     })

// // add the event listener to mute the volume button

// document.querySelector('.volume>img').addEventListener('click',e=>{
//     // console.log(e.target)
//     if (e.target.src.includes("volume.svg")){
//         e.target.src=e.target.src.replace("volume.svg",'mute.svg')
//         currentSong.volume=0
//         document.querySelector('.range').getElementsByTagName('input')[0].value=0
//     }
//     else{
//         e.target.src=e.target.src.replace("mute.svg",'volume.svg')
//         currentSong.volume=.10
//         document.querySelector('.range').getElementsByTagName('input')[0].value=10
//     }
    
    
    
//      })






// }

// main()


// Global Variables
let currentSong = new Audio(); // Audio player
let songs = []; // List of songs
let currentFolder = ''; // Current folder name

// Function to fetch album data using Deezer API

  
// Function to display tracks dynamically
function displayTracks(tracks) {
  const songUL = document.querySelector('.songList ul');
  songUL.innerHTML = ''; // Clear previous list

  // Populate the tracklist
  tracks.forEach((track, index) => {
    const { title, preview, artist } = track;

    songUL.innerHTML += `
      <li data-index="${index}">
        <img class="invert" width="34" src="/img/music.svg" alt="">
        <div class="info">
          <div>${title}</div>
          <div>${artist.name}</div>
        </div>
        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="/img/play.svg" alt="">
        </div>
      </li>`;
  });

  // Add click event listeners to each track in the list
  Array.from(songUL.getElementsByTagName('li')).forEach((listItem, index) => {
    listItem.addEventListener('click', () => {
      playMusic(tracks[index].title, tracks[index].preview);
    });
  });

  // Store the fetched tracks for global use
  songs = tracks;
}

// Function to play a specific track
function playMusic(title, preview) {
    currentSong.src = preview;  // Update the source of the current song
    currentSong.play();  // Play the song immediately
    console.log(`Playing: ${title}`);  // Optional: log the song title for debugging


    play.src = "/img/pause.svg";
    document.querySelector('.songinfo').textContent = title;
};


currentSong.addEventListener('ended', () => {
    let currentIndex = songs.findIndex(song => song.preview === currentSong.src);

    if (currentIndex < songs.length - 1) {
        const nextSong = songs[currentIndex + 1];
        playMusic(nextSong.title, nextSong.preview); // Auto-play the next song
    } else {
        // console.log("End of playlist reached.");
    }
});




document.querySelector('#next').addEventListener('click', () => {
    let currentIndex = songs.findIndex(song => song.preview === currentSong.src);

    if (currentIndex < songs.length - 1) {
        const nextSong = songs[currentIndex + 1];
        playMusic(nextSong.title, nextSong.preview); // Play the next song immediately
    } else {
        console.log("End of playlist reached.");
    }
});

// Event listener for "Previous" button
document.querySelector('#previous').addEventListener('click', () => {
    let currentIndex = songs.findIndex(song => song.preview === currentSong.src);

    if (currentIndex > 0) {
        const prevSong = songs[currentIndex - 1];
        playMusic(prevSong.title, prevSong.preview); // Play the previous song immediately
    } else {
        console.log("Beginning of playlist reached.");
    }
});

// Automatically play the next song when the current song ends
currentSong.addEventListener('ended', () => {
    let currentIndex = songs.findIndex(song => song.preview === currentSong.src);

    if (currentIndex < songs.length - 1) {
        const nextSong = songs[currentIndex + 1];
        playMusic(nextSong.title, nextSong.preview);
    } else {
        // console.log("End of playlist reached.");
    }
});




// Helper function to format time in MM:SS
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


// async function fetchAndDisplayAlbum(albumIds) {
//     try {
//         const cardContainer = document.querySelector('.cardContainer');
//         cardContainer.innerHTML = ''; // Clear existing cards

//         for (const albumId of albumIds) { // Iterate through the array of album IDs
//             const response = await fetch(`http://127.0.0.1:8080/https://api.deezer.com/album/${albumId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Origin': 'http://127.0.0.1:5500',
//                     'X-Requested-With': 'XMLHttpRequest'
//                 }
//             });

//             const albumData = await response.json();

//             // Create a card for each album
//             cardContainer.innerHTML += `
//                 <div class="card" data-album-id="${albumData.id}">
//                     <div class="play">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" color="black">
//                             <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <img src="${albumData.cover}" alt="Album Cover">
//                     <h2>${albumData.title}</h2>
//                     <h3>By ${albumData.artist.name}</h3>
//                 </div>
//             `;
//         }

//         // Add event listeners to the cards
//         document.querySelectorAll('.card').forEach((card) => {
//             card.addEventListener('click', async () => {
//                 const albumId = card.getAttribute('data-album-id');
//                 const selectedAlbumResponse = await fetch(`http://127.0.0.1:8080/https://api.deezer.com/album/${albumId}`);
//                 const selectedAlbum = await selectedAlbumResponse.json();
//                 displayTracks(selectedAlbum.tracks.data); // Display songs for the selected album
//             });
//         });
//     } catch (error) {
//         console.error('Error fetching album data:', error);
//     }
// }






async function fetchAndDisplayAlbumsForArtists(artistIds) {
    try {
        const cardContainer = document.querySelector('.cardContainer');
        cardContainer.innerHTML = ''; // Clear existing cards

        // Loop through each artist ID to fetch their albums
        for (const artistId of artistIds) {
            const response = await fetch(`http://127.0.0.1:8080/https://api.deezer.com/artist/${artistId}/albums`, {
                method: 'GET',
                headers: {
                    'Origin': 'http://127.0.0.1:5500',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const albumsData = await response.json();

            // Check if there are albums for the current artist
            if (albumsData.data && albumsData.data.length > 0) {
                // Loop through the albums for the current artist
                for (const album of albumsData.data) {
                    // Create a card for each album
                    cardContainer.innerHTML += `
                        <div class="card" data-album-id="${album.id}">
                            <div class="play">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" color="black">
                                    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" fill="#000" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <img src="${album.cover}" alt="Album Cover">
                            <h2>${album.title}</h2>

                        </div>
                    `;
                }
            }
        }

        // Add click event listeners to each card
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('click', async () => {
                const albumId = card.getAttribute('data-album-id');
                const selectedAlbumResponse = await fetch(`http://127.0.0.1:8080/https://api.deezer.com/album/${albumId}`);
                const selectedAlbum = await selectedAlbumResponse.json();
                displayTracks(selectedAlbum.tracks.data); // Display songs for the selected album
            });
        });

    } catch (error) {
        console.error('Error fetching album data:', error);
    }
}




  


    
    // Function to fetch album data from a specific folder
   
    
    
    function fetchSongs(folderName, folderTitle, songs) {
        currentFolder = folderName; // Set the current folder
    
        const songUL = document.querySelector('.songList ul');
        songUL.innerHTML = ''; // Clear the previous song list
    
        // Populate song list dynamically
        songs.forEach((song, index) => {
            songUL.innerHTML += `
                <li data-index="${index}">
                    <img class="invert" width="34" src="/img/music.svg" alt="">
                    <div class="info">
                        <div>${song.title}</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="/img/play.svg" alt="">
                    </div>
                </li>`;
        });
    
        // Add click events to play the selected song
        Array.from(songUL.getElementsByTagName('li')).forEach((listItem, index) => {
            listItem.addEventListener('click', () => {
                playMusic(songs[index].title, songs[index].path);
            });
        });
    
        // Store the songs globally
        this.songs = songs;
        console.log(`Loaded songs for folder: ${folderTitle}`);
    }
    


// Main Function
async function main() {

    //  const albumIds = [302127]; // Example album IDs
    // await fetchAndDisplayAlbum(albumIds);
    fetchAndDisplayAlbumsForArtists([123, 456, 789]); 

   


//  Add an event listener to seekbar
document.querySelector('.seekbar').addEventListener('click', (e) => {
    // Calculate the percentage based on the click position
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    // Update the circle's position on the seekbar
    document.querySelector('.circle').style.left = percent + '%';

    // Ensure the audio's metadata is loaded before setting the currentTime
    if (!isNaN(currentSong.duration)) {
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    } else {
        console.error("Audio duration is not yet available.");
    }
});

// Event listener to ensure the metadata is fully loaded before user interaction
currentSong.addEventListener('loadedmetadata', () => {
    console.log("Audio metadata loaded. Duration:", currentSong.duration);
});



    currentSong.addEventListener('timeupdate', () => {

                // console.log(currentSong.currentTime, currentSong.duration)
                document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
                document.querySelector('.circle').style.left = (currentSong.currentTime) / (currentSong.duration) * 100 + '%';
        
        
        
            })
          //Add an event to range
    document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
        console.log('Setting value to', e.target.value, '/100')

        currentSong.volume = parseInt(e.target.value) / 100
    })


    // add the event listener to mute the volume button

document.querySelector('.volume>img').addEventListener('click',e=>{
    // console.log(e.target)
    if (e.target.src.includes("volume.svg")){
        e.target.src=e.target.src.replace("volume.svg",'mute.svg')
        currentSong.volume=0
        document.querySelector('.range').getElementsByTagName('input')[0].value=0
    }
    else{
        e.target.src=e.target.src.replace("mute.svg",'volume.svg')
        currentSong.volume=.10
        document.querySelector('.range').getElementsByTagName('input')[0].value=10
    }
    
    
    
     })

  
  // Display all albums

  // Add event listeners for play, next, and previous buttons
  document.querySelector('.songsbuttons').addEventListener('click', () => {
    if (currentSong.paused) {
      currentSong.play();
      let play = document.querySelector('#play ')
      play.src = '/img/pause.svg';
    } else {
      currentSong.pause();
      let stop = document.querySelector('#play ')
      stop.src = '/img/play.svg';
    }
  });

  






    
}

main();
































