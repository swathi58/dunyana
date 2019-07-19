import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangepasswordDto } from '../../model/DTOs/ChangepasswordDto';
import { UsermanagementService } from '../../services/usermanagement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
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
  changepassword:ChangepasswordDto={
    Email:null,
    PWD:null,
    NPWD:null
  }

  constructor(private userservice:UsermanagementService,private formBuilder:FormBuilder,private messageService: MessageService,
    private localStorage: LocalStorageService,public router:Router) { }

  ngOnInit() {
    this.changepwdForm=this.formBuilder.group({

     
      PWD:['',[Validators.required,Validators.minLength(6)]],
      NPWD:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required]
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

    this.changepassword.Email=this.localStorage.get("Email");
    this.changepassword.PWD=this.changepwdForm.value["PWD"];
    this.changepassword.NPWD=this.changepwdForm.value["NPWD"];
    this.userservice.ChangePassword(this.changepassword).subscribe(res=>{
      this.FormReset();
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
      setTimeout(() => {
        this.onClose();
        this.router.navigateByUrl("signin");
    }, 1000); 
 
    },
    errormsg=>{
      this.messageService.add({severity:'error', summary:'Error Message', detail:errormsg["error"]["result"]});
    });
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
}
