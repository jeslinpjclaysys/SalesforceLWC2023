import { LightningElement,track,wire, api} from 'lwc';
import getAccount from '@salesforce/apex/AccountSearch.getAccountData';

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, 
    ];

export default class AuditForm extends LightningElement {
    queryTerm;
  
    value = 'appId';

    get options() {
        return [
            { label: 'APP ID', value: 'appId' },
            { label: 'Loan #', value: 'LoanId' },
           
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        alert("you have selected : "+this.value);
    }
   
      handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
            alert('pressed');
        }
    }
    @track selectedOption;
    changeHandler(event) {
    const field = event.target.name;
    if (field === 'radiogroup') {
        this.selectedOption = event.target.value;
            alert("you have selected : "+this.selectedOption);
        } 
    }
    value = 'internal';

    get options() {
        return [
            { label: 'Internal', value: 'internal' },
            { label: 'Outsourced', value: 'outsourced' },
            { label: 'Investor', value: 'investor' },
        ];
    }
//get record from apex



    @api recordId;
    record;
   
    @track SearchName;
   @track searchData;
    @track columns = columns;
   // @track noData;
   // noData=false;
    handleClick(event){
   // this.noData=true;
    this.searchData=null;
       // valuest= this.template.querySelector('searchTxt').value;
      // test=
      const dt=this.template.querySelector(`[data-id="site-id"]`).value;
        alert("test"+dt);
        //this.template.querySelector(`[data-id="site-id"]`).value;
    //this.searchData=document.getElementById('text-input-id-1').value;
    //alert(this.searchData);
    getAccount({textkey : dt})
        .then(result => {
            this.searchData = result;
        })
      //  alert("tte"+this.searchData);
      //if(this.searchData== null) 
       // this.noData=true;

      }
   

   /* get myName() {
        return this.record?.Name;
    }

    get myIndustry() {
        return this.record?.Industry;
    }

    get myRating() {
        return this.record?.Rating;
    }

    get myWebsite() {
        return this.record?.Website;
    }*/





}