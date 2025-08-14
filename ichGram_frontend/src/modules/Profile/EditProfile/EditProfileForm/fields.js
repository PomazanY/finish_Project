export const fields = {
    username: {
        name: "username",
        label:"Username",
        type: "text",
        placeholder: "Username",
        rules: {
            required: "Username is required"
        }
    },
    website: {
        name: "website",
        label: "Website",
        type: "url",
        placeholder: "Website",
        rules: {
            pattern: {
                value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/,
                message: "Invalid URL",
            },
        }
    },
    bio: {
        name: "bio",
        label: "About",
        type: "text",
        rules: {
            maxLength: { 
                value: 150, 
                message: "Max 150 characters" }
        }

    }

};