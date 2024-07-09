<script lang="ts">
    import { PrivateKey } from '@bsv/sdk';

    let WIF: string =     '--------------------------------------------------------------------';
    let address: string = '----------------------------------------------';

    function createKeys() {
        const privKey = PrivateKey.fromRandom();
        WIF = privKey.toWif();
        console.log("Private Key WIF format is ", WIF);
        address = privKey.toAddress();
        console.log("Your bitcoin address is ", address);
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard');
        });
    }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-5">
    <section class="bg-white rounded-lg shadow-xl p-8 space-y-6">
        <button 
            on:click={createKeys} 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Generate New Wallet Keys
        </button>
        <div class="flex items-center space-x-2">
            <p class="text-gray-700">Private keys in WIF Format is: {WIF}</p>
            <button on:click={() => copyToClipboard(WIF)} 
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded"
            > Copy 
            </button>
        </div>
        <div class="flex items-center space-x-2">
            <p class="text-gray-700">Your Bitcoin Address is: {address}</p>
            <button on:click={() => copyToClipboard(address)} 
                    class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded"
            >
                Copy
            </button>
        </div>
    </section>
</div>

<style>
    /* Additional custom styles if needed */
</style>
