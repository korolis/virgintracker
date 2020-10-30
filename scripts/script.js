var playerlist = ['Xatoj', 'Laizy', 'Sizze', 'Nìna','Clummsy'];

    var status_offline = [];
    var status_lobby = [];
    var status_selection = [];
    var status_ingame = [];
    var status_online = [];

    var playerStats = [];

    function play()
    {
      var playaudio = setTimeout(function() {
        var audio = new Audio('https://static.wikia.nocookie.net/paladins_gamepedia/images/7/75/Dredge_Skin01_VGS_Emote_W.ogg/');
        audio.play();
      }, 300000);
    }


    async function retrievePlayer(player) 
    {

        await $.get("http://dredgetracker.herokuapp.com:5000/player?name=" + player, async function (data, status){
          
            if (Object.keys(data).length === 0)
            {
                $('#error').text('Player not found!');
            }
            else
            {
                $('#error').text('');

                if (data[0].status == 'Unknown')
                {
                    data[0].name = player;
                    data[0].status = 'Private profile';
                }

                if (data[0].avatar_url == null)
                {
                    data[0].avatar_url = 'https://cdn.discordapp.com/attachments/643541990625247238/771358880366198824/6c65c177e94e7554e1fdb0af3038acb7-icono-de-signo-de-interrogaci--n-cuadrado-by-vexels.png';
                }

                playerStats.push(data[0]);
            }
        });
    }

     function updatePlayers()
    {
      var onlinehtml = '';
      var offlinehtml = '';

      status_online = [];
      status_offline = [];
     
       $("#onlineplayers").text(onlinehtml);
       $("#offlineplayers").text(offlinehtml);


      for (const player in playerStats)
      {
       
          if (playerStats[player].status == 'Offline' || playerStats[player].status == 'Private profile') 
          {
              status_offline[playerStats[player].name]   = playerStats[player];
          }
          else 
          {
              status_online[playerStats[player].name] = playerStats[player];
          }
      }

      var j = 0;

      var i = 0;
      for(const player in status_online)
      {
          var avatar = status_online[player].avatar_url;
          var name = status_online[player].name;
          var status = status_online[player].status;
          var color;
      
          if (status == 'In Lobby') color = 'rgb(255, 0, 0)';
          if (status == 'In Game') color = 'rgb(0, 255, 0)';
          if (status == 'God Selection') 
          {
              status = 'Champion Selection';
              color = 'rgb(255, 255, 0)';
          }
          i++;

          if (i == 1)
          {
            onlinehtml += 
              '<div class = "container"> \
                <div style= "display: table-cell; width:250px; background-color: lightblue;"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px ' + color + '" src="' + avatar + '"> \
                    </div> \
                    <div> \
                      <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                      <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; color:rgb(30, 50, 122)">' + name + '</div> \
                      <div style="text-align: left; padding-left: 90px; padding-top: 9px; font-size: 16px; font-style: italic;">' + status + '</div> \
                  </div> \
                </div>'
              ;
          }
          else if(i == 2 || i == 3)
          {
            onlinehtml += 
            '<div style= "display: table-cell; width:5px; background-color: transparent;"></div> \
              <div style= "display: table-cell; width:250px; background-color: lightblue;"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px ' + color + '" src="' + avatar + '"> \
                  </div> \
                  <div> \
                    <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                    <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; color:rgb(30, 50, 122)">' + name + '</div> \
                    <div style="text-align: left; padding-left: 90px; padding-top: 09px; font-size: 16px; font-style: italic;">' + status + '</div> \
                  </div> \
                </div>';
          }
          else if(i == 4)
          {
            onlinehtml += 
            '<div style= "display: table-cell; width:5px; background-color: transparent;"></div> \
              <div style= "display: table-cell; width:250px; background-color: lightblue;"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px ' + color + '" src="' + avatar + '"> \
                  </div> \
                  <div> \
                    <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                    <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; color:rgb(30, 50, 122)">' + name + '</div> \
                    <div style="text-align: left; padding-left: 90px; padding-top: 9px; font-size: 16px; font-style: italic;">' + status + '</div> \
                  </div> \
                </div> \
              </div>';
                
            i = 0;
          }
      };


      i = 0;
      for(const player in status_offline)
      {
          var avatar = status_offline[player].avatar_url;
          var name = status_offline[player].name;
          var status = status_offline[player].status;
          var color = 'rgb(90, 90, 90); filter: grayscale(100%);';
        
          i++;

          if (i == 1)
          {
            offlinehtml += 
            '<div class = "container"> \
                <div style= "display: table-cell; width:250px; background-color: rgb(180, 180, 180);"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px rgb(90, 90, 90); filter: grayscale(100%);" src="' + avatar + '"> </div> \
                  <div> \
                    <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                    <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; ">' + name + '</div> \
                    <div style="text-align: left; padding-left: 90px; padding-top: 9px; font-size: 16px; font-style: italic;">' + status + '</div> \
                  </div> \
                </div>';
          }
          else if(i == 2 || i == 3)
          {
            offlinehtml +=
            '<div style= "display: table-cell; width:5px; background-color: transparent;"></div> \
              <div style= "display: table-cell; width:250px; background-color: rgb(180, 180, 180);"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px rgb(90, 90, 90); filter: grayscale(100%);" src="' + avatar + '"> \
                  </div> \
                  <div> \
                    <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                    <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; ">' + name + '</div> \
                    <div style="text-align: left; padding-left: 90px; padding-top: 9px; font-size: 16px; font-style: italic;">' + status_offline[player].status + '</div> \
                  </div> \
                </div>';
          }
          else if(i == 4)
          {
            offlinehtml +=
            '<div style= "display: table-cell; width:5px; background-color: transparent;"></div> \
              <div style= "display: table-cell; width:250px; background-color: rgb(180, 180, 180);"> \
                  <div class ="imgdiv" style="float:left"> \
                    <img class="avatar" style = "box-shadow: 0px 0px 5px 3px rgb(90, 90, 90); filter: grayscale(100%);" src="' + avatar + '"> \
                  </div> \
                  <div> \
                    <img class="closebutton" src="https://cdn.discordapp.com/attachments/643541990625247238/771526290166513714/crossexitremoveicon-1320161389317562876.png" style="float:right; z-index: 2" width="24" /> \
                    <div class="plname" style="text-align: left; font-weight:bold;padding-left: 90px; padding-top: 10px; font-size: 21px; ">' + name + '</div> \
                    <div style="text-align: left; padding-left: 90px; padding-top: 9px; font-size: 16px; font-style: italic;">' + status + '</div> \
                  </div> \
                </div> \
              </div>';
              i = 0;
                
          }
      }

      $("#onlineplayers").append(onlinehtml);
      $("#offlineplayers").append(offlinehtml);
    }


    $(document).ready(async function()
    {


      $('body').html();
      var draudio = await document.getElementById("draudio");


      var storedPlayers = JSON.parse(localStorage.getItem('playersSaved'));
      
      if (storedPlayers != null)
      {
          for (const player of storedPlayers)
          {
              await retrievePlayer(player);   
          }
          updatePlayers();
      }



      $('body').on('click', '#submitplayer', async function()
        { 
          if ($("#playerinput").val() != '') 
          {
              var storedPlayers = JSON.parse(localStorage.getItem('playersSaved'));
              storedPlayers.push($("#playerinput").val());
              localStorage.setItem('playersSaved', JSON.stringify(storedPlayers));

              await retrievePlayer($("#playerinput").val());
          };

          updatePlayers();
        });
        

      $('body').on('click', '.closebutton', async function()
      {
          var player = $(this).parent().children(".plname").text();
            
          var storedPlayers = JSON.parse(localStorage.getItem('playersSaved'));

          storedPlayers.splice(storedPlayers.indexOf(player),1);
          localStorage.setItem('playersSaved', JSON.stringify(storedPlayers));

          playerStats = [];

          for (const player of storedPlayers)
          {
              await retrievePlayer(player);   
          }

          updatePlayers();
          
          return false;
      });
      
  });