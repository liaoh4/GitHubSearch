// Access all the buttons from HTML
const searchRepoBtn = document.getElementById("search-repo");
const searchUsersBtn = document.getElementById("search-users");
const searchIssuesBtn = document.getElementById("search-issues");

// A function to disable all the buttons so that button click will have no effect
const disableAllBtn = () => {
    searchIssuesBtn.disabled = true
    searchUsersBtn.disabled = true
    searchRepoBtn.disabled = true
}

// A function to enable all the buttons so that button click will have effect
const enableAllBtn = () => {
    searchIssuesBtn.disabled = false
    searchUsersBtn.disabled = false
    searchRepoBtn.disabled = false
}

// A function to verify that the search term is not empty
const verifySearchTerm = (value) => {
    if (!value || value.trim().length === 0 ){
        alert('Please provide a search term!!')
        enableAllBtn()
        return false
    }
    return true
}

// Callback function to handle the button click to fetch GitHub repositories
const searchRepoBtnClickEventHandler = (e) => {

    // Disable all the buttons
    disableAllBtn();

    // Access the input element that consists our search term
    const search = document.getElementById("search-term");

    // Verify if search value is not empty and then only call the API
    if (verifySearchTerm(search.value)) {
        // Call our API to fetch the GitHub repositories information
        fetch(`${window.location.href}search-repos?query=${search.value}`)
            .then((response) =>


                response.json()
            )
            .then((data) => {
                // Access the p element to display the data
                const resultElement = document.getElementById("result");
                // Set the data to the p tag

                resultElement.innerHTML = `The total number of repositories available are: <b>${data.total_count}</b> 
                                        <br><br>
                                        The total time taken to fetch the results is: <b>${data.seconds} seconds</b>
                                        <br><br>
                                        The source of the result is: <b>${data.source}</b>`;
                // Enable all the buttons for next search operation
                enableAllBtn()
            })
            .catch((err) => console.log(err));
    }
};

// Callback function to handle the button click to fetch GitHub issues
const searchIssueBtnClickEventHandler = (e) => {

    // Disable all the buttons
    disableAllBtn();

    // Access the input element that consists our search term
    const search = document.getElementById("search-term");

    // Verify if search value is not empty and then only call the API
    if (verifySearchTerm(search.value)) {
        // Call our API to fetch the GitHub issues information
        fetch(`${window.location.href}search-issues?query=${search.value}`)
            .then((response) => response.json())
            .then((data) => {
                // Access the p element to display the data
                const resultElement = document.getElementById("result");
                // Set the data to the p tag
                resultElement.innerHTML = `The total number of issues available are: <b>${data.total_count}</b> 
                                    <br><br>
                                    The total time taken to fetch the results is: <b>${data.seconds} seconds</b>
                                    <br><br>
                                    The source of the result is: <b>${data.source}</b>`;
                // Enable all the buttons for next search operation
                enableAllBtn()
            })
            .catch((err) => console.log(err));
    }
};

// Callback function to handle the button click to fetch GitHub users
const searchUserBtnClickEventHandler = (e) => {

    // Disable all the buttons
    disableAllBtn();

    // Access the input element that consists our search term
    const search = document.getElementById("search-term");

    // Verify if search value is not empty and then only call the API
    if (verifySearchTerm(search.value)) {
        // Call our API to fetch the GitHub users information
        fetch(`${window.location.href}search-users?query=${search.value}`)
            .then((response) => response.json())
            .then((data) => {
                // Access the p element to display the data
                const resultElement = document.getElementById("result");
                // Set the data to the p tag
                resultElement.innerHTML = `The total number of users available are: <b>${data.total_count}</b> 
                                    <br><br>
                                    The total time taken to fetch the results is: <b>${data.seconds}</b>
                                    <br><br>
                                    The source of the result is: <b>${data.source}</b>`;
                // Enable all the buttons for next search operation
                enableAllBtn()
            })
            .catch((err) => console.log(err));
    }
};

// Attach the callback function on the click event listener
// for each buttons with their respective functions
searchRepoBtn.addEventListener(
    "click",
    searchRepoBtnClickEventHandler
);
searchIssuesBtn.addEventListener(
    "click",
    searchIssueBtnClickEventHandler
);
searchUsersBtn.addEventListener(
    "click",
    searchUserBtnClickEventHandler
);
