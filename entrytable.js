import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import StylePage from './cssfile.js'
import add from '../images/oneplus.png';
import Popup from 'reactjs-popup';
import { Link, BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import {Radio } from 'antd';
import AddData from './addData';
import UserModal from './modal_view';
import { Modal, Button } from 'antd';
import {Modal as Mod} from 'antd';
import axios from 'axios';
import $ from 'jquery';
import cookie from 'react-cookies';
import loading from '../images/loading.gif';
import { Input,  Icon } from 'antd';
import { DatePicker,message } from 'antd';
import 'bootstrap-select';
import uploadbtn from '../images/uploadbtn.png';
import viewpagebtn from '../images/viewpagebtn.png';
import { Spin } from 'antd';

import Select from 'react-select';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const instance = axios.create();

/////Important////
// variables named row_index is col_index
//variables named col_index is row_index

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};
const columnTitle = {
  backgroundColor: 'white'
};
const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)",
    transition:'all 2s',
    zoom:'150%',
  }
};

const mainStyle = {
  app: {
    margin: "120px 0"
  },
  button: {
    backgroundColor: "#408cec",
    border: 0,
    padding: "12px 20px",
    color: "#fff",
    margin: "0 auto",
    width: 150,
    display: "block",
    borderRadius: 3
  },
  formStyle: {
    marginTop:'4px',
    marginRight:'40px'
  }
};
export default class entrytable extends Component {

  constructor(props){
    super(props);
    let set1=new Set();
    const data_token = cookie.load('info');
    if(data_token==undefined || data_token==null){
      window.location="/";
    }
    instance.defaults.headers.common['Authorization'] = `bearer ${data_token.token}` ;
    this.state={
      worksheet_id:this.props.match.params.groupname,
      organization_id:data_token.organizationId,
      static_popupvalue :"",
      token:data_token.token,
      addDataPP : false,
      redirect:true,
      errorMessage:<img src={loading} />,
      rows:{},
      rowarray:[],
      rowstatus:set1,
      modalTitle:"Add value for column",
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      popupvalues:{},
      tempImage:null,
      uploading:0,
      modaljsx:null,
      isModalOpen:false,
      uploadFileName:null,
      uploadFile:null,
      dragElements:new Set(),
      spin:false
    }

  this.addRows=this.addRows.bind(this);
  this.addDataPopup = this.addDataPopup.bind(this);
  this.deleteRow = this.deleteRow.bind(this);
  this.passval=this.passval.bind(this);
  this.inputpassval=this.inputpassval.bind(this);
  this.inputpassvalImage=this.inputpassvalImage.bind(this);
  this.submitForm=this.submitForm.bind(this);
  this.showModal=this.showModal.bind(this);
  this.handleOk=this.handleOk.bind(this);
  this.handleCancel=this.handleCancel.bind(this);
  this.getval=this.getval.bind(this);
  this.getpopdata=this.getpopdata.bind(this);
  this.popupchange=this.popupchange.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.openModal = this.openModal.bind(this);
  this.navigate=this.navigate.bind(this);
  this.dragRelease=this.dragRelease.bind(this);
  this.submitExcel = this.submitExcel.bind(this);
   }
   closeModal() {

     this.setState({

       isModalOpen: false
     });
   }

   // open modal (set isModalOpen, false)
   openModal() {
     this.setState({
       isModalOpen: true
     });
   }

componentDidMount()
{

  $('#react-select-5-input').keypress(function(event){
    console.log(event.id)
  })
  //console.log(this.state.worksheet_id);
  let url = `http://pragyaamfrontend.mysnippt.com/api/entrypage`
  var data ={
    'organization_id':this.state.organization_id,
    'worksheet_id':this.state.worksheet_id
  }
  fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization':`bearer ${this.state.token}`
        },
        body:JSON.stringify(data)
    }).then((response) => response.json())
    .then((res) => {
      //console.log(res);
      if(res.status)
      {
        var field_names=[];
        for(var i=0;i<20;i++){
          var x=JSON.parse(JSON.stringify(res.data));
          field_names.push(x);

        }
        this.setState({
          redirect:false,
          rows:res,
          rowarray:field_names
        })
      }
      else{
        let url = 'http://localhost:3000/home/addcolumns/'+this.state.worksheet_id;
        let text=<span>{'Please create some columns to enter data.'}</span>;
        this.setState({
          redirect:true,
          errorMessage:text
        })
      }
    })
    .catch((error) => {
      //console.log("login success",error);
    });

}
  keyFunctios(event)
  {

  }
//////////////////////////////

//Modal

showModal() {

  this.setState({
    visible: true,
  });
}

handleOk() {
  this.setState({
    ModalText: 'The modal will be closed after two seconds',
    confirmLoading: true,
  });

  if(this.state.popupworksheet==null){
    let data={}
    data.organization_id=this.state.organization_id;
    data.worksheet_id=this.state.worksheet_id;
    data.column_name=this.state.popupworksheet_static;
    data.value=this.state.static_popupvalue;
    let url="http://pragyaamfrontend.mysnippt.com/api/entry_store_static";
    //console.log(JSON.stringify(data));

      fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization':`bearer ${this.state.token}`
            },
            body:JSON.stringify(data)
        }).then((response) => response.json())
        .then((res) => {
          //console.log(res);
          let k= new Set();
          if(res.status)
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          else{
            this.setState({
              ModalText: "Server Issues..click Ok to send data again",
              confirmLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            ModalText: error,
            confirmLoading: true,
          });
        });


  }
  else{
    let data={}
    data.organization_id=this.state.organization_id;
    data.worksheet_id=this.state.popupworksheet;;
    data.column_aliases=this.state.popupcolumns;
    data.table_values=[this.state.popupvalues];
    let url="http://pragyaamfrontend.mysnippt.com/api/entry_store_page";
    console.log(JSON.stringify(data));

      fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization':`bearer ${this.state.token}`
            },
            body:JSON.stringify(data)
        }).then((response) => response.json())
        .then((res) => {
          console.log(res,"res popup");
          let k= new Set();
          if(res.status)
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          else{
            this.setState({
              ModalText: "Server Issues..click Ok to send data again",
              confirmLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            ModalText: error,
            confirmLoading: true,
          });
        });



  }
}

handleCancel(){

  this.setState({
    visible: false,
  });
}




componentDidUpdate(){
//$('select').selectpicker('refresh');
}


////////////////////////////
handleStaticpopupinput(e){
  //console.log(e.target.value,this.state.static_popupvalue);


  this.setState({static_popupvalue:e.target.value});
}
 addDataPopup(data)
 {
   //console.log(data.worksheet_id)

   let k=(data.worksheet_id);
   if(k==undefined || k=='Null'){
    let m=<Input type='text' name='add_column' placeholder={"Enter value for "+data.column} onChange={this.handleStaticpopupinput.bind(this)}/>
     this.setState({
       popupworksheet:null,
       popupworksheet_static:data.column_aliases,

       visible: true,
       ModalText:m

     });
   }
   else{
     let url = `http://pragyaamfrontend.mysnippt.com/api/entrypage`
     var data ={
       'organization_id':this.state.organization_id,
       'worksheet_id':k
     }
     fetch(url,{
           method: 'POST',
           headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               'Authorization':`bearer ${this.state.token}`
           },
           body:JSON.stringify(data)
       }).then((response) => response.json())
       .then((res) => {
        console.log(res);
        let m= this.getpopdata(res.data,k);
        this.setState({
          popupworksheet:k,
          popupcolumns:res.columns,
          visible: true,
          ModalText:m

        });
       })
       .catch((error) => {
         //console.log("login success",error);
       });

   }

 }

 getRed(event){
   let tag = event.currentTarget.dataset.index;

   event.currentTarget.style.background="red";
   event.currentTarget.style.color="white";
   event.currentTarget.innerHTML="X";
 }
 getRedOut(event){
   let tag = event.currentTarget.dataset.index;
   event.currentTarget.style.background="transparent";
   event.currentTarget.innerHTML=tag+"";
   event.currentTarget.style.color="#000";
 }
 //Deleteing an Row
 deleteRow(event)
 {
  let tag = event.currentTarget.dataset.index;
  //Set the Row array to an variable
  let values = this.state.rowarray;
  //Splice the array
console.log(values,parseInt(tag));
  Mod.confirm({
   title: 'Do you want to delete this row?',
   okText: 'Yes',
   cancelText: 'No',
   onOk :() => {
     values.splice(parseInt(tag-1),1);
     this.setState({rowarray:values},()=>console.log(this.state.rowarray));
     message.info("done!")
   },
   onCancel() {
     message.info('ok ...')
   },
 });
 }

 //On Blur of a Function
 validate(data,col_index,row_index)
 {
  let Validatevalue = data.value
  let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;
  //console.log(data.column)
  let packet={}
  packet.organization_id=this.state.organization_id
  packet.worksheet_id=this.state.worksheet_id
  packet.column_name=data.column_aliases
  if(data.type=="single" || data.type=="multi")
  packet.column_value=data.send_value
  else
  packet.column_value=data.value
  let ops = data.value
  console.log(JSON.stringify(packet));
  if(ops!=undefined && ops!= "")
  {
    fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization':`bearer ${this.state.token}`
        },
        body:JSON.stringify(packet)
    }).then((response) => response.json())
    .then((res) => {
      //console.log(res.status)
      console.log(JSON.stringify(res))
let k=this.state.rowarray;
      if(res.status){

        console.log(res.dValue)
        if(res.dValue!=undefined || res.dValue!=null){
          let k=this.state.rowarray;
          console.log(k[col_index])
          k[col_index].forEach(function(index,i){
              res.dValue.forEach(function(subindex,j){
                if(subindex.column_name==index.column_aliases){

                    k[col_index][i].value=subindex.data;
                    k[col_index][i].dont_load=true;
                    console.log(res.dValue[0].data)

                }
              })
          })
          this.setState({
            rowarray:k
          },()=>this.checkcol())
        }

        console.log(k[col_index][row_index])
        k[col_index][row_index].valid=true;
        document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.background="transparent";
        document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.color="black";
      }
      else{
        console.log(k[col_index][row_index])
        k[col_index][row_index]['tool_tip'] = res.error;
        k[col_index][row_index].valid=false;
        document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.color="white";
        document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.background="red";
      }

    })
    .catch((error) => {
      //console.log("data err",error);
      return false;
    });
  }


 }
 checkcol(){
   console.log("SD");
   if(this.state.rowarray[0]==undefined)
   return;
   let isReq=false;
   this.state.rowarray[0].forEach(function(index){

     if(index.required==true)
     {
       isReq=true;
       //break;
     }

 })
   //console.log(this.state.rowarray);
   this.state.rowarray.forEach(function(subindex,j){
     let flag=true;
     console.log(flag)
   if(isReq==false){
     console.log("true")
     subindex.forEach(function(index,i){
       console.log(index)
       if(index.value==null || index.value==undefined || index.value=='' )
       {
         console.log(index)
          flag=false;
       }
     })
   }
   else{
     subindex.forEach(function(index,i){

       if(index.type=='single' || index.type=='multi'){
         console.log(index)
         if(index.required &&(index.valid==false || (index.send_value==null || index.send_value==" " || index.send_value==[] || index.value==undefined))){

           flag=false;
       }
     }
      else if(index.required && (index.valid==false ||  (index.value==null || index.value==' ' || index.value==undefined))){
         flag=false;

       }
       else if(index.valid==false )
       {
         flag=false;
       }

     })
   }
   console.log(flag)
   if(flag){
     this.state.rowstatus.add(j);
     document.getElementById("rowstatus"+(j+1)).style.background="green";
   }else{
     if(this.state.rowstatus.has(j))this.state.rowstatus.delete(j);
     document.getElementById("rowstatus"+(j+1)).style.background="red";
   }
 },this);

 return this.state.rowstatus;
 }
 getvalSelect(event,col_index,row_index){

   let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;
   row_index=event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.row-2;
   col_index=event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.col-1;



   let data=this.state.rowarray[col_index][row_index];
   if(data.dont_load)return;
   let packet={}
   packet.organization_id=this.state.organization_id
   packet.worksheet_id=this.state.worksheet_id
   packet.column_name=data.column_aliases
   //packet.column_value=data.value

   console.log(JSON.stringify(packet));
   fetch(url,{
         method: 'POST',
         headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             'Authorization':`bearer ${this.state.token}`
         },
         body:JSON.stringify(packet)
     }).then((response) => response.json())
     .then((res) => {
       console.log(res)
       if(res.status){
         let temp=this.state.rowarray;
         temp[col_index][row_index].value=res.data;
         this.setState({
           rowarray:temp
         })
       }

     })
     .catch((error) => {
       //console.log("data err",error);
       return false;
     });
 }
 getval(event){
   let parentElement=(event.currentTarget.parentElement);
   let rowNo=(event.currentTarget.parentElement.dataset.col);


   let row_index=parseInt(parentElement.dataset.row)-2;
   let col_index=parseInt(parentElement.dataset.col)-1;
   let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;
   let data=this.state.rowarray[col_index][row_index];
   let packet={}
   packet.organization_id=this.state.organization_id
   packet.worksheet_id=this.state.worksheet_id
   packet.column_name=data.column_aliases
   if(data.type='single' || data.type=='multi')
   packet.column_value=data.send_value
   else
   packet.column_value=data.value

   console.log(JSON.stringify(packet));
   fetch(url,{
         method: 'POST',
         headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             'Authorization':`bearer ${this.state.token}`
         },
         body:JSON.stringify(packet)
     }).then((response) => response.json())
     .then((res) => {
       //console.log(res.status,'getval')
       if(res.status){
         let temp=this.state.rowarray;
         temp[col_index][row_index].value=res.data;
         this.setState({
           rowarray:temp
         })
       }

     })
     .catch((error) => {
       //console.log("data err",error);
       return false;
     });

 }
 inputpassvalImage(event){
   //console.log(event.currentTarget.files[0]);

   let image=event.currentTarget.files[0];
   let parentElement=(event.currentTarget.parentElement);
   let rowNo=(event.currentTarget.parentElement.dataset.col);
   //console.log(rowNo);
   this.setState({
     isModalOpen:true,
     modaljsx:"Uploading...."
   })

   let url=`http://pragyaamfrontend.mysnippt.com/api/image/save`;

   let headers= {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json',
       'Authorization':`bearer ${this.state.token}`
   }
   // let formData={
   //   'organization_id':this.state.organization_id,
   //   'import_image':formData,
   //   'url':null
   // }
   const formData = new FormData();
   formData.append('organization_id',this.state.organization_id);
   console.log(formData);
   formData.append('worksheet_id',this.state.worksheet_id);
   formData.append('url',null)
  formData.append('import_image', image, image.name)
  console.log(image,this.state.worksheet_id);
   axios.post(url, formData, {
    onUploadProgress: progressEvent => {
      //console.log((progressEvent.loaded / progressEvent.total)*100)
    }
  })
  .then(res => {
    let jsx=(
      <div>
      <img src={res.data.url} width="100%" height="100%"/>
      <button
          style={{
            ...mainStyle.button,
            margin: 0,
            width: "auto",
            marginTop: 10
          }}
          onClick={this.closeModal.bind(this)}
        >
          OK
        </button>
      </div>
    )



    let row_index=parseInt(parentElement.dataset.row)-2;
    let col_index=parseInt(parentElement.dataset.col)-1;

    if(this.state.rowarray[col_index][row_index]){

        let temp=this.state.rowarray;
        temp[col_index][row_index].value=res.data.url;



        this.setState({rowarray:temp},()=>{

          this.checkcol();
        });
      //console.log(temp);
    this.setState({
      isModalOpen:true,
      modaljsx:jsx
    })
  }
  })
  .catch(function (error) {
        //console.log(error);
      })

 }
 openFile(event){
   document.getElementById("uploadExcelInput").click();
 }
 uploadFile(event){
   console.log(event.currentTarget.files[0].name);
   this.setState({
     uploadFileName:event.currentTarget.files[0].name,
     uploadFile:event.currentTarget.files[0]
   },function(){
     this.uploadExcel();
   })

 }
 sampleCsv(event){


   message.success("wait for it");
   //console.log(this.state);
   function arrayToCSV(objArray) {
       let str = "data:text/csv;charset=utf-8,";
       const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;

       for (var i = 0; i < array.length; i++) {
           str += array[i];
           str += ",";
       }
       return str;
   }

   var d = Date.now();
   var name = "sample" +"_"+d+".csv";
   var downloadLink = document.createElement("a");
   var downloadLink = document.createElement("a");
   downloadLink.href = (encodeURI(arrayToCSV(this.state.rows.columns)));
   downloadLink.download = name;
   //window.location=(encodeURI(arrayToCSV(this.state.rows)));
   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);
 }
 submitExcel(){
   if(this.state.uploadFile == null)
   {
     message.error('Please select a file.');
     return ;
   }
   this.setState({ spin:true }, ()=>console.log(this.state.spin));
   console.log(this.state.spin);
   message.info("Please Wait till success message");

   let url=`http://pragyaamfrontend.mysnippt.com/api/entry_store_excel`;
   const formData = new FormData();
   formData.append('organization_id',this.state.organization_id);

   formData.append('worksheet_id',this.state.worksheet_id);
   formData.append('url',null);

  formData.append('import_file',this.state.uploadFile, this.state.uploadFile.name);
  console.log(this.state.uploadFile.name);
   axios.post(url, formData, {
    onUploadProgress: progressEvent => {
      console.log((progressEvent.loaded / progressEvent.total)*100)
    }
  })
  .then(res => {
    console.log(this.state.spin)
    this.setState({spin:false});
    if(res.data['status']!=true)
    {
      message.error(res.data['error']);
      return;
    }
    else {
      message.success("Uploaded data Sucessfully");
      this.closeModal();
    }
  }
  )
  .catch(function (error) {
      message.success("Please upload after some time.");
        console.log(error);
      })


 }

uploadExcel(event){
  console.log(this.state.uploadFileName)
   let jsx=(
        <div className="add_user2">
         <div className="row">
            <div className="col-md-12 text-center" >
              <span style={{color:'#1AAC6F',fontSize:'30px',fontWeight:'700',fontFamily:'segoe',paddingLeft:'15px'}}>Upload Excel</span>
                             <span style={{float:'right',fontSize:'30px' ,marginRight:'20px',cursor:'pointer'}}  onClick={this.closeModal}>X</span>
            </div>
        </div>
        <div className="row">
        <Spin spinning={this.state.spin} tip="Uploading..." size="large" style={{color: 'white'}}>
        </Spin>
        </div>
         <div className="row">
            <div className="col-md-12 text-center">
              <br />
              <input className="no-display" id="uploadExcelInput" type="file" name="uploadExcel" onChange={this.uploadFile.bind(this)}/>
              <div className="uploadFile-box" style={{cursor:'pointer',fontSize:'18px'}} onClick={(e)=>{this.openFile(e)}}>Choose File</div>
              <br/>
              <div classname="" style={{color:'lightgrey',fontSize:'22px'}}>{this.state.uploadFileName}</div>
              <br/>
            </div>
          </div>

         <div className="row">
            <div className="col-md-12 text-center">
                <button className="add_user_button" style={{width:'30%'}} onClick={this.submitExcel}>Submit </button>
                &nbsp;&nbsp;
                <button className="add_user_button" style={{width:'30%'}} onClick={this.sampleCsv.bind(this)}>Sample CSV</button>

            </div>
          </div>
        </div>

   );
   this.setState({
     isModalOpen:true,
     modaljsx:jsx
   })

 }
 inputpassval(event){
   console.log('asdsda');
   let parentElement=(event.currentTarget.parentElement);
   let rowNo=(event.currentTarget.parentElement.dataset.col);


   let row_index=parseInt(parentElement.dataset.row)-2;
   let col_index=parseInt(parentElement.dataset.col)-1;
   console.log(this.state.rowarray[col_index][row_index])
   if(this.state.rowarray[col_index][row_index]){
     if(event.currentTarget.value!="" && this.state.rowarray[col_index][row_index].type!='single'){
       let temp=this.state.rowarray;
       temp[col_index][row_index].value=event.currentTarget.value;

       this.setState({rowarray:temp});


     }

   else if(this.state.rowarray[col_index][row_index].type=='single' || this.state.rowarray[col_index][row_index].type=='multiple'){

   }
   else{
     let temp=this.state.rowarray;
     temp[col_index][row_index].value=null;

     this.setState({rowarray:temp});
   }



   this.checkcol();


 }

 }
 passval(event){
   console.log('asdsda');
   let parentElement=(event.currentTarget.parentElement);
   let rowNo=(event.currentTarget.parentElement.dataset.col);


   let row_index=parseInt(parentElement.dataset.row)-2;
   let col_index=parseInt(parentElement.dataset.col)-1;

   if(this.state.rowarray[col_index][row_index]){
     if(event.currentTarget.value!="" && this.state.rowarray[col_index][row_index].type!='single' && this.state.rowarray[col_index][row_index].type!='multiple'){
       let temp=this.state.rowarray;
       temp[col_index][row_index].value=event.currentTarget.value;

       this.setState({rowarray:temp});

this.validate(temp[col_index][row_index],col_index,row_index);

     }

   else if(this.state.rowarray[col_index][row_index].type=='single' || this.state.rowarray[col_index][row_index].type=='multiple'){
      let temp=this.state.rowarray;
      let value=event.currentTarget.value;
     //
     // this.setState({rowarray:temp});
     //this.validate(temp[col_index][row_index],col_index,row_index);


     let Validatevalue = value
     let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;
     //console.log(data.column)
     let packet={}
     packet.organization_id=this.state.organization_id
     packet.worksheet_id=this.state.worksheet_id
     packet.column_name=temp[col_index][row_index].column_aliases
     packet.column_value=value
     let ops =value
     //console.log(JSON.stringify(packet));
     if(ops!=undefined && ops!= "")
     {
       fetch(url,{
           method: 'POST',
           headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               'Authorization':`bearer ${this.state.token}`
           },
           body:JSON.stringify(packet)
       }).then((response) => response.json())
       .then((res) => {
         //console.log(res.status)
         if(res.status){
           console.log(res);
           if(res.dValue!=undefined || res.dValue!=null){
             let k1=this.state.rowarray;
             let k=k1[col_index];
             console.log(k);
             res.dValue.forEach(function(col,j){
               col.data=[5,5,5,5,5];
             k.forEach(function(index,i){
               if(col.column_name==index.column_aliases){
                 index.value=col.data;
               }
             })
           })
           this.setState({rowarray:k1});
           }
           document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.background="transparent";
           document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.color="black";
         }
         else{

           document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.color="white";
           document.getElementById("nodeindex-"+(col_index+1)+(row_index+2)).style.background="red";
         }
       })
       .catch((error) => {
         //console.log("data err",error);
         return false;
       });
     }



   }
   else{
     let temp=this.state.rowarray;
     temp[col_index][row_index].value=null;

     this.setState({rowarray:temp});
   }

this.checkcol();


 }

 }
 navigateSelect(event){
   let parentElement=event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

   if(event.keyCode == 13 || event.keyCode==40){
     event.preventDefault();
           //check later
           // while(parentElement.nodeName!='TD'){
           //      parentElement=(event.currentTarget.parentElement);
           // }
           let row_index=parseInt(parentElement.dataset.row);
           let col_index=parseInt(parentElement.dataset.col)+1;
           if(document.getElementById("nodeindex-"+col_index+row_index)){
           let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();


         }

    }
    if(event.keyCode == 39){
      event.preventDefault();
      let row_index=parseInt(parentElement.dataset.row)+1;
      let col_index=parseInt(parentElement.dataset.col);

      if(document.getElementById("nodeindex-"+col_index+row_index)){
      let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();


    }
    }
    if(event.keyCode == 37){
      event.preventDefault();
      let row_index=parseInt(parentElement.dataset.row)-1;
      let col_index=parseInt(parentElement.dataset.col);

      if(document.getElementById("nodeindex-"+col_index+row_index)){
      let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();

    }
    }
    if(event.keyCode == 38){
      event.preventDefault();
      let row_index=parseInt(parentElement.dataset.row);
      let col_index=parseInt(parentElement.dataset.col)-1;

      if(document.getElementById("nodeindex-"+col_index+row_index)){
      let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();


    }
    }

 }
 dragRelease(event){
   console.log(event.keyCode);
   let k=this.state.rowarray;
   let elements=Array.from(this.state.dragElements);
   var m=document.getElementById(elements[0]);
   var copyFrom=null;
   if(m!=undefined){
     var row_index=parseInt(m.dataset.row)-2;
     var col_index=parseInt(m.dataset.col)-1;
      copyFrom= k[col_index][row_index];
   }
   else return;
   if(copyFrom.type=='single' || copyFrom.type=='multi' || copyFrom.type=='image'  )
   return;
   console.log(elements,copyFrom)
   if(event.keyCode==16 && elements[0]!=undefined){
     console.log(this.state.dragElements,"releaseTime")
     elements.forEach(function(index){
       let element=document.getElementById(index)
       document.getElementById(index).style.background='transparent';
       let row_index=parseInt(element.dataset.row)-2;
       let col_index=parseInt(element.dataset.col)-1;
       let cElement=k[col_index][row_index];
       cElement.value=copyFrom.value;

     })
     this.setState({rowarray:k,dragElements:new Set()},()=>this.checkcol())
   }
 }
navigate(event){

let dragElements=this.state.dragElements;
  //if(event.currentTarget.nodeName=='SELECT' && event.shiftKey==false)return;
  console.log(event.keyCode)
  let parentElement=(event.currentTarget.parentElement);
  let parentElement2=event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
if(event.shiftKey && (event.keyCode==40 || event.keyCode==38)){
  let row_index=parseInt(parentElement.dataset.row);
  let col_index=parseInt(parentElement.dataset.col);
  if(document.getElementById("nodeindex-"+col_index+row_index)){

    if(document.getElementById("nodeindex-"+col_index+row_index)){
      let element="nodeindex-"+col_index+row_index;
      let val=null;
      if(event.keyCode==40){
         val="nodeindex-"+(col_index+1)+row_index;
      }
      else{
         val="nodeindex-"+(col_index-1)+row_index;
      }

      if(dragElements.has(val))
      {
        if(event.keyCode==40)
        {
          let element1="nodeindex-"+(col_index+1)+row_index;

          document.getElementById("nodeindex-"+col_index+row_index).style.background='transparent';
          dragElements.delete(element)

        }
        else if(event.keyCode==38)
        {
          let element1="nodeindex-"+(col_index-1)+row_index;

          document.getElementById("nodeindex-"+col_index+row_index).style.background='transparent';
          dragElements.delete(element)

        }
      }
      else
      {
        if(event.keyCode==40)
        {
          let element1="nodeindex-"+(col_index+1)+row_index;
          if(document.getElementById(element1))
          document.getElementById(element1).style.background='#6da36c';
          document.getElementById("nodeindex-"+col_index+row_index).style.background='#6da36c';
          dragElements.add(element)
          if(document.getElementById(element1))
          dragElements.add(element1)
        }
        else if(event.keyCode==38)
        {
          let element1="nodeindex-"+(col_index-1)+row_index;
          if(document.getElementById(element1))
          document.getElementById(element1).style.background='#6da36c';
          document.getElementById("nodeindex-"+col_index+row_index).style.background='#6da36c';
          dragElements.add(element)
          if(document.getElementById(element1))
          dragElements.add(element1)
        }

      }
    }


  }
}

  if(event.keyCode == 13 || event.keyCode==40){
    event.preventDefault();
          //check later
          // while(parentElement.nodeName!='TD'){
          //      parentElement=(event.currentTarget.parentElement);
          // }

          let row_index=parseInt(parentElement.dataset.row);
          let col_index=parseInt(parentElement.dataset.col)+1;
          let row_index1=parseInt(parentElement2.dataset.row);
          let col_index1=parseInt(parentElement2.dataset.col)+1;
          if(this.refs[("nodeindex-"+col_index+row_index)]===undefined && this.refs[("nodeindex-"+col_index1+row_index1)]===undefined && (document.getElementById("nodeindex-"+col_index+row_index)!=null || document.getElementById("nodeindex-"+col_index1+row_index1)!=null)){
            if(document.getElementById("nodeindex-"+col_index+row_index)!=null)
             {
               // if(event.shiftKey){
               //   let element="nodeindex-"+col_index+row_index;
               //   document.getElementById("nodeindex-"+col_index+row_index).style.background='#6da36c';
               //   if(dragElements.has(element))
               //   dragElements.delete(element)
               //   else
               //   dragElements.add(element)
               // }

               let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();
             }
             else {
               let ans=document.getElementById("nodeindex-"+col_index1+row_index1).focus();
             }

        }
        else {
          if(this.refs[("nodeindex-"+col_index+row_index)]!==undefined)
          {
            let ans1=this.refs[("nodeindex-"+col_index+row_index)].focus();
          }
          else if(this.refs[("nodeindex-"+col_index1+row_index1)]!==undefined)
          {
            let ans1=this.refs[("nodeindex-"+col_index1+row_index1)].focus();
          }
        }

   }
   if(event.keyCode == 39){
     event.preventDefault();
     let row_index=parseInt(parentElement.dataset.row)+1;
     let col_index=parseInt(parentElement.dataset.col);
     let row_index1=parseInt(parentElement2.dataset.row)+1;
     let col_index1=parseInt(parentElement2.dataset.col);
     console.log(document.getElementById("nodeindex-"+col_index+row_index))
     if(this.refs[("nodeindex-"+col_index+row_index)]===undefined && this.refs[("nodeindex-"+col_index1+row_index1)]===undefined && (document.getElementById("nodeindex-"+col_index+row_index)!=null || document.getElementById("nodeindex-"+col_index1+row_index1)!=null)){
       if(document.getElementById("nodeindex-"+col_index+row_index)!=null)
        {
          let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();
        }
        else {
          let ans=document.getElementById("nodeindex-"+col_index1+row_index1).focus();
        }
   }
   else {
     if(this.refs[("nodeindex-"+col_index+row_index)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index+row_index)].focus();
     }
     else if(this.refs[("nodeindex-"+col_index1+row_index1)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index1+row_index1)].focus();
     }
   }
   }
   if(event.keyCode == 37){
     event.preventDefault();
     let row_index=parseInt(parentElement.dataset.row)-1;
     let col_index=parseInt(parentElement.dataset.col);
     let row_index1=parseInt(parentElement2.dataset.row)-1;
     let col_index1=parseInt(parentElement2.dataset.col);
  //   console.log("dcfvghbj")
     console.log(row_index,col_index,row_index1,col_index1,document.getElementById("nodeindex-"+col_index+row_index),this.refs[("nodeindex-"+col_index+row_index)],this.refs[("nodeindex-"+col_index1+row_index1)]);
     if(this.refs[("nodeindex-"+col_index+row_index)]===undefined && this.refs[("nodeindex-"+col_index1+row_index1)]===undefined && (document.getElementById("nodeindex-"+col_index+row_index)!=null || document.getElementById("nodeindex-"+col_index1+row_index1)!=null)){
       if(document.getElementById("nodeindex-"+col_index+row_index)!=null)
        {
          let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();
        }
        else {
          let ans=document.getElementById("nodeindex-"+col_index1+row_index1).focus();
        }
   }
   else {
     if(this.refs[("nodeindex-"+col_index+row_index)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index+row_index)].focus();
     }
     else if(this.refs[("nodeindex-"+col_index1+row_index1)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index1+row_index1)].focus();
     }
   }
 }
   if(event.keyCode == 38){
     event.preventDefault();
     let row_index=parseInt(parentElement.dataset.row);
     let col_index=parseInt(parentElement.dataset.col)-1;
     let row_index1=parseInt(parentElement2.dataset.row);
     let col_index1=parseInt(parentElement2.dataset.col)-1;
     if(this.refs[("nodeindex-"+col_index+row_index)]===undefined && this.refs[("nodeindex-"+col_index1+row_index1)]===undefined && (document.getElementById("nodeindex-"+col_index+row_index)!=null || document.getElementById("nodeindex-"+col_index1+row_index1)!=null)){
       if(document.getElementById("nodeindex-"+col_index+row_index)!=null)
        {
          // if(event.shiftKey){
          //   let element="nodeindex-"+col_index+row_index;
          //   document.getElementById("nodeindex-"+col_index+row_index).style.background='#6da36c';
          //   if(dragElements.has(element))
          //   dragElements.delete(element)
          //   else
          //   dragElements.add(element)
          // }

          let ans=document.getElementById("nodeindex-"+col_index+row_index).focus();
        }
        else {
          let ans=document.getElementById("nodeindex-"+col_index1+row_index1).focus();
        }
   }
   else {
     if(this.refs[("nodeindex-"+col_index+row_index)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index+row_index)].focus();
     }
     else if(this.refs[("nodeindex-"+col_index1+row_index1)]!==undefined)
     {
       let ans1=this.refs[("nodeindex-"+col_index1+row_index1)].focus();
     }
   }
   }
this.setState({dragElements:dragElements},()=>console.log(dragElements))

}
handleChangeSelect = (i,j,selectedOption) =>{
  console.log(selectedOption,i,j,this.state.rowarray[j][i])
  let k=this.state.rowarray;
  k[j][i]['select_value']=selectedOption;
  k[j][i].send_value=new Array();
  selectedOption.forEach(function(index,l){
  //  message.info(j+" "+i);

//   message.info(typeof(k[j][i]['send_value']))
//   console.log(k[j][i])
    k[j][i]['send_value'].push(index.value);
  });
  this.setState({
    rowarray:k
  })
this.validate(k[j][i],j,i);
  this.checkcol();
}
handleChangeSelectSingle = (i,j,selectedOption) =>{
  console.log(selectedOption,i,j,this.state.rowarray[j][i])
  let k=this.state.rowarray;
  k[j][i]['select_value']=selectedOption;
  k[j][i]['send_value']=selectedOption.value;
  this.setState({
    rowarray:k
  })
this.validate(k[j][i],j,i);
  this.checkcol();


}

 rows(){
   const onKeyDown = e => {
     console.log(e.keyCode)
       this.navigate(e);
     };
   const trtaglist=[];
//console.log(this.state);
      for (var j=0;j<this.state.rowarray.length;j++){
      const tdlist1=[];
      var data_row=this.state.rowarray[j];

    for(var i=0;i<data_row.length+2;i++)
    {
    if(i==0)
    {
      var x=<td className="td-width td-width2"   data-index={j+1} onMouseOver={(e) =>{this.getRed(e)}} onMouseOut={(e) =>{this.getRedOut(e)}} onClick={(e)=>this.deleteRow(e)}>{j+1}</td>
    }
    else if(i!=data_row.length+1)
    {

      if(data_row[i-1]['type']=='text')
          {
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}    title={data_row[i-1]['tool_tip']} ><input type='text' id={"nodeindex-"+(j+1) +"" + (i+1)} className=" datacol" onChange={this.inputpassval}  onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1}  onChange={this.passval} value={data_row[i-1]['value'] || ""}></input></td>
          }
          else if(data_row[i-1]['type']=='image')
              {
                var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><input type='file' accept="image/png, image/jpeg" id={"nodeindex-"+(j+1) +"" + (i+1)} className=" datacol" onChange={this.inputpassvalImage}  onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1}  ></input></td>
              }
          else if(data_row[i-1]['type']=='email')
              {
                var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><input type='email' id={"nodeindex-"+(j+1) +"" + (i+1)} className=" datacol" onChange={this.inputpassval}  onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1} onChange={this.passval} value={data_row[i-1]['value'] || ""}></input></td>
              }
      else if(data_row[i-1]['type']=='number')
          {
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><input type='number' id={"nodeindex-"+(j+1) +"" + (i+1)} className=" datacol" onChange={this.inputpassval}  onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1} onChange={this.passval} value={data_row[i-1]['value'] || ""}></input></td>
          }
      else if(data_row[i-1]['type']=='single' )
          {
            let options = [];
            var ops=data_row[i-1]['value'];
          //  console.log(ops,"ops")
            if(ops!=undefined && Array.isArray(ops) && ops !=null)
            {
                ops.forEach(function(index,i){
                  let k=new Object();
                  k.value=index;
                  k.label=index;
                  options.push(k)
                })
            }
            else{
              var option=null;

            }
              // ..for debugging
            if(data_row[i-1]['static']!=true || data_row[i-1]['static']!=false )
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><Select id={"nodeindex-"+(j+1) +"" + (i+1)} ref={"nodeindex-"+(j+1) +"" + (i+1)} value={(data_row[i-1]['select_value']!=undefined)?data_row[i-1]['select_value']:null} onFocus={(e)=>this.getvalSelect(e,i+1,j+1)} onChange={this.handleChangeSelectSingle.bind(this,i-1,j)} options={options} onKeyDown={onKeyDown} /></td>

            // var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><select id={"nodeindex-"+(j+1) +"" + (i+1)} className="datacol mdb-select" onBlur={this.passval} onFocus={this.getval} onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1}><option value="" >Please select</option>{option}</select></td>
            else
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><select id={"nodeindex-"+(j+1) +"" + (i+1)} ref={"nodeindex-"+(j+1) +"" + (i+1)} className="datacol mdb-select1"  onFocus={this.getval} onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1} onBlur={this.passval}><option value="" >Please select</option>{option}</select></td>
          }
      else if(data_row[i-1]['type']=='multi')
          {
            let options=[];
            var ops=data_row[i-1]['value'];
            if(ops!=undefined && Array.isArray(ops) && ops !=null)
            {
                ops.forEach(function(index,i){
                  let k=new Object();
                  k.value=index;
                  k.label=index;
                  options.push(k)
                })
            }
            else{
              var option=null;
            }
            if(data_row[i-1]['static']==true || data_row[i-1]['static']==false )
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><Select id={"nodeindex-"+(j+1) +"" + (i+1)} value={(data_row[i-1]['select_value']!=undefined)?data_row[i-1]['select_value']:null
          } ref={"nodeindex-"+(j+1) +"" + (i+1)} onFocus={(e)=>this.getvalSelect(e,i+1,j+1)} onChange={this.handleChangeSelect.bind(this,i-1,j)} options={options} onKeyDown={onKeyDown} isMulti/></td>
            else
            var x=<td className="td-width"  data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']} ><select id={"nodeindex-"+(j+1) +"" + (i+1)} className="datacol mdb-select1" onBlur={this.passval} onFocus={this.getval} onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1} ><option value="" >Please select</option>{option}</select></td>
          }
      else
          {
            var x=<td className="td-width " data-toggle="tooltip" data-placement="bottom" data-row={i+1} data-col={j+1}   title={data_row[i-1]['tool_tip']}  ><input type='date' id={"nodeindex-"+(j+1) +"" + (i+1)} className="datacol" onChange={this.inputpassval} onBlur={this.passval} onKeyDown={this.navigate} onKeyUp={this.dragRelease}  data-row={i+1} data-col={j+1} value={data_row[i-1]['value'] || new Date()}></input></td>
          }
    }
    else
    {
    var x=<td id="sticky-rows"><div className="celltext1" id={"rowstatus"+(j+1)}></div></td>
    }

    tdlist1.push(
      x
      )
    }
    trtaglist.push(
    <tr data-id={j}>
    {tdlist1}
    </tr>
    )
    }


    return (
      <tbody>
      {trtaglist}
      </tbody>
    );


  }
  addRows(){
    var x=JSON.parse(JSON.stringify(this.state.rows.data));
    var y=this.state.rowarray;
    y.push(x);
    this.setState({
      rowarray:y
    });

  }





  submitForm(){

 Mod.confirm({
   title: 'Are you sure you want to submit the data?',
   okText: 'Yes',
   cancelText: 'No',
   onOk :() => {
    let status=new Set();
    status=this.checkcol();
    console.log(this.state.rowarray,"first");
  //  return;
    let rowarray=this.state.rowarray;
    let rowstatus=this.state.rowstatus;
    let sendlist=[]
    let renderlist=[]
    rowarray.forEach(function(index,i){
      if(status.has(i)){
        let k={};
        index.forEach(function(subindex,j){

          if(subindex.type=="single" || subindex.type=='single' || subindex.type=='multi'){

            if(subindex.send_value!=undefined)
            {

              k[subindex.column_aliases]=subindex.send_value;
            }
            else {
              k[subindex.column_aliases]=null;
            }
          }
          else
            k[subindex.column_aliases]=subindex.value;

        })
        sendlist.push(k);
      }
      else{
        renderlist.push(index);
      }

    })
    console.log(sendlist,renderlist);
    //return;
    let data={}
    data.organization_id=this.state.organization_id;
    data.worksheet_id=this.state.worksheet_id;
    data.column_aliases=this.state.rows.columns;
    data.table_values=sendlist;
    let url="http://pragyaamfrontend.mysnippt.com/api/entry_store_page";
    console.log(JSON.stringify(data));
    if(sendlist.length >= 0){
      fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization':`bearer ${this.state.token}`
            },
            body:JSON.stringify(data)
        }).then((response) => response.json())
        .then((res) => {

          if(res.status){
            let k= new Set();
            this.setState({
              rowarray:renderlist,
              rowstatus:k
            })
            message.success("Data Submitted Sucessfully !");
          }
          else{
              message.error(res.error);
          }
        })
        .catch((error) => {
          console.log(error);
            message.error("Server Error");
        });

    }
    this.setState({
      rowarray:renderlist
    },()=>this.checkcol())

  },
   onCancel() {
     message.info('Data has not been submitted')
   },
});

}




  popupchange(event){
    ////console.log(event.currentTarget.name);
    let k=event.currentTarget.name;
    let m=this.state.popupvalues;
    m[k]=event.currentTarget.value;
    this.setState({
      popupvalues:m
    })
    //console.log(this.state.popupvalues);
  }
  popchange1(value){
    //console.log(value);
  }
  getpopdata(data,worksheet_id){
console.log(data);
const tdlist1=[];
data.forEach(function(data_row,i){
if(data_row['type']=='text')
    {
      var x=<tr><td>{data_row['column']}</td><td><Input type='text' onChange={this.popupchange} name={data_row['column_aliases']}  placeholder={data_row['column']}  /></td></tr>
    }
else if(data_row['type']=='number')
    {
      var x=<tr><td>{data_row['column']}</td><td><Input type='number' onChange={this.popupchange} name={data_row['column_aliases']}  placeholder={data_row['column']}  /></td></tr>
    }
else if(data_row['type']=="single" )
    {

      var ops=data_row['value'];
      console.log(ops,data_row)
      if(ops==undefined)
      {
        let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;

        let packet={}
        packet.organization_id=this.state.organization_id
        packet.worksheet_id=worksheet_id
        packet.column_name=data_row['column_aliases']


        console.log(JSON.stringify(packet));
        fetch(url,{
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization':`bearer ${this.state.token}`
              },
              body:JSON.stringify(packet)
          }).then((response) => response.json())
          .then((res) => {
            console.log(res,'getval')
            if(res.status){
              data_row.value=res.data;
              let m= this.getpopdata(data,worksheet_id);
              this.setState({
                ModalText:m

              });
            }

          })
          .catch((error) => {

          });
      }
      else{
          if(data_row.value instanceof Array){
            let k=data_row.value;
            var option=k.map((number)=><option value={number}>{number}</option>);
          }

      }
      if(data_row['static']==true )
      var x=<tr><td>{data_row['column']}</td><td><select  defaultValue={data_row['column']} style={{ width: '100%' }} className="datacol mdb-select" onChange={this.popupchange} name={data_row['column_aliases']} ><option value="" >Please select</option>{option}</select></td></tr>
      else
      var x=<tr><td>{data_row['column']}</td><td><select defaultValue={data_row['column']} style={{ width: '100%' }}  className="datacol mdb-select1" onChange={this.popupchange} name={data_row['column_aliases']} ><option value="" >Please select</option>{option}</select></td></tr>
    }
else if(data_row['type']=='multi')
    {
      var ops=data_row['value'];
      if(ops!=undefined && ops!= "")
      {
        let url = `http://pragyaamfrontend.mysnippt.com/api/validate`;

        let packet={}
        packet.organization_id=this.state.organization_id
        packet.worksheet_id=this.state.worksheet_id
        packet.column_name=data_row['column_aliases']
        packet.column_value="data.value"

        //console.log(JSON.stringify(packet));
        fetch(url,{
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization':`bearer ${this.state.token}`
              },
              body:JSON.stringify(packet)
          }).then((response) => response.json())
          .then((res) => {
            //console.log(res.status,'getval')
            if(res.status){
              data_row.value=res.data;
              let m= this.getpopdata(data,worksheet_id);
              this.setState({
                ModalText:m

              });
            }

          })
          .catch((error) => {

          });
      }
      else{
        if(data_row.value instanceof Array){
          let k=data_row.value;
          var option=k.map((number)=><option value={number}>{number}</option>);
        }
      }
      if(data_row['static']==true )
      var x=<tr><td>{data_row['column']}</td><td><select defaultValue={data_row['column']} style={{ width: '100%' }} className="datacol mdb-select" onChange={this.popupchange} name={data_row['column_aliases']} ><option value="" >Please select</option>{option}</select></td></tr>
      else
      var x=<tr><td>{data_row['column']}</td><td><select defaultValue={data_row['column']} style={{ width: '100%' }} className="datacol mdb-select1" onChange={this.popupchange} name={data_row['column_aliases']}  ><option value="" >Please select</option>{option}</select></td></tr>
    }
else
    {
      var x=<tr><td>{data_row['column']}</td><td><input type='date'  className="datacol" onChange={this.popupchange} name={data_row['column_aliases']}  ></input></td></tr>
    }


tdlist1.push(
  x
  )
  tdlist1.push(
    <br/>

    )
    tdlist1.push(
      <br/>

      )
}.bind(this));
return (
  <table border="0" id="popuptable">
  {tdlist1}
  </table>
);
  }
  render(){

   if(this.state.redirect){
      return(
        <div id="tablerow">
        <StylePage/>
        <div className="ErrorMessage">
        {this.state.errorMessage}
        </div>
        </div>
      )
   }
   const { visible, confirmLoading, ModalText } = this.state;

  const numbers = this.state.rows.data;

  console.log(numbers);
  const listItems = numbers.map((number) =>
   (number['static'] == true)?
   <th  id="col-head" className="row-head datacol"> {(number.required==1)?<span className="requiredStyle"> * </span>:''}{number['column']}<div id='col-head-sizer'></div></th>:
   <th  id="col-head" className="row-head datacol"  data-workid={number['worksheet_id']} onClick={() => this.addDataPopup(number)}><button className="buttonRow">+</button>{(number.required==1)?<span className="requiredStyle"> * </span>:''}&nbsp;{number['column']} <div id='col-head-sizer'></div></th>
  );
    return(


        <div id="tablerow">
        <StylePage/>

        <div>
        <Mod
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Ok"
          cancelText="cancel"
        >
        </Mod>
        <Modal title={this.state.modalTitle || "Add Dropdown Value"}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {ModalText}
        </Modal>
        <UserModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}
        >
        {this.state.spin == true ?
          <div>
            <Spin size="large" />
        </div>:null
           }
        <table border="0" id="popuptable" className="text-center">
          {
            this.state.modaljsx
          }
          </table>
        </UserModal>
      </div>
           <div id="viewpagehead">
              <Link  className="btn" style={{float:'right',padding:'10px',position:'relative',right:'11.5%',top:'12px',outline:'none !important'}} to={"/test/"+this.props.match.params.org+"/"+this.props.match.params.worksheetname+"/"+this.props.match.params.tablename+"/"+this.props.match.params.groupname+"/view"}>
                <img title="Go to View Page" src={viewpagebtn} />
              </Link>
              <img src={add}  alt="add" title="Add Row" style={{float:'right',padding:'10px',position:'relative',right:'5%',top:'9px'}}  onClick={this.addRows}/>
              <img id="viewpageright" title="Upload Excel"  onClick={(e)=>{this.uploadExcel(e)}} src={uploadbtn} />
              <button id="endbutton2" onClick={this.submitForm}>Submit</button>

            </div>
           <div id="col-main">
           <div>
                   <table id="tab" className="table table-fixed">
                   <thead >
                       <tr>
                       <th  id="col-head2" className="row-head">S.No<div id='col-head2-sizer'></div></th>
                       {listItems}
                       <th  id="col-head1" >Status<div id='col-head1-sizer'></div></th>
                       </tr>
                       </thead>

                       {this.rows()}

                    </table>
                    <div align="center">

                        </div>
           </div>
           </div>
           <div align="center">
           <br/>
           </div>

      </div>



    )
  }
}
// "status": true,
// "data": [
//     {
//         "column": "name",
//         "column_aliases": "name",
//         "type": "text",
//         "tool_tip": "Please Enter the Price",
//         "required": 1,
//         "static": true,
//         "value": null
//     },
//     {
//         "column": "Price",
//         "column_aliases": "price",
//         "type": "single",
//         "tool_tip": "Please Enter the Price",
//         "required": 1,
//         "static": true,
//         "value": [
//             ""
//         ]
//     },
//     {
//         "column": "DOB",
//         "column_aliases": "date_of_birth",
//         "type": "text",
//         "tool_tip": "Please Enter the Price",
//         "required": 1,
//         "static": true,
//         "value": null
//     },
//     {
//         "column": "Sl.No",
//         "column_aliases": "sl_no",
//         "type": "number",
//         "tool_tip": "Please Enter the Number",
//         "required": 1,
//         "static": false,
//         "value": null
//     },
//     {
//         "column": "Quality No",
//         "column_aliases": "quality_no",
//         "type": "number",
//         "tool_tip": "Please Enter the Number",
//         "required": 1,
//         "static": false,
//         "value": null
//     },
//     {
//         "column": "Address",
//         "column_aliases": "address",
//         "type": "text",
//         "tool_tip": "Please Enter the Address",
//         "required": 1,
//         "static": false,
//         "value": null
//     },
//     {
//         "column": "Pincode",
//         "column_aliases": "pincode",
//         "type": "text",
//         "tool_tip": "Please Enter the Pincode",
//         "required": 1,
//         "static": true,
//         "value": null
//     },
//     {
//         "column": "Zip Code",
//         "column_aliases": "zip_code",
//         "type": "text",
//         "tool_tip": "Please Enter the Zip Code",
//         "required": 1,
//         "static": true,
//         "value": null
//     },
//     {
//         "column": "Sales Date",
//         "column_aliases": "sales_date",
//         "type": "text",
//         "tool_tip": "Please Enter the Date",
//         "required": 1,
//         "static": true,
//         "value": null
//     }
// ],
// "columns": [
//     "name",
//     "price",
//     "date_of_birth",
//     "sl_no",
//     "quality_no",
//     "address",
//     "pincode",
//     "zip_code",
//     "sales_date"
// ]
