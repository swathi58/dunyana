import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangepasswordDto } from '../../model/DTOs/ChangepasswordDto';
import { UsermanagementService } from '../../services/usermanagement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { RegistrationDto } from '../../model/DTOs/RegistraionDto';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();



  changepwdForm:FormGroup;
  btndisable:string="disable";
  response:string="";
  responsesty:string="";
  // changepassword:ChangepasswordDto={
  //   Email:null,
  //   PWD:null,
  //   NPWD:null
  // }
  registerdto: RegistrationDto = {
    Id: 0,
    FirstName: null,
    LastName: null,
    Email: null,
    Mobile: null,
    Address: null,
    Country: null,
    City: null,
    Image: null,
    LoginType: null,
    FBID: null,
    GoogleID: null,
    PWD: null,
    Type: null,
    EmailVerified: 0,
    Status: 0,
   // EncId: null,
   // NPWD: null,
    OTP: 0
  }

  constructor(private userservice:UsermanagementService,private formBuilder:FormBuilder,private messageService: MessageService,
    private localStorage: LocalStorageService,public router:Router) { }

  ngOnInit() {
    this.changepwdForm=this.formBuilder.group({
 
      PWD:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$'),Validators.minLength(6)]],
      NPWD:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$'),Validators.minLength(6)]],
      confirmpassword:['',[Validators.required,Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')]]
 },
 {
  validator: MustMatch('NPWD', 'confirmpassword')
   });

  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.PWD.value;
  let confirmPass = group.controls.confirmPassword.value;
  return pass === confirmPass ? null : { notSame: true }      
}

SaveChangePassword()
  {

    this.registerdto.Email=this.localStorage.get("Email");
    let oldpwd=this.localStorage.get("PWD");
    if(oldpwd===this.changepwdForm.value["PWD"])
    {
      this.registerdto.PWD=this.changepwdForm.value["PWD"];
      this.userservice.ChangePassword(this.registerdto).subscribe(res=>{
        this.FormReset();
        this.response=res["result"];
        this.responsesty="succsmsg";
        this.HideResponse();
        //this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
        setTimeout(() => {
          this.onClose();
          this.router.navigateByUrl("signin");
      }, 1000); 
   
      },
      errormsg=>{
        this.response=errormsg["error"]["result"];
        this.responsesty="errormsg";
        this.HideResponse();
       // this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
      });
    }
    else
    {
      this.response="Invalid Old Password";
      this.responsesty="errormsg";
      this.HideResponse();
      //this.messageService.add({severity:'error', summary:'Error Message', detail:"Invalid Old Password"});
    }
    
   
    
  }

  formvalidate()
  {
    if(this.changepwdForm.valid)
    {
      this.btndisable="line_btn sblue mr-4";
    }
    else
    {
      this.btndisable="disable";
    }
  }
  onClose(){
    this.displayChange.emit(false);
  }
  redirectCustomer(){ 
    this.displayChange.emit(false);
  }
  FormReset()
  {
    this.changepwdForm.reset({
      'PWD':'',
      'NPWD':'',
      'confirmpassword':''
    })
  }
  HideResponse()
  {
  //   setTimeout(() => {          
  //     this.response="";
  // }, 3000); 
  }
}
