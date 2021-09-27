import { Component, OnInit } from '@angular/core';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InventoryPos } from 'src/app/validators/inventory-pos';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { Companies } from 'src/app/common/companies';
import { CompanyApiCallServiceService } from 'src/app/services/company-api-call-service.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss'],
})
export class CompanyUpdateComponent implements OnInit {
  //Snotify Message
  style = 'material';
  title = 'Alert Message';
  body = 'text';
  timeout = 1500;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 50;
  bodyMaxLength = 80;

  company: Companies = new Companies();
  private routeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private companyApiCallService:CompanyApiCallServiceService,
    private snotifyService: SnotifyService
  ) {}
  companyFormGroup: FormGroup;
  private currentCompanyId: number = 1;
  ngOnInit(): void {
    //validate url id is number or not
    this.routeSub = this.route.params.subscribe((params) => {
      this.currentCompanyId = +params['id'];
      if (isNaN(this.currentCompanyId)) {
        this.router.navigate(['/', 'company-page']);
      }
    });

    this.companyService.getCompanyById(this.currentCompanyId).subscribe({
      next: (response) => {
        this.company.id = +response['id'];
        this.company.name = response['name'];
        this.company.address = response['address'];
        this.company.phoneNumber = response['phoneNumber'];
        this.company.emailAddress = response['emailAddress'];
        this.company.websiteAddress = response['websiteAddress'];
      },
      error: (err) => {
        this.router.navigate(['/', 'company-page']);
      },
    });

    this.companyFormGroup = this.formBuilder.group({
      Name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
      Website: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        InventoryPos.notOnlyWhitespace,
      ]),
    });
  }

  //Company Name Getter for validation
  get Name() {
    return this.companyFormGroup.get('Name');
  }

  //Company Address Getter for validation
  get Address() {
    return this.companyFormGroup.get('Address');
  }

  //Company Phone Getter for validation
  get Phone() {
    return this.companyFormGroup.get('Phone');
  }

  //Company Email Getter for validation
  get Email() {
    return this.companyFormGroup.get('Email');
  }

  //Company Website Getter for validation
  get Website() {
    return this.companyFormGroup.get('Website');
  }

  //Snotify Alert
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates,
      },
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
    };
  }

  //Snotify Alert Methods
  onSuccess() {
    this.snotifyService.success(this.body, this.title, this.getConfig());
  }
  onInfo() {
    this.snotifyService.info(this.body, this.title, this.getConfig());
  }
  onError() {
    this.snotifyService.error(this.body, this.title, this.getConfig());
  }
  onWarning() {
    this.snotifyService.warning(this.body, this.title, this.getConfig());
  }

  onUpdate() {
    if (this.companyFormGroup.invalid) {
      this.companyFormGroup.markAllAsTouched();
      return;
    }

    this.company.name = this.companyFormGroup.controls['Name'].value;
    this.company.address = this.companyFormGroup.controls['Address'].value;
    this.company.phoneNumber = this.companyFormGroup.controls['Phone'].value;
    this.company.emailAddress = this.companyFormGroup.controls['Email'].value;
    this.company.websiteAddress =
      this.companyFormGroup.controls['Website'].value;
      this.companyApiCallService
      .updateCompany(this.company)
      .subscribe({
        next: (response) => {
          this.title = 'Update Success';
          this.body = 'Company: ' + `${response.name}`;
          this.onSuccess();
        }
      });


  }
}
