  import { Component } from '@angular/core';
// import services from ngx-facebook.
import { FacebookService, InitParams, LoginResponse, LoginOptions} from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  app;
  profileImageUrl;
  token: any; // token is used for storing the token which is received during login
  data;
  userDetails: Object;
  friend;
  userInfo: boolean = false; //used for getting the status of the api and render on the html page

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '1162125983933668', //appID is generated from facebook for developers.
      cookie: true,  // enable cookies to allow the server to access  the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8'
    };
    //The method FB.init() is used to initialize and setup the SDK
    fb.init(initParams);
  }

  FbLogin() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_posts,public_profile,user_friends,email,pages_show_list,publish_actions'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.data = res.authResponse.userID;
        this.token = res.authResponse.accessToken;

        // this.app = '/' + this.data + '/friends' + '?access_token=' + this.token;
        // console.log(this.app);

        //FB.api() will automatically add the access token to the call.
        // Learn more from https://developers.facebook.com/docs/javascript/reference/FB.api

//api for getting  profile image only
        this.fb.api('/me/picture?type=large&redirect=true&width=400&height=400" ')
          .then((res: any) => {
            this.userInfo =true;
            console.log(res);
            this.profileImageUrl = res.data.url;
          })




        //api for getting the specified fields.
        this.fb.api('/me?fields=gender,first_name,last_name,email,picture')
          .then((res: any) => {
            this.userDetails = res;
              console.log(this.userDetails);
            //  console.log(res.picture.data.url);
            this.userInfo =true;
          })

        // api for getting the total number of friends.
        // this.fb.api(this.app)
        //   .then((response) => {
        //     console.log(response)
        //     this.friend = response.summary.total_count;
        //     this.details.friends = this.friend;
        //     console.log(this.details);
        //     console.log("Hello00");
        //     console.log(this.details.friends);
        //
        //   })

        // this.fb.api("/me/feed/?limit=20")
        //   .then((res) => {
        //     console.log(res.data.length);
        //     // this.details.post=res.data;
        //
        //   })
        //   .catch((error) => console.log(error));

      })
      .catch(this.handleError);

  }


  // We can also add the functuonality of posting the post ....


  private handleError(error) {
    console.error('Error processing action', error);
  }

}
