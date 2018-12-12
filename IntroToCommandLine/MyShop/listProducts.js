var fakeData = require("faker");
var st = 
{
    starting: function(){
        console.log("==============");
    },
    message: function()
    {
        console.log("WELCOME TO MY SHOP");
    }
};
st.starting();
st.message();
st.starting();
for(var i=0;i<10;i++)
{
   console.log(fakeData.commerce.productName()+" - "+ fakeData.commerce.price()); 
}
