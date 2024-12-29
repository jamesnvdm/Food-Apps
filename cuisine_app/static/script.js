document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').onsubmit = function() {
        const body = 'Please return a recipe using the following parameters as guidelines';
        const comments = document.querySelector('#comments').value;
        const cuisine = document.querySelector('#cuisine')?.value;
        const experience = document.querySelector('#experience')?.value;

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
    fetch("http://3.8.121.237:8000/chatgpt-proxy/", {
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
            alert(data);
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
