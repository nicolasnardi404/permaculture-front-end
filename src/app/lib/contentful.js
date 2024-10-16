// front-end/src/app/util/contentful.js

import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, // Ensure this is correct
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Ensure this is correct
});

export default client; // Ensure you are exporting the client correctly
