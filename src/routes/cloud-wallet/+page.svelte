<script>
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="mt-20 pt-5 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
  <form method="POST" action="?/login">
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          type="text"
          placeholder="Enter email"
          name="email"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="password"
          type="text"
          placeholder="Enter password"
          name="password"
        />
      </div>
      <button
        type="submit"
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-10 py-2 rounded"
      >
        Login
      </button>
    </div>
  </form>
{#if form}
  {#if form.success && !form.payment}
    <p>Login successful!</p>
    <p>Your balance is: {form.balance} sats</p>
  {:else if !form.success}
    <p>Error: {form.err}</p>
  {/if}
{/if}

</div>

<div class="mt-20 pt-5 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
  <form method="POST" action="?/pay">
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="email"
          type="text"
          placeholder="Enter email"
          name="email"
        />
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="password"
          type="text"
          placeholder="Enter password"
          name="password"
        />
      </div>

      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
            for="paymail"
          >
            Send to
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="paymail"
            type="text"
            placeholder="Enter Paymail of receiver"
            name="paymail"
          />
        </div>

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
            for="amount"
          >
            Amount
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            type="number"
            placeholder="Enter Amount"
            name="amount"
          />
        </div>

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-2"
            for="note"
          >
            Note ( optional )
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="note"
            type="text"
            placeholder="Enter Note "
            name="note"
          />
        </div>

      <button
        type="submit"
        class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-10 py-2 rounded"
      >
        Pay
      </button>
    </div>
    
  </form>
{#if form}
  {#if form?.success && form?.payment && form?.txId }
    <p class="pt-2">Payment successful!</p>
    <div style="display: flex; align-items: center;">
      <p>Here are the transaction details:</p>
      <a
        href={`https://whatsonchain.com/tx/${form?.txId}`}
        target="_blank"
        style="background-color: #1D4ED8; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 0.375rem; margin-left: 0.5rem; text-decoration: none; display: inline-block;"
      >
        Whatsonchain
      </a>
    </div>
    {:else if form.success && form?.payment && form?.err}
    <p>Error: {form.err}</p>
  {/if}
{/if}

</div>

<div class="m-20" > </div>


<style>
  .m-10 {
    margin: 2.5rem;
  }

  .mt-20 {
    margin-top: 5rem;
  }

  .pt-5 {
    padding-top: 1.25rem;
  }

  .w-full {
    width: 100%;
  }

  .max-w-xl {
    max-width: 36rem;
  }

  .p-12 {
    padding: 3rem;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .shadow-xl {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .dark\:bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .bg-white\/30 {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .ring-1 {
    border-width: 1px;
  }

  .ring-gray-900\/5 {
    border-color: rgba(17, 24, 39, 0.05);
  }

  .backdrop-blur-lg {
    backdrop-filter: blur(12px);
  }

  .mb-20 {
    margin-bottom: 5rem;
  }
</style>
