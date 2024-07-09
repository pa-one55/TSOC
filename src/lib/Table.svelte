
<script>
    export let names; // The prop `names` for the list of users
</script>

<div
    class="mt-12 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
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
                <div class="flex items-center space-x-4">
                    <p class="font-medium pt-1 leading-none">{user.name}</p>
                    <p class="font-medium pl-5 text-gray-500 pt-0">{user.email}</p>                        
                </div>
				<div class="flex space-x-2">
					<form method="POST" action="/profiles?/update">
						<input type="hidden" name="id" id="id" value={user.id}>
						<button type="submit" class="mr-2">
							<img class="w-4 float-right" src="./edit.png" alt="update"/>
						</button>
					</form>
					<form method="POST" action="/profiles?/delete">
						<input type="hidden" name="id" id="id" value={user.id}>
						<button type="submit" class="pr-3">
							<img class="w-4 float-right" src="./trash-can.svg" alt="delete"/>
						</button>
					</form>					
				</div>
            </div>
        {/each}
    </div>
</div>



<style>
    /* Add scrolling within the Table component */
    .user-list-container {
        max-height: 220px; /* Adjust this value as needed */
        overflow-y: auto; /* Enable vertical scrolling */
        overflow-x: hidden; /* Prevent horizontal scrolling */
    }

    /* Optional: Add borders and other styling for user rows */
    .user-row {
        border-bottom: 1px solid #ddd; /* Add a border for separation */
    }
</style>
