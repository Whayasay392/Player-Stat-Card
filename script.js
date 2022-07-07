// Variables declarations
let playerName = document.querySelector('.player-name');
let playerPosition = document.querySelector('.player-position');
let appearance = document.querySelector('#appearance');
let goals = document.querySelector('#goals');
let assists = document.querySelector('#assists');
let goalPerMatch = document.querySelector('#goalPerMatch');
let PassPerMin = document.querySelector('#PassPerMin');
let select = document.querySelector('#player-select');

// This variable is created because Per Mertesecker assists is missing in the json files
let PerAssist = '0'; 

// Using Fetch() to extract json files 
const url = '/data/player-stats.json'
fetch(url).then(function (res){
    return res.json();
}).then(function (data){
    appenDatatoHTML(data);
}).catch(function (err){
    console.log(err)
})

// reusable Passes per minute calculations
function PassesPerMinute(playerInstance ) 
{
let forwardPass = playerInstance.stats[4].value;
let backwardPass = playerInstance.stats[8].value
let minsPlayed = playerInstance.stats[7].value

var sum =  (backwardPass + forwardPass) / minsPlayed; // formula for calcuating passes per minute
sum2 = sum.toFixed(2); // converting our answer to 2 digit number
return sum2 // return the new result 

}
// Pass per minute calculation for Per Mertesecker
function PerPassesPerMinute(playerInstance ) 
{
let forwardPass = playerInstance.stats[4].value;
let backwardPass = playerInstance.stats[7].value
let minsPlayed = playerInstance.stats[6].value

var sum =  (backwardPass + forwardPass) / minsPlayed; // formula for calcuating passes per minute
sum2 = sum.toFixed(2); // converting our answer to 2 digit number
return sum2 // return the new result 
  
}

// reusable Goals per match calculations
function GoalsPerMatch(Instance) {
    let goals = Instance.stats[0].value;
    let losses = Instance.stats[1].value;
    let wins = Instance.stats[2].value
    let draws = Instance.stats[3].value
     var sum3 = goals / (losses + wins + draws);
    goalSum = sum3.toFixed(2) // converting our answer to 2 digit number
    return goalSum; // return the new result 
         }


// fuction to append datas
 function appenDatatoHTML(data) {
     console.log(data)
     let playerStats = data.players; 
     console.log(playerStats[0].player.name);


// Per Mertesacker Data change handler 
function PerDataChange(arg) 
{
    playerPosition.innerHTML = playerStats[3].player.info.positionInfo
    playerName.innerHTML = playerStats[3].player.name.first + " " + playerStats[3].player.name.last
    goalPerMatch.innerHTML = GoalsPerMatch(arg);
 
    PassPerMin.innerHTML = PerPassesPerMinute(arg);  
}
//    Reusable general data change handlers 
     function changeData(arg) 
{
    playerPosition.innerHTML = arg.player.info.positionInfo
    playerName.innerHTML = arg.player.name.first + " " + arg.player.name.last
    goals.innerHTML = arg.stats[0].value;
    assists.innerHTML = arg.stats[5].value;
    appearance.innerHTML = arg.stats[6].value;
    goalPerMatch.innerHTML = GoalsPerMatch(arg);
    
    PassPerMin.innerHTML = PassesPerMinute(arg);  

}
 

select.onchange = function() {
 
  // If the if statements conditions that run when  "select" element' current value(option) has a value that matches the conditional logic 
    if (this.value === "Toby")   {
        changeData(playerStats[0]), 
        

      //Change class attribute for images depening on condition
    document.querySelector(".cardBG").setAttribute("id", "TobyBg"), 
    document.querySelector("#badgeElement").setAttribute("class", "TobyBadge ");
    }   
  
  else  if (this.value === "Yaya")    {
      changeData(playerStats[1]), 
    //   playerPosition.innerHTML = 'Midfielder',
     
    document.querySelector(".cardBG").setAttribute("id", "YayaBg"),
    document.getElementById("badgeElement").setAttribute("class", "YayaBadge ");
  } 
  
   else if (this.value === "Rooney")  {
       changeData(playerStats[2]), 
    //    playerPosition.innerHTML = 'Striker',
    document.querySelector(".cardBG").setAttribute("id", "RooneyBg"),
    document.getElementById("badgeElement").setAttribute("class", "RooneyBadge ") ;
   } 

   else if (this.value === "Mertesacker") {
         PerDataChange(playerStats[3]),
        //  playerPosition.innerHTML = 'Defender',
        
       
    document.querySelector(".cardBG").setAttribute("id", "PerBg"),
    document.getElementById("badgeElement").setAttribute("class", "PerBadge ");
   }  
  
    else if (this.value === "Mahrez")   {
        changeData(playerStats[4]), 
        playerName.innerHTML = 'Riyad Mahrez',
        // playerPosition.innerHTML = 'Winger',
       
      
    document.querySelector(".cardBG").setAttribute("id", "MahrezBg"),
    document.getElementById("badgeElement").setAttribute("class", "MahrezBadge ");
    }  
    else{
        alert(console.error())
    }
     
}

     

 }
