export interface payment {
  creditCardNumber : string;
  creditCardHolder : string;
  expirationDate : Date;
  securityCode : string;
  paymentAmount : number;
}

export interface payResults {
  creditCardNumber : boolean;
  creditCardHolder : boolean;
  expirationDate : boolean;
  securityCode : boolean;
  paymentAmount : boolean;
}

export const validateFields = (pay : payment) : payResults => {
  console.log(typeof(pay.creditCardNumber));
  return ({
    creditCardNumber : pay.creditCardNumber.length === 16 ? true : false,
    creditCardHolder : pay.creditCardHolder.length >= 8 ? true : false,
    expirationDate : pay.expirationDate > new Date() ? true : false,
    securityCode : (pay.securityCode.length == 3 || pay.securityCode.length == 0) ? true : false,
    paymentAmount : pay.paymentAmount >= 100 ? true : false
  });
}

export const validPayment = (res : payResults) => {
  if(res.creditCardHolder && res.creditCardNumber 
    && res.expirationDate && res.paymentAmount && res.securityCode)
  return true;
  return false;
}