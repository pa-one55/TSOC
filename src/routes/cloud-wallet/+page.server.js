import NeucronSDK from "neucron-sdk";

export const actions = {
    // login action
    login : async( {request} ) => {
        const data = await request.formData();
        
        const neucron = new NeucronSDK(); // initialising the neucron sdk

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
        console.log(loginResponse);

        // For Default wallet balance
        const DefaultWalletBalance = await walletModule.getWalletBalance({});
        console.log(DefaultWalletBalance);
        
        return { success : true, payment : false, balance : DefaultWalletBalance.data.balance.summary};
    },
    // pay action
    pay : async ({request}) => {
        const data = await request.formData();
        
        const neucron = new NeucronSDK(); // initialising the neucron sdk

        const authModule = neucron.authentication;
        const walletModule = neucron.wallet;

        const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
        // console.log(loginResponse);

        const paymail = data.get('paymail') ;
        const amount = Number(data.get('amount'));
        const note = data.get('note') || '' ; // user ka note nhi to empty string

        const options = {
            "outputs": [
                {
                    "address": paymail,
                    "amount": amount,
                    "note": note
                },
            ],
        };
        console.log(options);

        let payResponse = await neucron.pay.txSpend(options);
        console.log(payResponse); 
        return { success: true, payment : true, txId: payResponse.data.txid };

        // try {
        // payResponse = await neucron.pay.txSpend(options);
        // console.log(payResponse); 
        // return { success: true, payment : true, txId: payResponse.data.txid };
        // } 
        // catch (error) {
        //     console.log(error.message);
        //     return {success : false, payResponse : error.message}
        // }
    },
};


