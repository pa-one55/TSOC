<script>
    import { writable } from 'svelte/store';

    export let names; // The prop `names` for the list of users
    let editing = writable(null); // Store to keep track of the user being edited

    // Method to handle the edit action
    function editUser(user) {
        editing.set(user.id);
    }

    // Method to handle the cancel action
    function cancelEdit() {
        editing.set(null);
    }
</script>

<div class="mt-12 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
    <div class="flex items-center justify-between mb-4">
        <div class="space-y-1">
            <h2 class="text-xl font-semibold">List of Users</h2>
            <p class="text-sm text-gray-500">
                Fetched {names.length} users
            </p>
        </div>
    </div>
    <!-- Scrolling Container for User List -->
    <div class="user-list-container">
        {#each names as user (user.id)}
            <div class="flex items-center justify-between py-3 user-row">
                {#if $editing === user.id}
                    <form method="POST" action="/profiles?/update">
                        <input type="hidden" name="id" value={user.id}>
                        <div class="flex items-center space-x-4">
                            <input class="font-medium pt-1 leading-none" type="text" name="name" value={user.name} required>
                            <input class="font-medium pl-5 text-gray-500 pt-0" type="email" name="email" value={user.email} required>
                        </div>
                        <p class="mt-1 pt-1 text-yellow-500">You can edit now</p>
                        <div class="flex space-x-2 mt-2">
                            <button type="submit" class="mr-2 px-2 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-700 text-sm">
                                Save
                            </button>
                            <button type="button" class="mr-2 px-2 py-1 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 text-sm" on:click={cancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </form>
                {:else}
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center space-x-4">
                            <p class="font-medium pt-1 leading-none">{user.name}</p>
                            <p class="font-medium pl-5 text-gray-500 pt-0">{user.email}</p>
                        </div>
                        <div class="flex space-x-2">
                            <button type="button" class="mr-2 px-2 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 text-sm" on:click={() => editUser(user)}>
                                Edit
                            </button>
                            <form method="POST" action="/profiles?/delete">
                                <input type="hidden" name="id" value={user.id}>
                                <button type="submit" class="mr-3 px-2 py-1.5 bg-red-500 text-white font-semibold rounded hover:bg-red-700 text-sm flex items-center">
                                    <img class="w-4" src="./trash-can.svg" alt="delete"/>
                                </button>
                            </form>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .user-list-container {
        max-height: 220px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .user-row {
        border-bottom: 1px solid #ddd;
    }
</style>
