

<script>
  /** @type {import('./$types').ActionData} */
  export let form;
</script>



<div style="display: flex; gap: 2rem; justify-content: space-around; margin-top: 5rem;">
  
  <div>


    <div style="width: 100%; max-width: 36rem; padding: 3rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(12px);">
      <form method="POST" action="?/login">
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Email</label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" placeholder="Enter email" name="email" />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-0 mb-2" for="password">Password</label>
            <input class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="text" placeholder="Enter password" name="password" />
          </div>
        </div>
        <button type="submit" class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 px-10 py-2 rounded">Login</button>
      </form>

      {#if form}
        {#if form?.success && form?.login}
          <p class="mt-2 mb-2 pt-2 text-green-500 font-semibold">Login successful.!</p>
          <p class="text-green-500 font-semibold" >Your balance is : {form?.balance} sats</p>
        {:else if !form?.success && form?.login && form?.msg }
          <p class="pt-4 text-red-500 font-bold">{form?.error}</p>
          <p class="pt-4 text-red-500 font-bold">{form?.msg}</p>
        {:else if !form?.success && form?.login}
          <p class="pt-4 text-red-500 font-bold">{form?.error}</p>
        {/if}
      {/if}
    </div>

    <div class="m-5 p-5" > </div>


    
    <div style="width: 100%; max-width: 36rem; padding: 3rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(12px);">
      <h3 class="mb-3 pb-3 font-bold text-red-500 text-center">Not functional yet</h3>
      <form method="POST" action="?/createAccount">
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Email</label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" placeholder="Enter email" name="email" />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-0 mb-2" for="password">Password</label>
            <input class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="text" placeholder="Enter password" name="password" />
          </div>
        </div>
        <!-- <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 px-10 py-2 rounded">Create Account</button> -->
      </form>
    </div>

  </div>

  <div style="width: 100%; max-width: 36rem; padding: 3rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(12px);">
    <form method="POST" action="?/pay">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Email</label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="text" placeholder="Enter email" name="email" />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-0 mb-2" for="password">Password</label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="text" placeholder="Enter password" name="password" />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2" for="paymail">Send to</label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="paymail" type="text" placeholder="Enter Paymail of receiver" name="paymail" />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2" for="amount">Amount</label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="amount" type="number" placeholder="Enter Amount" name="amount" />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2" for="note">Note (optional)</label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="note" type="text" placeholder="Enter Note" name="note" />
        </div>
      </div>
      <button type="submit" class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 px-10 py-2 rounded">Pay</button>
    </form>
    {#if form}
    {#if form?.success && form?.payment}
      <p class="pt-2">Payment successful!</p>
      <div style="display: flex; align-items: center;">
        <p>Here are the transaction details:</p>
        <a href={`https://whatsonchain.com/tx/${form.txId}`} target="_blank" style="background-color: #1D4ED8; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.375rem; margin-left: 0.5rem; text-decoration: none; display: inline-block;">Whatsonchain</a>
      </div>
    {:else if !form?.success && form?.payment && form?.error}
      <p class="pt-4 text-red-500 font-bold">{form?.error}</p>
    {/if}
  {/if}
  </div>
</div>



<div class="m-20 p-10"></div>
