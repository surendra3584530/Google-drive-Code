import { Component } from '@angular/core';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
 {
    // Client ID and API key from the Developer Console
  CLIENT_ID = '536077714758-t6topsrfcn0v80plcgakd9tnvss8hqbu.apps.googleusercontent.com';
  API_KEY = 'AIzaSyCNSsG7Sl-5-iqiT2QHrleMlpIaJmHkGVk';
   
  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
   
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

  signInButton = document.getElementById('signin_button');


   loadGoogleDrive(e) {
     var target = document.getElementById('signin_button').textContent;
     if(target == 'signIn'){
      gapi.load('client:auth2', this.initClient());
     }else{
        this.signOut();
     } 
   }
   
   initClient()
    {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
    }).then(data=>{
       // Listen for sign-in state changes.
       gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        // Handle the initial sign-in state.
        this.handleAuthClick();
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch(error=> {
              this.appendPre(JSON.stringify(error, null, 2));
     });
    }

    handleAuthClick() {
      gapi.auth2.getAuthInstance().signIn();
    }

    handleSignoutClick() {
      gapi.auth2.getAuthInstance().signOut();
    }

    appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message);
      pre.appendChild(textContent);
    }

     updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.listFiles();
      } 
    }
    
    listFiles() {
      gapi.client.drive.files.list({
        'pageSize': 10,
        'q': "mimeType='text/csv'",
        'fields': "nextPageToken, files(id, name)"
      }).then(response =>{
        this.appendPre('Files:    ');
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            this.appendPre(file.name);
            var btn = document.createElement("button");                
            btn.innerHTML = "Open";  
            btn.setAttribute('id',file.id); 
            btn.addEventListener("click",this.getFile);
            document.getElementById('content').appendChild(btn);
            var br = document.createElement("br");
            document.getElementById('content').appendChild(br);

          }
          document.getElementById('signin_button').innerHTML = 'signOut';
          document.getElementById('para').innerHTML = 'Sucessfully SignIn ,now you can access the files!!!!';
          document.getElementById('para').style.color = 'green';
        } else {
          this.appendPre('No files found.');
        }
      });
    }

    getFile(e)
    {
      var btn = e.target;
      gapi.client.drive.files.get({
          'fileId': btn.id,
          'alt': 'media'
      }).then(data=>{

        var data = data.body.split(/\r?\n|\r/)
        var table_data = document.createElement('table');
        table_data.id = 'csv';
        table_data.className = "table table-bordered table-striped";
        for(var count = 0; count<data.length; count++)
          {
           var tr = document.createElement('tr');
           var cell_data = data[count].split(",");
           for(var cell_count=0; cell_count<cell_data.length; cell_count++)
           {
                var td1 = document.createElement('td');
                if(count === 0)
                {
                  td1.innerHTML =  cell_data[cell_count];
                // table_data += '<th>'+cell_data[cell_count]+'</th>';
                }
                else
                {
                  td1.innerHTML =  cell_data[cell_count];
                //table_data += '<td>'+cell_data[cell_count]+'</td>';
                }
                tr.appendChild(td1);
          }
           table_data.appendChild(tr);
          }
             document.getElementById('table').appendChild(table_data);

             var input = document.createElement("input");
             var input1 = document.createElement("input");
             var input2 = document.createElement("input");
             input.type = "text";
             input1.type  = "text";
             input2.type = 'text';
             document.getElementById('input1').appendChild(input);
             document.getElementById('input1').appendChild(document.createTextNode(' + '));
             document.getElementById('input2').appendChild(input1);
             document.getElementById('input2').appendChild(document.createTextNode(' = '));
             document.getElementById('name').appendChild(input2);
             var btn = document.createElement("button");                
             btn.innerHTML = "Add"; 
             document.getElementById('add').appendChild(btn);

             btn.addEventListener("click",function(){
                var input1 = (<HTMLInputElement>document.getElementById("input1").firstElementChild).value;
                var input2 = (<HTMLInputElement>document.getElementById("input2").firstElementChild).value;
                var name = (<HTMLInputElement>document.getElementById("name").firstElementChild).value;
               
                var tb = document.getElementById('csv');
                for(var count = 0; count<data.length; count++)
                {
                   var tr = document.createElement('tr');
                   var cell_data = data[count].split(",");
                      var td1 = document.createElement('td');
                      if(count === 0)
                      {
                        td1.innerHTML =  name;
                      }
                      else
                      {
                        td1.innerHTML =  cell_data[input1] + cell_data[input2];
                      }
                      tr.appendChild(td1);
                      tb.appendChild(tr);
                }
             });
             })
      }
      signOut(){
        this.handleSignoutClick();
        document.getElementById('signin_button').innerHTML = 'signIn';
        document.getElementById('para').innerHTML = 'Please Login to Continue';
        document.getElementById('para').style.color = 'red';
        window.location.reload();
      }
}