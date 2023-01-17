import { LightningElement, wire, api, track  } from 'lwc';
import getAccountList from '@salesforce/apex/AccountSearch.getAccountList';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import UserNameFIELD from '@salesforce/schema/User.Id';

export default class tablepagination extends LightningElement {
    @track userid=Id;
    @track loader = false;
    @track error = null;
    @track pageSize = 3;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track recordEnd = 0;
    @track recordStart = 0;
    @track isPrev = true;
    @track isNext = true;
    @track accounts = [];
    @track desCount1;
  
    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.userId = data.fields.Id.value;
        } else if (error) {
            this.error = error ;
        }
    }

    //On load
    connectedCallback() {
        this.getAccounts();
    }
 
    //handle next
    handleNext(){
        this.pageNumber = this.pageNumber+1;
        this.getAccounts();
    }
 
    //handle prev
    handlePrev(){
        this.pageNumber = this.pageNumber-1;
        this.getAccounts();
    }
 
    //get accounts
    getAccounts(){
        this.loader = true;
        getAccountList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loader = false;
            if(result){
                var resultData = JSON.parse(result);
                this.accounts = resultData.accounts;
                this.pageNumber = resultData.pageNumber;
                this.totalRecords =resultData.totalRecords;
                this.desCount1 = "ICCU Audits "+resultData.totalRecords
                this.recordStart = resultData.recordStart;
                this.recordEnd = resultData.recordEnd;
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
            }
        })
        .catch(error => {
            this.loader = false;
            this.error = error;
        });
    }
 
    //display no records
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.accounts){
            if(this.accounts.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }
}