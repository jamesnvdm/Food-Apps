document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').onsubmit = function() {
        const body = 'Please return a recipe using the following parameters as guidelines. Kindly format the response in HTML to enable it to display beautifully on a web page, please - and do not mention the fact that this response is formatted in HTML.';
        const comments = document.querySelector('#comments').value;
        const cuisine = document.querySelector('#cuisine')?.value;
        const experience = document.querySelector('#experience')?.value;
        const button = document.getElementById('submitButton');
        const resetButton = document.getElementById('resetButton');
        const resetForm = document.getElementById('reset');
        console.log(resetForm);
        var resultField = document.querySelector('p');

        // Text to indicate that response is loading
        resultField.innerHTML = "Fetching your response! Please wait";

        // Disable submit button whilst processing response
        button.disabled = true;

        console.log({
            "body": body,
            "cuisine": cuisine,
            "experience": experience,
            "comments": comments
        });

        // Construct the request payload
        const requestPayload = {
            body: body,
            cuisine: cuisine,
            experience: experience,
            comments: comments,
        };

        console.log(
            requestPayload.body
        );

    // Send request to Django proxy
    fetch("http://127.0.0.1:8000/chatgpt-proxy/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
    })
        .then((data) => {
            // Handle the response from ChatGPT
            return data.text(); // Display response to the user
        })
        .then((data) => {
            resultField.innerHTML = data.replace('```html', '');

            // Allow the option to reset the page once recipe displayed
            resetForm.hidden = false;
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(`Failed to fetch response: ${error.message}`);
        });
        // prevent default submission
        return false;
    };
    }
);

function refreshPage() {
    var button = document.getElementById('submitButton');
    var resultField = document.querySelector('p');
    var resetForm = document.getElementById('reset');
    var experience = document.getElementById('experience');
    var comments = document.getElementById('comments');
    var cuisine = document.getElementById('cuisine');

    button.disabled = false;
    resultField.innerHTML = '';
    resetForm.hidden = true;
    comments.value = '';
    experience.value = 'Beginner';
    cuisine.value = 'English';
}