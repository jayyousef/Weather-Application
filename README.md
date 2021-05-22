# Description Weather-Application

This is an application utilizing JQuery and Bootstrap to build a simple web page that can show you the current weather and the forecast for the next five days for any city that you search. Every city you search for will be saved to local storage and then re-populated every time you bring up the page. At any time, you can click on any of your cities and see that weather informaion again. This will be extremely helpful for planning trips or knowing when to take out your motorcycle!

[Link to Live Application](https://jayyousef.github.io/Weather-Application/)

Included in this application are:
* Manipulating the DOM to create buttons & creating weather information & 5-day-forecast
    * using a FOR loop to create the five day weather forecast
    * adding a lot of innerHTML to populate all the weather Data

* API calls to get weather info
    * Using fetch to get city name and transfer to Longitude  + Latitude
    * THEN passing that Lat Lon to get all the current weather information as well as the next five days weather

*  LocalStorage saving
     * Stores every search to local storage and automatically creates a button for that search history. Then when you open the page again all your previous searches are in the search history. A feature that will be added in the future is the ability to clear your search history if you want to start over.

*  Event Listening to know which city to populate
     * you can, at any time, click on any of your previous searches to bring up the weather of any of your previous searches



Challenges I encountered
* Formatting
     * I spent a lot of time trying to use Bootstrap grid to put the website just where I wanted it. I tried several methods and in the end got it looking nice, but it took a long time to get there. 
*  Addying dynamically to the localStorage array
     * The process wasn't that hard to create but I had a hard time initially with my pseudocode thinking through the process of which function I should use and where i should put to process of adding to the array and then pulling it back up to populate the clickable buttons
     
     
## Credits
Many thanks to the below individuals who provided input, suggestions, or played a "rubber ducky" role
* Chris Martinez
* Mim Armand
* Kat Poulos
* Mark Artim
* Matthew Goad


Sources used for help:

* [Bootstrap Documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
* [W3 School](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
* [Mozilla Help Pages](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [JQuery Documentation](https://api.jquery.com/)

If any additional issues are found, or if there are any suggestions for improvement, please send an email to site developer Jay Yousef at jay.yousef@gmail.com

---

## <ins>Installation</ins>
1.  Clone or download .zip file from Github to your local computer
2.  Open index.html via your preferred browser or code/text editor

### <ins>Cloning</ins>
1. From Github, select the "Code" button, choose either HTTPS or SSH as appropriate
2. Click the copy button <img src="./assets/images/copy-button.PNG"> to add it to your clipboard
3. In your preferred command line (terminal, bash, etc), navigate to the folder you'd like to download the repository into
4. Type `git clone [pasted url from clipboard]` and press enter
5. Access the content with your code editor by either typing `code .` in your command line or by using your editor's `File > Open Folder` in your code editor menu. If only viewing in a browser, simply double click index.html to open in your default browser


### <ins>Zip file</ins>
1. From Github, select the "Code" button, then select "Download ZIP"
2. Choose which folder to download the repository into via the dialog box that appears
3. After downloading, open the .zip file and select "Extract All" from the top of the window that appears
4. Access the content with your code editor by selecting `File > Open Folder` in your code editor menu. If only viewing in a browser, simply double click index.html to open in your default browser



---

These updates are covered under [GNU General Public License v3.0](./Assets/GNU_Public_License)

## Screenshot below:

![WeatherApp](./Assets/weatherApp.png)
