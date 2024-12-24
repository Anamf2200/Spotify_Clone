let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder=folder;
    let a = await fetch(`http://127.0.0.1:5500/${currFolder}/`);
    let response = await a.text();
    // console.log(response)
    let div = document.createElement('div');
    div.innerHTML = response;
    // console.log(div)
    let as = div.getElementsByTagName('a');
    // console.log(as)
     songs = []
        // Show all the songs in the playlist
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        // console.log(element)
        if (element.href.endsWith('.mp3')) {
            songs.push(decodeURIComponent(element.href.split(`/${currFolder}/`)[1]));
        }

    }

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
   
    for (const song of songs) {
        let cleaned= decodeURI(song).replaceAll('%20',"")
    
        // console.log(cleaned)
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="music.svg" alt="">
                            <div class="info">
                                <div> ${cleaned}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div> </li>`;
    }
    



    


    //Attach an event listener to each song

    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach((e => {

        e.addEventListener('click', element => {
            const songName = e.querySelector('.info').firstElementChild.innerHTML.trim();
            // console.log('Selected Song:', songName);
            playMusic(songName);

        })

    }))








    return (songs)

}
const playMusic = (track, pause = false) => {
    const encodedTrack = encodeURIComponent(track); // Encode the track
    currentSong.src = `/${currFolder}/` + encodedTrack;
    if (!pause) {
        currentSong.play();
        play.src = 'pause.svg';
    }
    // const filePath = '/songs/' + encodedTrack;

    // console.log('Playing:', filePath); // Debug the file path
    // var currentSong = new Audio(encodedTrack);


    document.querySelector('.songinfo').innerHTML = decodeURI(encodedTrack);
    document.querySelector('.songtime').innerHTML = '00:00/00:00';

}



async  function DisplayAlbums(){
    let a = await fetch(`http://127.0.0.1:5500/${currFolder}/`);
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
 let anchor= div.getElementsByTagName('a')
Array.from(anchor).forEach(e=>{
    // console.log(e.href)
    if(e.href.includes("/songs")){
        console.log(e.href.split('/').slice(-2)[0])
    }
 })
    // console.log(div)

}


async function main() {
    // Get the songs
   await getsongs("songs/ncs"); // Get songs from server
    playMusic(songs[0], true); // Automatically play the first song


    //Display all the albums on the page
    DisplayAlbums();

 
  

    // attach an event listener to play,next and previous

    play.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg"
        }
        else {
            currentSong.pause();
            play.src = "play.svg"

        }
    })

    //Listen for update time


    currentSong.addEventListener('timeupdate', () => {

        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector('.songtime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector('.circle').style.left=(currentSong.currentTime)/(currentSong.duration)*100 + '%';

    

    })

    //Add an event listener to seekbar

    document.querySelector('.seekbar').addEventListener('click',(e)=>{

        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100 
        document.querySelector('.circle').style.left=percent + '%'
        currentSong.currentTime =(currentSong.duration) *percent/100;
    })

    //Add an event listener for hamburger
    document.querySelector('.hamburger').addEventListener('click',()=>{
        document.querySelector('.left').style.left="0";
    })

    //Add an event listener for close button
    document.querySelector('.close').addEventListener('click',()=>{
        document.querySelector('.left').style.left="-120%";

    })



// Add an event listener to the Previous button

 previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
      
        let index= songs.indexOf(decodeURI(((currentSong.src.split('/').slice(-1)))))
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")
      let index= songs.indexOf(decodeURI(((currentSong.src.split('/').slice(-1)))))
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

//Add an event to range
document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change',(e)=>{
    console.log('Setting value to', e.target.value,'/100')

    currentSong.volume=parseInt(e.target.value)/100
})



//load the playlist whenever the card is clicked
Array.from(document.getElementsByClassName("card")).forEach(e=>{

        // console.log(e)
        e.addEventListener('click',async item=>{
            // console.log(item,item.currentTarget.dataset)
            songs= await getsongs(`songs/${item.currentTarget.dataset.folder}`)
        })

    })





    
}

main()

































// main();
