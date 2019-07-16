import { Component, OnInit } from '@angular/core';
import { ChangepasswordDto } from '../../model/DTOs/ChangepasswordDto';
import { UsermanagementService } from '../../services/usermanagement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/validators/PasswordMustMatchvalidator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepwdForm:FormGroup;
  btndisable:string="disable";
  changepassword:ChangepasswordDto={
    Email:null,
    PWD:null,
    NPWD:null
  }

  constructor(private userservice:UsermanagementService,private formBuilder:FormBuilder,private messageService: MessageService) { }

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

  ChangePassword()
  {

    this.changepassword.Email=localStorage.getItem("Email");
    this.changepassword.PWD=this.changepwdForm.value["PWD"];
    this.changepassword.NPWD=this.changepwdForm.value["NPWD"];
    this.userservice.ChangePassword(this.changepassword).subscribe(res=>{
      this.messageService.add({severity:'success', summary:'Success Message', detail:res["result"]});
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
}
