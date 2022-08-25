import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userRegistration!: FormGroup;
  hide = true;
  countries: string[] = [];
  states: string[] = [];
  // countryControl = new FormControl('');
  // filteredCountries: Observable<string[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {
    this.api.get("/countries").subscribe((data) => {
      this.countries = data;
      // console.log(this.countries);
    })
  }

  ngOnInit(): void {
    this.userRegistration = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]'?[- a-zA-Z]+$")]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      country: [],
      state: [],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.passwordMatchingValidatior })
    //country filter
    // this.filteredCountries = this.countryControl.valueChanges.pipe(
    //   startWith(""),
    //   map((country: string | null) =>
    //     country ? this._countryFilter(country) : this.countries.slice()
    //   )
    // );
  }
  onSubmit() {
    // console.log(this.userRegistration.value);
    this.api.post("/user", this.userRegistration.value).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl("/auth/sign-in")

    })
  }
  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  // private _countryFilter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.countries.filter((country) =>
  //     country.toLowerCase().includes(filterValue)
  //   );
  // }
  onCountrySelect(event: any) {
    let country = event.target.value;
    this.api.get("/states/" + country).subscribe((data) => {
      this.states = data;
    })
  }
}
