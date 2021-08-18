import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserBlogPostService } from 'src/app/services/user-blog-post/user-blog-post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  url = '';
  blogPosts;
  selectedFile: File;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private userBlogService: UserBlogPostService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      inputName: ['', Validators.required],
      inputSurname: ['', Validators.required],
      inputUserName: ['', Validators.required],
      inputEmail: ['', Validators.required]
    });
    this.userService.get().subscribe(
      (user) => {
        console.log("user", user);
        if (user.result["profileImageURL"] != null) {
          this.url = user.result["profileImageURL"];
          document.getElementById('default_image').style.display = 'none';
        }
        this.registerForm.patchValue({
          inputName: user.result["name"],
          inputSurname: user.result["surname"],
          inputUserName: user.result["userName"],
          inputEmail: user.result["email"]
        });
        console.log("form", this.registerForm);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result.toString();
        document.getElementById('default_image').style.display = 'none';
      }
    }
  }

  onUpload() {
    this.userService.uploadProfileImage(this.selectedFile).subscribe(data => {
      console.log(data);
    });
  }

  onSubmit() {
    var model = {
      "name": this.registerForm.get("inputName").value,
      "surname": this.registerForm.get("inputSurname").value,
      "userName": this.registerForm.get("inputUserName").value
    };

    this.userService.updateUserInfo(model).subscribe(() => { });
  }

}
