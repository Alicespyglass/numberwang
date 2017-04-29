# Alexa Fact Skill Template using [Opearlo Voice Content Management](https://analytics.opearlo.com).

This template is based on Amazon's [Simple Fact Template](https://github.com/alexa/skill-sample-nodejs-fact).

## 1 - Clone the repository and install the node modules in the lambda directory:

```
git clone https://github.com/Opearlo/alexa-fact-template
cd lambda
npm install

```

## 2 - Zip up everything within the **lambda** folder.

## 3 - Create a New Skill in the [Alexa Developer Portal](https://developer.amazon.com/alexa-skills-kit)

![](https://s3.amazonaws.com/opearlo-screenshots/alexa-developer-portal.png)

## 4 -  Configure the Voice Interaction Model by copying in the Intent Schema and Sample Utterances from the **speechAssets** folder

  * Intent Schema:

 ```JSON
 {
   "intents": [
     {
       "intent": "GetNewFactIntent"
     },
     {
       "intent": "AMAZON.HelpIntent"
     },
     {
       "intent": "AMAZON.YesIntent"
     },
     {
       "intent": "AMAZON.NoIntent"
     },
     {
       "intent": "AMAZON.StopIntent"
     },
     {
       "intent": "AMAZON.CancelIntent"
     }
   ]
 }
 ```

  * Sample Utterances:

 ```
 GetNewFactIntent a fact
 GetNewFactIntent tell me a fact
 GetNewFactIntent give me a fact
 GetNewFactIntent tell me trivia
 GetNewFactIntent give me trivia
 GetNewFactIntent give me some information
 GetNewFactIntent tell me something
 GetNewFactIntent give me something
 ```


## 5 - Create a new Lambda Function in node.js with the source set to Alexa Skills Kit and upload the zip file from Step 2.

![](https://s3.amazonaws.com/opearlo-screenshots/aws-lambda-create-function.png)

![](https://s3.amazonaws.com/opearlo-screenshots/aws-lambda-configure-trigger.png)

## 6 - Copy the Lambda Function **ARN** into the Configuration Tab in the Alexa Developer Portal.

## 7 - Create an account on [Opearlo Analytics](https://analytics.opearlo.com)

![](https://s3.amazonaws.com/opearlo-screenshots/opearlo-analytics-signup.png)

## 8 - Add a New Voice App and fill out your Skill Details.

![](https://s3.amazonaws.com/opearlo-screenshots/opearlo-analytics-add-new-voice-app.png)

## 9 - Go the the **Docs** page and add your Opearlo credentials as environment variables in your lambda function:

  * OPEARLO_USER_ID
  * OPEARLO_VOICE_APP_NAME
  * OPEARLO_API_KEY

![](https://s3.amazonaws.com/opearlo-screenshots/opearlo-analytics-credentials.png)

![](https://s3.amazonaws.com/opearlo-screenshots/aws-lambda-opearlo-env-vars.png)

## 10 - Click on **Manage Content** to start adding your voice content.

![](https://s3.amazonaws.com/opearlo-screenshots/opearlo-analytics-no-voice-content.png)

We're going to be adding 3 bits of dynamic content into our Skill. The code to access this content is already configured in the template.

  * **10.1 Random Fact** - This will be a list of all our facts. The Opearlo Analytics **getVoiceContent()** method will return a random fact from the list.

    - Click **Add New Voice Content** and set the Voice Content Name to 'Random Fact' and the Voice Content Type to 'Text Response - Random'

    - Add as many facts as you want into the responses.

    ![](https://s3.amazonaws.com/opearlo-screenshots/opearlo-analytics-add-random-text-content.png)

  * **10.2 Help Message** - Alexa's response the the HelpIntent.

    - Click **Add New Voice Content** and set the Voice Content Name to 'Help Message' and the Voice Content Type to 'Text Response - Fixed'

    - Add your help message.


  * **10.3 Goodbye Message** - A random goodbye message for whenever our user ends the the session.

    - Click **Add New Voice Content** and set the Voice Content Name to 'Goodbye Message' and the Voice Content Type to 'Text Response - Random'

    - Add as many different goodbye messages as you want into the responses.

## You're all set!!

Try testing your Skill in the Test tab of the Amazon developer portal to see your random facts being returned.

Advanced --> Try replacing your random text facts with SSML audio clips!

## Questions / Feedback?

Feel free to reach out to [team@opearlo.com](mailto:team@opearlo.com)
