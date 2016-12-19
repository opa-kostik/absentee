import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  currentUser;

  users = [
      {userid:'1', nick:'MW'  , name:'Matthew Webb'},
      {userid:'2', nick:'TWB' , name:'Thomas William Burgess'},
      {userid:'3', nick:'HS'  , name:'Henry Sullivan'},
      {userid:'4', nick:'ET'  , name:'Enrique Tirabocchi'},
      {userid:'5', nick:'CT'  , name:'Charles Toth'},
      {userid:'6', nick:'GE'  , name:'Gertrude Ederle'},
      {userid:'7', nick:'AGC' , name:'Amelia Gade Corson'},
      {userid:'8', nick:'EHT' , name:'Edward H. Temme'},
      {userid:'9', nick:'FC'  , name:'Florence Chadwick'},
      {userid:'10', nick:'DPB', name:'Damian Piz  Beltran'},
      {userid:'11', nick:'MB' , name:'Marilyn Bell'},
      {userid:'12', nick:'BD' , name:'Brojen Das'},
      {userid:'13', nick:'AS' , name:'Arati Saha'},
      {userid:'14', nick:'MS' , name:'Mihir Sen'},
      {userid:'15', nick:'AA' , name:'Antonio Abertondo'},
      {userid:'16', nick:'JE' , name:'Jon Erikson'},
      {userid:'17', nick:'JM' , name:'John Maclean'},
      {userid:'18', nick:'PC' , name:'Philippe Croizon'},
      {userid:'19', nick:'TG' , name:'Trent Grimsey'},
      {userid:'20', nick:'PR' , name:'Philip Rush'},
      {userid:'21', nick:'KM' , name:'Kevin Murphy'},
      {userid:'22', nick:'AST', name:'Alison Streeter'},
      {userid:'23', nick:'CN' , name:'Cynthia Nicholas'}
    ];

    getUsers(){
      return this.users;
    }

    setUser(userid){
      this.currentUser = this.users.filter(item => item.userid == userid)[0];
    }

    getCurrentUser(){
      return this.currentUser;
    }

    getUser(userid){
      return this.users.filter(item => item.userid == userid)[0];
    }
}
