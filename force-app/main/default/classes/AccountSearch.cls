public with sharing class AccountSearch {
    
    @AuraEnabled(Cacheable = true)
    public static list<Account> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Account> accLst = [SELECT  Id, Name, Industry,BillingAddress, Phone, Type From Account WHERE Name LIKE :textkey];
        System.debug('test');
        if(accLst.isEmpty()) {
            return null;
        }
        return accLst; 
    }
    @AuraEnabled(Cacheable = true)
    public static list<Account> getAllAccountData(String textkey) {
       
        list<Account> accLst = [SELECT  Id, Name, Industry,BillingAddress, Phone, Type From Account];
        System.debug('test');
        if(accLst.isEmpty()) {
            return null;
        }
        return accLst; 
    }

    @AuraEnabled//Get Account Records
    public static String getAccountList(Integer pageSize, Integer pageNumber){
        String jsonDT = '';
         
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
         
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Account];
        Integer recordEnd = pageSize * pageNumber;
         
        AccountDTWrapper objDT =  new AccountDTWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.accounts = [SELECT Id, Name, AccountNumber, Industry, Phone FROM Account LIMIT :pageSize OFFSET :offset];
        jsonDT = JSON.serialize(objDT);
        return jsonDT;
    }
    public class AccountDTWrapper {
        public Integer pageSize {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordStart {get;set;}
        public Integer recordEnd {get;set;}
        public List<Account> accounts {get;set;}
    }

    
}