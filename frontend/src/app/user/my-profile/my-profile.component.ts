import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public selectedFiles: { file: File; fileObjective: string }[] = [];
  myProfile!: FormGroup;
  hide = true;
  user: any;
  edit: boolean = false;
  fileUrl: any = "";
  profilePic: any = "";
  countries: string[] = [];
  states: string[] = [];

  constructor(
    private fb: FormBuilder,
    private utils: UtilsService,
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.user = this.utils.getUser();
    this.api.get("/user/" + this.user._id).subscribe((data) => {
      // console.log(data);

      this.profilePic = data.profilePic;
      // console.log(this.profilePic);

      this.myProfile.patchValue(data);
    })
    this.api.get("/countries").subscribe((data) => {
      this.countries = data;
      // console.log(this.countries);
    })
  }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      profilePic: [],
      country: [],
      state: [],
    })
    this.fileUrl = this.api.getFile(
      "/getFile/g/"
    );
  }

  editProfile(objective: any) {
    // console.log(objective);
    this.edit = true;
    document.getElementById(objective)?.click()
  }
  onFileSelect(event: any, objective: any) {
    console.log("sr" + event);
    console.log(event);
    console.log("sr" + event);
    const file = event.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      if (file.size <= 5000000) {
        if (event.target.files && event.target.files[0]) {
          let selectedFile = {
            file: event.target.files[0],
            fileObjective: objective,
          };
          this.uploadFile(selectedFile, (data: any) => {
            console.log(data);
          });
        }
      }
      else {
        // alert("File size must be less than 5MB");
        this.snackBar.open('File size must be less than 5MB', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
    else {
      // alert("File type must be jpg, jpeg , png or pdf");
      this.snackBar.open('File type must be jpg, jpeg , png or pdf.', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  uploadFile(selectedFile: { file: any; fileObjective: any; }, callback: any) {
    console.log('sr');

    const fileData: FormData = new FormData();
    fileData.append("file", selectedFile.file, selectedFile.file.name);
    fileData.append("id", this.user._id);
    fileData.append("fileObjective", selectedFile.fileObjective);

    console.log(fileData);

    this.api
      .post((this.profilePic && this.profilePic != 'placeholder.jpg') ? "/updateFile/g/" + this.profilePic
        : "/uploadFile/g/", fileData)
      .subscribe((data) => {
        // console.log(this.profilePic);
        console.log('SR');

        callback(data);
        console.log(data);

        this.profilePic = data.filename;
        this.myProfile.patchValue({
          profilePic: data.filename,
        });
        console.log(this.myProfile);

        this.snackBar.open("Profile Picture Updated", "", {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        })
        this.api
          .patch("/user/" + this.user._id, this.myProfile.value)
          .subscribe((data) => {
            console.log(data);

          })
      });
  }
  onSubmit() {
    console.log(this.myProfile.value);
    this.api.patch("/user/" + this.user._id, this.myProfile.value).subscribe((data) => {
      this.edit = false;
      this.myProfile.patchValue(data);
      this.snackBar.open("Profile Updated", "", {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000
      })
    })
  }
  onCountrySelect(event: any) {
    let country = event.target.value;
    this.api.get("/states/" + country).subscribe((data) => {
      this.states = data;
    })
  }
}
