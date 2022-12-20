// Initializing the variables
let audioElement = new Audio("assets/songs/2.mp3")
let masterPlay = document.getElementById('masterPlay');
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let playback = document.getElementById('playback');
let playnPause = document.getElementsByClassName('playnPause')
let songPlay = document.querySelector('.song1');
let slno = document.getElementById('slno')
let divOfPlayPause = document.getElementById('divOfPlayPause')
let songIndex = 0
let totalSongs= Array.from(playnPause).length
let songItem = Array.from(document.querySelectorAll('.songItem'))
// let songs = [
//     { songName: "Levitating", artistName:"Dua Lipa", filePath: "songs/1.mp3", coverPath: "assets/covers/duaLipa.png" },
//     { songName: "Boyfriend", artistName:"Dove Camin", filePath: "songs/2.mp3", coverPath: "assets/covers/boyfriend.jpg" },
//     { songName: "One Dance", artistName:"Drake ft.Wiz", filePath: "songs/3.mp3", coverPath: "assets/covers/oneDance.png" },
//     { songName: "Pepas remix", artistName:"Farruko", filePath: "songs/4.mp3", coverPath: "assets/covers/pepas.jpg" },
//     { songName: "Starboy", artistName:"The Weeknd", filePath: "songs/5.mp3", coverPath: "assets/covers/weeknd.jpg" },

// ]
const makeAllPlay = () => {
    Array.from(playnPause).forEach((element) => {
        element.classList.remove("fa-pause")
        element.classList.add("fa-play")
    })
}
const addPauseButton=()=>{
    let bbd = Array.from(playnPause)[songIndex]
    bbd.classList.remove("fa-play")
    bbd.classList.add("fa-pause")
}
const songFocus=() =>{
Array.from(document.getElementsByClassName("songItem")).forEach((element)=>{
    element.classList.remove("bg-white/[0.15]")
})
Array.from(document.getElementsByClassName("songItem"))[songIndex].classList.add("bg-white/[0.15]")
}
// songItem.forEach((element, i) => {
//     element.querySelector(".slno").innerText = i + 1
//     element.querySelector(".songName").innerHTML = songs[i].songName
//     element.querySelector(".artistName").innerHTML = songs[i].artistName
//     element.querySelector(".coverPath").src = songs[i].coverPath
// });

// Listening events
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause()
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
    }
})
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    playback.value = progress;
})

playback.addEventListener('change', () => {
    audioElement.currentTime = playback.value * audioElement.duration / 100;
})


Array.from(playnPause).forEach((element, i) => {
    // Adding id to all the playnPause elements
    element.setAttribute("id", `${i}`)
    element.addEventListener('click', (e) => {
        if (audioElement.paused) {
            makeAllPlay();
            songIndex = i
            e.target.classList.remove("fa-play")
            e.target.classList.add("fa-pause")
            audioElement.currentTime = 0
            audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
            audioElement.play()
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            
        }

        else {
            if (e.target.classList.contains("fa-play") && audioElement.played) {
                
             
             console.log(songIndex)
                makeAllPlay()
                songIndex = i
                e.target.classList.add("fa-pause")
                e.target.classList.remove("fa-play")
                audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
                audioElement.play()
                masterPlay.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
            }
            else {

                makeAllPlay();
                songIndex = i
                e.target.classList.remove("fa-pause")
                e.target.classList.add("fa-play")
                audioElement.pause()
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }

        }
    })

}
)

next.addEventListener(('click'), (e) => {
    songIndex++
    if (songIndex>totalSongs-1) {
        songIndex=0
    }
    

    audioElement.pause()
    audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
    audioElement.play()
    makeAllPlay()
    addPauseButton()
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})
prev.addEventListener(('click'), (e) => {
    songIndex--
    if (songIndex<0) {
        songIndex=totalSongs-1
    }
    

    audioElement.pause()
    audioElement.src = `assets/songs/${songIndex + 1}.mp3`;
    audioElement.play()
    makeAllPlay()
    addPauseButton()
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
})