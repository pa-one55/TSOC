import NeucronSDK from "neucron-sdk";

export const actions = {
    // login action
    login : async( {request} ) => {
        const data = await request.formData();
        if( !data.get('email') || !data.get('password') ) return { success : false, err : "Enter both fields"};

        try{   
            const neucron = new NeucronSDK(); // initialising the neucron sdk

            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });
            console.log(loginResponse);

            // For Default wallet balance
            const DefaultWalletBalance = await walletModule.getWalletBalance({});
            console.log(DefaultWalletBalance);
            
            return { success : true, login : true, balance : DefaultWalletBalance.data.balance.summary}; //  login : true - mtlb login action se data jaa rha hai
        }
        catch(error){
            console.error("Login action error:", error);
            return { success : false, login : true, error: "An error occurred during login." };
        }

    },
    // pay action
    pay: async ({ request }) => {
        const data = await request.formData();

        // Check if all required fields are present
        const requiredFields = ['email', 'password', 'paymail', 'amount'];
        for (const field of requiredFields) { // ye payment: true field isliye daala hai taaki login waale form se separate kara jaa sake
            if (!data.get(field)) return { success: true, payment: true, err: "Please enter all the necessary fields.!" }
        }
        
        try{
            const neucron = new NeucronSDK(); // initializing the neucron sdk

            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({ email: data.get('email'), password: data.get('password') });

            const paymail = data.get('paymail');
            const amount = Number(data.get('amount'));
            const note = data.get('note') || ''; // optional note

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

            return { success: true, payment: true, txId: payResponse.data.txid };
        }
        catch(error){
            console.error("Pay action error:", error);
            return { success: false, payment: true, error: error  };
        }
    },
};


