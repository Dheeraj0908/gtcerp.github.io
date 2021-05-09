

var firebaseConfig = {
    apiKey: "AIzaSyC1LJL1YIetfiC-hDiDf5vmIbcCjKRAViM",
    authDomain: "erp-43ba7.firebaseapp.com",
    databaseURL: "https://erp-43ba7-default-rtdb.firebaseio.com",
    projectId: "erp-43ba7",
    storageBucket: "erp-43ba7.appspot.com",
    messagingSenderId: "197968490717",
    appId: "1:197968490717:web:2d20a73ff6d809a5e86b34",
    measurementId: "G-L8EV7J159N"
  };
 
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  

function dataload(){
    document.getElementById("details").innerHTML = localStorage.getItem("Tname")+"-"+localStorage.getItem("Sname")
    get()
}

  
  function spresent(rollnum , sname){
    var course = localStorage.getItem("Sname")
    var datemain = document.getElementById("date").value
    var Rollnumber = rollnum
    var Name = sname
  
    var Status = "P"


    if (datemain == ""){
        let today = new Date();

        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();
        if(date<10) 
        {
            date='0'+date;
        } 
        
        if(month<10) 
        {
            month='0'+month;
        } 
        let current_date = `${year}-${month}-${date}`;
        datemain  = current_date
    }
   
    
    
  

    database.ref('Btech4sem/' + course + '/' + datemain + '/' +Rollnumber).set({
     Name : Name,
     Rollnumber : Rollnumber,
     Course : course,
     Dateofclass : datemain,
     Status: Status,
     });
     
    document.getElementById(rollnum).innerHTML = '<button type="button" class="btn btn-success buttonsize2" onclick="sdelete(\''+rollnum+'\',\''+sname+'\')">Student Present</button>'
   
 
     
 
 }
 


function sabsent(rollnum , sname)
{
    var course = localStorage.getItem("Sname")
    var datemain = document.getElementById("date").value
    var Rollnumber = rollnum
    var Name = sname
    var Status = "A"

    if (datemain == ""){
        let today = new Date();

        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();
        if(date<10) 
        {
            date='0'+date;
        } 
        
        if(month<10) 
        {
            month='0'+month;
        } 
        let current_date = `${year}-${month}-${date}`;
        datemain  = current_date
    }
  

    database.ref('Btech4sem/' + course + '/' + datemain + '/' +Rollnumber).set({
     Name : Name,
     Rollnumber : Rollnumber,
     Course : course,
     Dateofclass : datemain,
     Status: Status,
     });
     
    document.getElementById(rollnum).innerHTML = '<button type="button" class="btn btn-danger buttonsize2" onclick="sdelete(\''+rollnum+'\',\''+sname+'\')">Student Absent</button>'
   
}

function sdelete(rollnum , sname)
{
    document.getElementById(rollnum).innerHTML ='<button type="button" class="btn btn-success buttonsize" onclick="spresent(\''+rollnum+'\',\''+sname+'\')">Present </button><button type="button" class="btn btn-danger buttonsize" onclick="sabsent(\''+rollnum+'\',\''+sname+'\')">Absent</button>'

}

function change22()
{
    let today = new Date();

    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    if(date<10) 
    {
        date='0'+date;
    } 
    
    if(month<10) 
    {
        month='0'+month;
    } 
    let current_date = `${year}-${month}-${date}`;
    var date2 = document.getElementById("date").value

    if (date2 == ""){
        console.log(current_date)
    }
    else{
        console.log(date2)
    }
    





}
function changepage(name , data ){
    

    localStorage.setItem("Tname",name)
    localStorage.setItem("Sname",data)
    console.log(localStorage.getItem("Tname"))
    console.log(localStorage.getItem("Sname"))
    window.location.href="attendance.html"
    
}
function gotoview(name , data ){
    

    localStorage.setItem("Tname",name)
    localStorage.setItem("Sname",data)
    console.log(localStorage.getItem("Tname"))
    console.log(localStorage.getItem("Sname"))
    window.location.pathname="selectdate.html"
    
}
function changepageto(dateto ){
    localStorage.setItem("dateto",dateto)
    window.location.pathname="view.html"
    
}


function get(){

    var course = localStorage.getItem("Sname")
    var datato = localStorage.getItem("dateto")
    

     database.ref('Btech4sem/' + course + '/' + datato ).once('value' , function(snapshot){

         
        snapshot.forEach( 
            function(currentrecord){
                 var name = currentrecord.val().Name
                 var Course = currentrecord.val().Course
                 var Rollnumber = currentrecord.val().Rollnumber
                 var Status = currentrecord.val().Status
                 
                var table = document.getElementById('myTable')
                console.log(name)
                console.log(currentrecord.val())
            if (Status == "P") {
                var row = `<tr class="active-row"  >
                <td>${Rollnumber}</td>
                <td>${name}</td>
                <td>Btech(CSE)</td>
                <td> ${Course}
                </td>
                <td> ${Status == "P"?"Present":"Absent"}
                </td>
               
               </tr>`
                
               table.innerHTML += row
            }
            else{
                var row = `<tr class="inactive-row"  >
                <td>${Rollnumber}</td>
                <td>${name}</td>
                <td>Btech(CSE)</td>
                <td> ${Course}
                </td>
                <td> ${Status == "P"?"Present":"Absent"}
                </td>
               
               </tr>`
                
               table.innerHTML += row
            }
            }
            
        )
          



    })

    


}
function get2(){

    var course = localStorage.getItem("Sname")
   

     database.ref('Btech4sem/' + course ).once('value' , function(snapshot){

        mainfun = Object.keys(snapshot.val())
        buildTable2(mainfun)
        console.log((Object.keys(snapshot.val()))          
        )
    })

    


}


  




function buildTable2(data){

    var table2 = document.getElementById('myTable2')
    for (var i = 0; i < data.length; i++){
      console.log(data[i])

      var row = `<tr>
      <td>${i +1}</td>
      <td>${data[i]}</td>
      <td>${localStorage.getItem("Sname")}</td>

      <td>
        
        <button type="button" class="btn btn-warning buttonsize2 " onclick="changepageto('${data[i]}')">View</button>
        
      </td>
    
  </tr>`

  table2.innerHTML += row

     

    }
}


function buildTable(data){
    var table = document.getElementById('myTable')
    console.log("ok")
    console.log(data.length)

 

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].Course}</td>
                        <td>${data[i].Dateofclass}</td>
                        <td>${data[i].Rollnumber}</td>
                    </tr>`
        table.innerHTML += row
        console.log("ok")
    }
}


function logout() {
    window.location.pathname = "index.html"

}



















