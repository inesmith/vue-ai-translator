# Vue AI Translator App
#### DV300 Semester 2: Lecture 13 - 2025

This tutorial will guide you through building a Vue.js web app that uses Microsoft Azure’s Translator Text API to translate text between languages in real time.

By the end, you’ll have an app that:
* Lets users input text
* Selects source and target languages
* Sends a request to Azure’s AI Translator service
* Displays the translated text

### Learning Outcomes

By completing this tutorial, students will learn to:
* Integrate Azure Cognitive Services into a frontend app.
* Make authenticated REST API calls using Axios.
* Use reactive data and event handling in Vue.js.

### Prerequisites

Before starting, make sure you have:
* Node.js (v16+), npm or yarn
* Basic Vue.js knowledge
* A Microsoft Azure account (free tier will works)

<hr/>

## Step 1: Clone this Vue Project

Run the following command in your terminal:
```bash 
git clone https://github.com/Armand-OW/vue-ai-translator.git
```

Then install the project's base dependencies:
```bash
npm install
```

Finally, install the `axios` dependencies we’ll use for our API calls:
```bash
npm install axios
```

## Step 2: Set Up Azure Translator Service

__Create a Resource in Microsoft Azure__

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Click Create a resource > search for Translator > select Create.
3. Choose your subscription, resource group, and region (for example `"West Europe"`).
4. Once created, navigate to your resource’s Keys and Endpoint tab.
5. Copy the `Key 1`(API Key) & `Endpoint URL`

_Please Note: For production use, always store API keys securely (e.g., in environment variables). Do not hard-code them in your app._

<details>
<summary><i><b>Issue with Azure?</b></i></summary>
<br>
If you are struggling with creating a Microsoft Azure account, you can also use Hugging Face’s free Translation API:<br/>
1. Go to <a href="https://huggingface.co/">Hugging Face</a> and sign up (or log in).<br/>
2. Click on your profile > Settings > Access Tokens.<br/>
3. Click New token, name it something like "translator-tutorial", and copy the token.
</details>
<br/>

## Step 3: Set Up the AI Service Module

Create a new file called `src/services/translator.js`

You can add the following code:
```js
import axios from 'axios';

const API_KEY = "YOUR_AZURE_TRANSLATOR_KEY";
const ENDPOINT = "YOUR_ENDPOINT_URL"; // e.g. https://api.cognitive.microsofttranslator.com
const REGION = "YOUR_RESOURCE_REGION"; // e.g. westeurope

export const translateText = async (text, targetLang = "fr") => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/translate?api-version=3.0&to=${targetLang}`,
      [{ text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": API_KEY,
          "Ocp-Apim-Subscription-Region": REGION,
          "Content-Type": "application/json",
        },
      }
    );

    const translation = response.data[0]?.translations[0]?.text || "No translation found.";
    return translation;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw new Error("Unable to translate text.");
  }
};

```
_Note: Azure requires both a subscription key and region header for authentication._

__What's happening here?__
1. The component will trigger our  `translateText` function and pass the enters text and selects a language.

2. Axios sends a POST request to Azure’s Translator endpoint.

3. Azure returns a JSON response with the translated text.


## Step 4: Update the UI to call the service functionality

In our Vue component we can now display the returned translation.

Open `src/App.vue` and replace its `<script>` content with this:
```vue
<template>
    {/* ... HTML */}
</template>

<script setup>
import { ref } from 'vue';
import { translateText } from './services/translator';

const inputText = ref('');
const targetLang = ref('fr');
const translatedText = ref('');
const loading = ref(false);

const handleTranslate = async () => {
  if (!inputText.value.trim()) return;
  loading.value = true;
  translatedText.value = '';
  try {
    translatedText.value = await translateText(inputText.value, targetLang.value);
  } catch (err) {
    translatedText.value = "Error translating text.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
    {/* ... css styling */}
</style>

```

## Step 6: Run the App

Run your project:
```bash
npm run dev
```

Visit the app at [http://localhost:5173](http://localhost:5173), type in some text, choose a language, and hit Translate.


## Fin... 

Author: Armand Pretorius