const Invoice = require('./database').Invoice

const calc ={
    //returns subtotal amount of invoiced quantity of individual item
    subTotal (qty,price){
        return item*price
    },
    //returns the total amount of the invoice w/o VAT
    total(items){
        let total = 0;
        items.forEach((item)=>{
            total += subTotal(item.qty,item.price)
        })
        return total
    },
    // returns the VAT of invoice amount
    getVAT(total,vatPercent){
        return total*vatPercent
    },
    //returns the total amount with VAT tax
    withVAT(total,vat){
        return total+vat
    },
    //returns the chosen method of payment
    paymentType(method){
        if(method==="on"){
            return {
                cash:true,
                bank:false
            }
        } else return{
            cash:false,
            bank:true
        }
    },
    number(uic){
        Invoice.find({uic:uic})
        .then((result)=>{
            var num=1
            if((!result)||(result.length===0)){
                return num.toString().padStart(10,'0')
            }else{
                return result.length.toString().padStart(10,'0')
            }
        })
    }
}
module.exports = calc
