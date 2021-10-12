import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateProductStock } from 'src/app/common/update-product-stock';
import { ProductApicallService } from 'src/app/services/product-apicall.service';
import { ProductService } from 'src/app/services/product.service';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';
@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {

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

  private routeSub: Subscription;
  private productId:number;
  updateProductStock:UpdateProductStock=new UpdateProductStock();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService:ProductService,
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService,
    private productApicallService:ProductApicallService) { }

     //for validation Number
  numberRegEx = /^[1-9]\d*$/;

    productStockFormGroup:FormGroup;
  ngOnInit(): void {
    //validate url id is number or not
    this.routeSub = this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      if (isNaN(this.productId)) {
        this.router.navigate(['/admin', 'create-order-page']);
      }
    });

    this.productService.getProductById(this.productId).subscribe(
      {
        next: (response) => {
          this.updateProductStock.id=+response['id'];
          this.updateProductStock.stock=response['stock'];

        },
        error: (err) => {
          this.router.navigate(['/admin', 'create-order-page']);
        },
      }
    );
    this.productStockFormGroup=this.formBuilder.group({
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberRegEx),
      ])
    })


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


  get stock() {
    return this.productStockFormGroup.get('stock');
  }
  onUpdate(){
    if(this.productStockFormGroup.invalid){
      this.productStockFormGroup.markAllAsTouched();
      return;
    }

    this.updateProductStock.stock=this.productStockFormGroup.controls.stock.value;
    this.productApicallService.updateProductStock(this.updateProductStock).subscribe({
      next: (response) => {
        this.title = 'Update Success';
        this.body = 'Stock Amount: ' + this.updateProductStock.stock;
        this.onSuccess();
      }
    })

  }

}
